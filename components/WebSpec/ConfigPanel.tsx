"use client";
import { useState } from "react";
import InputField from "../Toolkit/InputField";
import { placeholders } from "../config/types";
import CarouselField from "./CarouselField";
import { WebSpec, WebSpecType } from "@/lib/config/types";
import FAQField from "./Faq";
import Services from "./Services";
import Paragraphs from "./Paragraphs";
import Contact from "./Contact";
import ThemeConfig from "./ThemeConfig";
import Img from "../Toolkit/Img";

interface ConfigProps{
  setCode:(value:string)=>void
}

export default function ConfigPanel({setCode}:ConfigProps) {
  const [config, setConfig] = useState<WebSpecType>();
  const [isloading,setLoadingState]=useState(false)
  const handleChange = (newValue: any) => {
    setConfig((prev) => ({ ...prev, ...newValue }));
  };
  const handleGenerate = async () => {
    const web = new WebSpec(config);
    console.log(web.prompt)
    try{
      setLoadingState(true)
      const resp = await web.generate();
      if(resp)setCode(resp)
      else alert("Something went wrong!")
    }catch(err:any){
      setLoadingState(false)
      console.log(err.message)
    }finally{
      setLoadingState(false)
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <section className="flex flex-row gap-4 bg-slate-700 w-fit h-fit p-5 rounded-md overflow-y-auto">
        <section className=" flex flex-col flex-1 min-w-24 gap-2">
          <section className="flex flex-row gap-2 items-end justify-center overflow-x-auto">
            {config?.logo_link && config?.logo_link.length > 0 && (
              <Img alt="logo" src={config?.logo_link} width={100} height={50} />
            )}
            <InputField
              placeholder={placeholders.logo_link}
              control={handleChange}
              label="Logo Link"
              property="logo_link"
            />
          </section>
          <InputField
            placeholder={placeholders.website_title}
            control={handleChange}
            label="Website Title"
            property="website_title"
          />
          <InputField
            control={handleChange}
            property="reviews_count"
            label="Reviews Count"
            type="number"
          />
          <FAQField setFAQs={handleChange} />
          <Services setServices={handleChange} />
          <Paragraphs setPs={handleChange} />
          <ThemeConfig setTheme={handleChange} />
        </section>
        <section className=" flex flex-col flex-1 min-w-24 gap-2">
          <InputField
            control={handleChange}
            label="Hero Section Text"
            placeholder={placeholders.hero_text}
            type="text"
            property="hero_text"
          />
          <InputField
            control={handleChange}
            label="Explainer Video Link"
            placeholder={placeholders.explainer_video_link}
            type="text"
            property="explainer_video_link"
          />
          <CarouselField setCarousel={handleChange} />
          <Contact setContact={handleChange} />
        </section>
      </section>
      <section className="flex flex-row gap-3">
        { <button
          onClick={() => console.log("Config:", JSON.stringify(config))}
          className="p-2 font-extrabold text-white bg-teal-900 rounded-md h-fit"
        >
          Get Config
        </button>}
        <button
          onClick={handleGenerate}
          disabled={isloading}
          className="p-2 disabled:opacity-50 font-extrabold text-white bg-indigo-900 rounded-md h-fit"
        >
         {isloading ? "Processing...":"Generate"}
        </button>
      </section>
    </section>
  );
}
