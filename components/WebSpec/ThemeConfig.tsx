import { avStylers, theme, ThemeColors } from "@/lib/config/types";
import { useState } from "react";
import Modal from "../Toolkit/Modal";
import ColorSelector from "./ColorSelector";
import FontSelector from "./FontSelector";
import StyleProvider from "./StyleProvider";

interface ThemeProps {
  setTheme: (value: any) => void;
}
export default function ThemeConfig({ setTheme }: ThemeProps) {
  const [modalT, setModalT] = useState(false);
  const [data, setData] = useState<theme>({
    main_color: { primary: "", secondary: "" },
    main_font: "",
    style_provider: avStylers.PlainCSS,
  });
  const handleSetData = (newValue: Partial<theme>) => {
    setData((prev) => ({ ...prev, ...newValue }));
  };
  const handleSave = () => {
    setTheme({ website_theme: { ...data } });
    setModalT(false);
  };
  return (
    <section>
      <button
        className="text-white bg-indigo-950 font-sans p-2 font-extrabold rounded-md opacity-75 hover:opacity-100 duration-300"
        onClick={() => setModalT(true)}
      >
        Configure Theme
      </button>

      <Modal title="Theme Configuration" open={modalT} onClose={setModalT}>
        <section className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <ColorSelector setColors={handleSetData} />
            <FontSelector setFont={handleSetData} />
          </div>
          <StyleProvider setProvider={handleSetData} />
          <button
            onClick={handleSave}
            className="bg-indigo-950 text-white p-2 rounded font-bold h-fit"
          >
            Save
          </button>
        </section>
      </Modal>
    </section>
  );
}
