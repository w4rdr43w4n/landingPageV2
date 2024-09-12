import { avStylers } from "@/lib/config/types";

interface StyleProviderProps {
  setProvider: (value: any) => void;
}

export default function StyleProvider({ setProvider }: StyleProviderProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProvider({ style_provider: event.target.value });
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-fit p-2 rounded-md bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4"> Select a Styling Method</h1>
      <select
        onChange={handleSelectChange}
        className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value=""
      >
        <option value="" disabled>Style Provider</option>
        {Object.values(avStylers).map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
  );
}
