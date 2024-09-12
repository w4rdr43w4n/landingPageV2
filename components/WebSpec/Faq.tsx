import { FAQ } from "@/lib/config/types";
import { useState } from "react";
import Modal from "../Toolkit/Modal";
import InputField from "../Toolkit/InputField";
import { placeholders } from "../config/types";

interface faqProps {
  setFAQs: (value: any) => void;
}

export default function FAQField({ setFAQs }: faqProps) {
  const [qs, setQs] = useState<FAQ[]>([]);
  const [modalF, setModalF] = useState(false);
  const [data, setData] = useState<FAQ>({ answer: "", question: "" });

  const handleSetData = (newValue: Partial<FAQ>) => {
    setData((prev) => ({ ...prev, ...newValue }));
  };
  const handleSave = () => {
    setQs((prev) => [...prev, {...data}]);
    setFAQs({ faqs: [...qs,data] });
    setModalF(false);
  };
  const handleDeleteAll = () => {
    setQs([]);
    setFAQs({ faqs: [] });
  };
  return (
    <section className="flex flex-row justify-center p-2">
      <div className="flex flex-row gap-2">
        <p className=" text-white text-[18px] font-extrabold bg-indigo-950 py-2 rounded-md px-4 w-fit h-auto ">
          {qs.length}
        </p>
        <button
          onClick={() => setModalF(true)}
          className="text-white font-bold text-[16px] bg-indigo-950 p-2 rounded-md"
        >
          New FAQ Item
        </button>
        {qs.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="font-extrabold text-white bg-red-600 opacity-75 hover:opacity-100 rounded-md px-4 text-[18px]"
          >
            ×
          </button>
        )}
      </div>
      <Modal open={modalF} onClose={setModalF} title="New FAQ">
        <InputField
          label="Question"
          placeholder={placeholders.faqs[0].question}
          control={handleSetData}
          property="question"
        />
        <InputField
          label="Answer"
          type="textarea"
          placeholder={placeholders.faqs[0].answer}
          control={handleSetData}
          property="answer"
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
