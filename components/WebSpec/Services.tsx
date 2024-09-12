import { portfolio } from "@/lib/sample";
import ItemsList from "../Toolkit/ItemsList";
import { ChangeEvent, useState } from "react";
import { service, WebSpecType } from "@/lib/config/types";
import Modal from "../Toolkit/Modal";
import InputField from "../Toolkit/InputField";
import { placeholders } from "../config/types";

interface ServicesProps {
  setServices: (value: any) => void;
}

export default function Services({ setServices }: ServicesProps) {
  let service_placeholders: any;
  if (placeholders.services) service_placeholders = placeholders.services[0];
  const [Items, setItems] = useState<service[]>([]);
  const [modalS, setModalS] = useState(false);
  const [data, setData] = useState<service>({
    image_link: "",
    service_description: "",
    service_name: "",
    price: "",
  });

  const handleSetData = (newValue: Partial<service>) => {
    setData((prev) => ({ ...prev, ...newValue }));
  };
  const handleDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleSetData({ service_description: e.target.value });
  };
  const handleSave = () => {
    setItems((prev) => [...prev, { ...data }]);
    setServices({ services: [...Items,data] });
    setModalS(false);
  };
  const handleRemoveAll = () => {
    setItems([]);
    setServices({ services: [] });
  };
  return (
    <section className="flex flex-col gap-2 items-center justify-center">
      <ItemsList Items={Items} />
      <Modal open={modalS} onClose={setModalS} title="New Service">
        <InputField
          label="Image Link"
          control={handleSetData}
          property="image_link"
          placeholder={service_placeholders.image_link}
        />
        <InputField
          label="Service Name"
          control={handleSetData}
          property="service_name"
          placeholder={service_placeholders.service_name}
        />
        <textarea
          placeholder={service_placeholders.service_description}
          className="text-wrap overflow-y-auto max-w-64 min-h-11 max-h-44 text-black placeholder:text-indigo-950 outline-none rounded-md p-2 bg-slate-500 border-slate-700 border-[3px] opacity-80 focus:opacity-100"
          onChange={handleDesc}
          property="service_name"
        />
        <InputField
          placeholder={service_placeholders.price}
          label="Price"
          type="number"
          control={handleSetData}
          property="price"
        />
        <button
          onClick={handleSave}
          className="bg-indigo-950 text-white p-2 rounded font-bold h-fit"
        >
          Add
        </button>
      </Modal>
      <section className="flex flex-row justify-center items-center gap-2">
        <button
          className="text-white bg-indigo-950 font-sans p-2 font-extrabold rounded-md opacity-75 hover:opacity-100 duration-300"
          onClick={() => setModalS(true)}
        >
          New Service
        </button>
        {Items.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="opacity-80 hover:opacity-100 duration-300 bg-red-600 text-white font-extrabold font-sans p-2 rounded-md"
          >
            Remove All
          </button>
        )}
      </section>
    </section>
  );
}
