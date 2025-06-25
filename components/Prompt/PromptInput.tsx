import { PromptProps } from "@/lib/config/types";
import { Input, TextareaAutosize } from "@mui/material";

export default function PromptInput({ setPrompt }: PromptProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setPrompt(newValue);
  };
  return (
    <div className="flex flex-col">
      <textarea
        placeholder="Use Green as theme base..."
        onChange={handleChange}
        className="min-h-16 max-h-20 p-2 font-medium text-base font-mono bg-indigo-500 outline-none rounded-md text-white"
      ></textarea>
    </div>
  );
}
