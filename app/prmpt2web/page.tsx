"use client";

import Prompt from "@/components/Prompt/Prompt";
import StepLine from "@/components/Prompt/StepsLine";
import { steps } from "@/lib/config/types";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState<steps>(steps.CHOOSE);
  return (
    <div className="flex flex-col justify-evenly h-full">
      <StepLine currentStep={step} />
      <Prompt step={step} setStep={setStep} />
    </div>
  );
}
