import { avFonts } from "@/lib/config/types";
import { useState } from "react";
import FontPreview from "../Toolkit/FontPreview";

interface FontSelectorProps {
  setFont: (value: any) => void;
}

export default function FontSelector({ setFont }: FontSelectorProps) {
  const [selectedFont,setSelectedFont] = useState("")
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = event.target.value
    setSelectedFont(newFont)
    setFont({ main_font: newFont });
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-fit p-2 rounded-md bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Pick a Font</h1>
      <select
        onChange={handleSelectChange}
        className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value=""
      >
        <option value="" disabled>
          Select a Font
        </option>
        {Object.values(avFonts).map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      {selectedFont && <FontPreview text="Life is Good" fontFamily={selectedFont} />}
    </div>
  );
}
