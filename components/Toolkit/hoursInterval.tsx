import { useEffect, useState } from "react";

interface Props {
  setHours: (value: any) => void;
}

export default function HoursInterval({ setHours }: Props) {
  const [time, setTime] = useState({
    startHour: 12,
    startPeriod: "AM" as "AM" | "PM",
    endHour: 12,
    endPeriod: "AM" as "AM" | "PM",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    const value =
      field === "startHour" || field === "endHour"
        ? parseInt(e.target.value)
        : e.target.value;
    setTime((prevState) => {
      const updated = {
        ...prevState,
        [field]: value,
      };
      return updated;
    });
    validateTime({ ...time, [field]: value });
  };

  const validateTime = (newTime: typeof time) => {
    const startTime =
      newTime.startHour + (newTime.startPeriod === "PM" ? 12 : 0);
    const endTime = newTime.endHour + (newTime.endPeriod === "PM" ? 12 : 0);
    if (endTime <= startTime) {
      setErrorMessage("End time must be after start time.");
    } else {
      setErrorMessage("");
    }
  };

  useEffect(() => {
    let timeIntervalString = `From ${time.startHour} ${time.startPeriod} to ${time.endHour} ${time.endPeriod}`;
    if (!errorMessage) setHours({ hours: timeIntervalString });
  }, [time, errorMessage]);

  return (
    <div className="max-w-lg mx-auto mt-8 flex flex-col items-center">
      <label className="text-slate-950 font-extrabold">Select Open Hours</label>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-950">
          Start Time
        </label>
        <div className="flex items-center gap-2 mt-1">
          <select
            value={time.startHour}
            onChange={(e) => handleChange(e, "startHour")}
            className="border bg-slate-900 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            value={time.startPeriod}
            onChange={(e) => handleChange(e, "startPeriod")}
            className="border bg-slate-900 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-950">
          End Time
        </label>
        <div className="flex items-center gap-2 mt-1">
          <select
            value={time.endHour}
            onChange={(e) => handleChange(e, "endHour")}
            className="border bg-slate-900 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            value={time.endPeriod}
            onChange={(e) => handleChange(e, "endPeriod")}
            className="border bg-slate-900 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-400 font-extrabold">{errorMessage}</p>
      )}

      {!errorMessage && (
        <p className="text-green-300 font-extrabold">
          From {time.startHour} {time.startPeriod} to {time.endHour}{" "}
          {time.endPeriod}
        </p>
      )}
    </div>
  );
}
