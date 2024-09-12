import { ChangeEvent } from "react";

interface InputFieldProps {
  control: (value: any) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "textarea" | "email";
  property?: string;
}
export default function InputField({
  label="",
  placeholder,
  control,
  property,
  type = "text",
}: InputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (property) control({ [property]: e.target.value });
    else control(e.target.value);
  };
  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (property) control({ [property]: e.target.value });
    else control(e.target.value);
  };
  if (type === "textarea")
    return (
      <textarea
        maxLength={1500}
        placeholder={placeholder}
        className="text-wrap overflow-y-auto w-[250px] min-h-11 max-h-44 text-black placeholder:text-indigo-950 outline-none rounded-md p-2 bg-slate-500 border-slate-700 border-[3px] opacity-80 focus:opacity-100"
        onChange={handleChangeTextArea}
      ></textarea>
    );
  else
    return (
      <section className="flex flex-col min-w-64 p-1 w-fit h-fit">
        <label className="text-slate-950 text-[0.85rem] font-bold">
          {label}
        </label>
        {type === "text" ? (
          <input
            onChange={handleChange}
            type={type}
            placeholder={placeholder}
            className="opacity-80 focus:opacity-100 outline-none text-white p-4 text-[14px] rounded-md bg-gray-900 border-none w-full h-full" required
          />
        ) : (
          <input
            onChange={handleChange}
            type={type}
            defaultValue={type=== "number"?2:""}
            min={0}
            className="opacity-80 focus:opacity-100 outline-none text-white p-4 text-[14px] rounded-md bg-gray-900 border-none w-full h-full" required
          />
        )}
      </section>
    );
}
