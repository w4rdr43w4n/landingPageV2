"use client";

import EditPrev from "@/components/Prompt/EditPrev";
import Generator from "@/components/Prompt/Generator";
import SelectPanel from "@/components/Prompt/SelectPanel";
import { GenPromptProps, steps, Temp } from "@/lib/config/types";
import { useState } from "react";

export default function Prompt({ setStep, step }: GenPromptProps) {
  const [chosenTemp, setChosenTemp] = useState<Temp | null>(null);
  const [edited, setEdited] = useState<string | null>("");
  switch (step) {
    case steps.CHOOSE:
      return <SelectPanel setStep={setStep} setChosen={setChosenTemp} />;
    case steps.PROMPT:
      if (chosenTemp)
        return (
          <Generator
            setResult={setEdited}
            setStep={setStep}
            temp={chosenTemp}
          />
        );
      else
        return (
          <div className="w-full max-w-xl mx-auto p-4 bg-red-300 rounded-md flex justify-center items-center">
            <h1 className="text-red-700 text-center font-bold">
              No Selected Templates
            </h1>
          </div>
        );

    case steps.PREVIEW:
      if (edited) return <EditPrev setStep={setStep} html={edited} />;
      else
        return (
          <div className="w-full max-w-xl mx-auto p-4 bg-red-300 rounded-md flex justify-center items-center">
            <h1 className="text-red-700 text-center font-bold">
              Something went wrong, Try again later
            </h1>
          </div>
        );
  }
}
