import { colorThemeName, theme, ThemeColors, themes } from "@/lib/config/types";
import { useState } from "react";

interface ColorSelectorProps{
setColors:(value:any)=>void
}

export default function ColorSelector({setColors}:ColorSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeColors | null>(null);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.target.value;
    const theme = themes[(selectedKey as colorThemeName)];
    setSelectedTheme(theme)
    setColors({main_color:{...theme}})
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-fit p-2 rounded-md bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Pick a Theme</h1>
      
      <select
        onChange={handleSelectChange}
        className="p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value=""
      >
        <option value="" disabled>
          Select a Theme
        </option>
        {Object.keys(themes).map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </option>
        ))}
      </select>

      {selectedTheme && (
        <div className="mt-6 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Selected Theme</h2>
          <div className="flex items-center space-x-4">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: selectedTheme.primary }}
            />
            <div>Primary Color</div>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: selectedTheme.secondary }}
            />
            <div>Secondary Color</div>
          </div>
        </div>
      )}
    </div>
  );
}