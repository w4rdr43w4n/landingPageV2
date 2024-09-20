import { useState } from "react";
import { placeholders } from "../config/types";
import Img from "./Img";
import InputField from "./InputField";

interface props {
  setLogo: (value: any) => void;
}

export default function ImgLink({ setLogo }: props) {
  const [link, setLink] = useState("");

  return (
    <section className="flex flex-col justify-start w-full">
      <label className="text-slate-950 text-[0.85rem] font-bold">
        Logo Link
      </label>
      <section className="flex flex-row items-start w-full">
        <input
          placeholder={placeholders.logo_link}
          className={`opacity-80 focus:opacity-100 outline-none text-white p-4 text-[14px] rounded-md bg-gray-900 border-none w-${(link.length>0)?"full":"[250px]"} h-full`}
          onChange={(e) => setLink(e.target.value)}
        />
        {link && link.length > 0 && <Img dark alt="logo" src={link} width={49} />}
      </section>
    </section>
  );
}
