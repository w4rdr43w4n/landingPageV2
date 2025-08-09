"use client";

import PrevSlider from "@/components/Prompt/PrevSlider";
import { loadTemplates } from "@/lib/config/prompt/prompt_utils";
import { SelectorProps, Temp } from "@/lib/config/types";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectPanel({ setChosen, setStep }: SelectorProps) {
  const [temp, setTemp] = useState<Temp[] | null>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemps = async () => {
      const res = await loadTemplates();
      setLoading(false);
      setTemp(res);
    };
    fetchTemps();
  }, []);

  if (isLoading) {
    return <CircularProgress size="100px" />;
  }
  if (!temp) {
    return (
      <div className="w-full max-w-xl mx-auto p-4 bg-red-300 rounded-md flex justify-center items-center">
        <h1 className="text-red-700 text-center font-bold">
          No Templates Found
        </h1>
      </div>
    );
  }
  return (
    <div className="bg-indigo-500 flex flex-col items-center rounded-lg shadow-black shadow-lg p-3 w-full">
      <h2 className="text-white font-bold text-2xl">Choose a Template</h2>
      <PrevSlider setStep={setStep} setChosen={setChosen} slides={temp} />
    </div>
  );
}
