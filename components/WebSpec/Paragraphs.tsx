import { ChangeEvent, useState } from "react";
import Modal from "../Toolkit/Modal";
import { paragraph } from "@/lib/config/types";
import InputField from "../Toolkit/InputField";
import { placeholders } from "../config/types";

interface PsProps {
  setPs: (value: any) => void;
}
export default function Paragraphs({ setPs }: PsProps) {
  const [modalP, setModalP] = useState(false);
  const [Items, setItems] = useState<paragraph[]>([]);
  const [data, setData] = useState<paragraph>({
    title: "",
    content: "",
  });
  const handleSetData = (newValue: Partial<paragraph>) => {
    setData((prev) => ({ ...prev, ...newValue }));
  };

  const handleSave = () => {
    setItems((prev) => [...prev, { ...data }]);
    setPs({ paragraphs: [...Items,data] });
    setModalP(false);
  };
  const handleRemoveAll = () => {
    setItems([]);
    setPs({ paragraphs: [] });
  };
  return (
    <section className="flex flex-col gap-2 items-center justify-center">
      <section className="flex flex-row items-center gap-2 w-fit">
        <p className=" text-white text-[18px] font-extrabold bg-indigo-950 py-2 rounded-md px-4 w-fit h-auto ">{Items.length}</p>
        <button
          className="text-white bg-indigo-950 h-fit font-sans p-2 font-bold rounded-md opacity-75 hover:opacity-100 duration-300"
          onClick={() => setModalP(true)}
        >
          New Paragraph
        </button>
        {Items.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="font-extrabold text-white bg-red-600 opacity-75 hover:opacity-100 rounded-md px-2 text-[18px]"
          >
            ×
          </button>
        )}
      </section>
      <Modal title="New Custom Paragraph" onClose={setModalP} open={modalP}>
        <InputField
          label="Title"
          control={handleSetData}
          property="title"
          placeholder={placeholders.paragraphs[0].title}
        />
        <InputField
          type="textarea"
          control={handleSetData}
          placeholder={placeholders.paragraphs[0].content}
          property="content"
        />
        <button
          onClick={handleSave}
          className="bg-indigo-950 text-white p-2 rounded font-bold h-fit"
        >
          Add
        </button>
      </Modal>
    </section>
  );
}
