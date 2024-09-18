"use client";

import { useEffect, useState } from "react";
import Modal from "../Toolkit/Modal";
import { carousel } from "@/lib/config/types";
import ImgList from "../Toolkit/ImgList";
import InputField from "../Toolkit/InputField";
import { placeholders } from "../config/types";

interface CarouselFieldProps {
  setCarousel: (data: any) => void;
}

export default function CarouselField({ setCarousel }: CarouselFieldProps) {
  const [link, setLink] = useState("");
  const [cModal, setCModal] = useState(false);
  const [data, setData] = useState<carousel>({
    main_text: "",
    caption: "",
    duration: 0,
    images: [],
  });
  const handleNewImage = () => {
    setData((prev) => {
      const updatedData = { ...prev, images: [...prev.images, link] };
      return updatedData;
    });
    setCModal(false);
  };
  const handleSetImage = (newImgs: string[]) => {
    setData((prev) => {
      const updated = { ...prev, images: [...newImgs] };
      return updated;
    });
  };
  const handleSetConfig = (newValue: any) => {
    setData((prev) => {
      const updated = { ...prev, ...newValue };
      return updated;
    });
  };
  useEffect(() => {
    setCarousel({ carousel: data });
  }, [data]);
  return (
    <section className="flex flex-col min-w-64 p-1 w-fit h-fit">
      <label className="text-slate-950 text-[0.85rem] font-bold">
        Carousel Section Settings
      </label>
      <InputField
        label="Main Text"
        control={handleSetConfig}
        property="main_text"
        placeholder={placeholders.carousel?.main_text}
      />
      <InputField
        label="Secondary Text"
        control={handleSetConfig}
        property="caption"
        placeholder={placeholders.carousel?.caption}
      />
      <InputField
        label="Image Switch Duration"
        control={handleSetConfig}
        type="number"
        property="duration"
      />

      <section className="flex flex-row gap-2 justify-center items-center">
        <Modal onClose={setCModal} open={cModal} title="Add An Image">
          <div className="flex flex-col items-center">
            <InputField label="New Image Link" control={setLink} />
            <button
              onClick={handleNewImage}
              className="bg-indigo-950 text-white p-2 rounded font-bold h-fit"
            >
              SAVE
            </button>
          </div>
        </Modal>
        <ImgList onRemove={handleSetImage} links={data.images} />
        <button
          onClick={() => setCModal(true)}
          className="px-4 py-2 font-extrabold text-[18px] bg-slate-950 hover:opacity-100 opacity-85 text-white rounded"
        >
          +
        </button>
      </section>
    </section>
  );
}
