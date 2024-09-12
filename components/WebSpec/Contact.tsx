import { useState } from "react";
import Modal from "../Toolkit/Modal";
import { contact_info } from "@/lib/config/types";
import InputField from "../Toolkit/InputField";
import { placeholders } from "../config/types";

interface ContactProps {
  setContact: (value: any) => void;
}
export default function Contact({ setContact }: ContactProps) {
  const [modalC, setModalC] = useState(false);
  const [data, setData] = useState<contact_info>({
    company_name: "",
    hours: "",
    email: "",
  });
  const handleSetData = (newValue: Partial<contact_info>) => {
    setData((prev) => ({ ...prev, ...newValue }));
  };
  const handleSave = () => {
    setContact({ contact_info: data });
    setModalC(false);
  };
  return (
    <section className="flex flex-row justify-center items-center">
      <button
        className="text-white bg-indigo-950 font-sans p-2 font-extrabold rounded-md opacity-75 hover:opacity-100 duration-300"
        onClick={() => setModalC(true)}
      >
        Set Contact Info
      </button>
      <Modal title="Contact Info" open={modalC} onClose={setModalC}>
        <InputField
          label="Company Name"
          placeholder={placeholders.contact_info?.company_name}
          control={handleSetData}
          property="company_name"
        />
        <InputField
          label="Email"
          type="email"
          placeholder={placeholders.contact_info?.email}
          control={handleSetData}
          property="email"
        />
        <InputField
          label="Facebook"
          placeholder={placeholders.contact_info?.facebook}
          control={handleSetData}
          property="facebook"
        />
        <InputField
          label="Instagram"
          placeholder={placeholders.contact_info?.instagram}
          control={handleSetData}
          property="instagram"
        />
        {data.company_name.length > 0 && (
          <div>
            <InputField
              label="Open Hours"
              type="number"
              placeholder={placeholders.contact_info?.hours}
              control={handleSetData}
              property="hours"
            />
            <InputField
              label="Company Location"
              placeholder={placeholders.contact_info?.location}
              control={handleSetData}
              property="location"
            />
          </div>
        )}

        <InputField
          label="Phone (optional)"
          placeholder={placeholders.contact_info?.phone as string}
          control={handleSetData}
          property="phone"
        />
        <button
          onClick={handleSave}
          className="bg-indigo-950 text-white p-2 rounded font-bold h-fit"
        >
          Save
        </button>
      </Modal>
    </section>
  );
}
