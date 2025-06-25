import { GenProps, steps, Temp } from "@/lib/config/types";
import PromptInput from "./PromptInput";
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { generateEdits } from "@/lib/config/prompt/prompt_utils";

export default function Generator({ temp, setStep, setResult }: GenProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await generateEdits(prompt, temp);
    setLoading(false);
    if (res.success) {
      setResult(res.source_code);
      setStep(steps.PREVIEW);
    } else {
      setResult(null);
    }
  };

  return (
      <div className="p-2 flex-col flex bg-indigo-950 rounded-md w-96 gap-2">
        <div className="flex flex-row bg-indigo-800 p-2 text-white rounded-md w-full items-center justify-center">
          <h1>Chosen Template: {temp.name}</h1>
        </div>
        <h1 className="w-full text-center text-white font-bold">
          How can we cutomize this for you?
        </h1>
        <PromptInput prompt={prompt} setPrompt={setPrompt} />
        <div className="flex flex-row gap-2">
          <Button
            variant="contained"
            className="text-white bg-indigo-600 w-full"
            onClick={() => setStep(steps.CHOOSE)}
          >
            Back
          </Button>
          <Button
            variant="text"
            disabled={!(prompt.length > 0) || loading}
            className={`text-white bg-green-700 ${
              prompt.length > 0 ? "opacity-100" : "opacity-75"
            } w-full`}
            onClick={generate}
          >
            {loading ? (
              <div className="flex flex-row gap-3">
                <CircularProgress size={"20px"} />
                <span>Processing</span>
              </div>
            ) : (
              <span>Done</span>
            )}
          </Button>
        </div>
      </div>
  );
}
