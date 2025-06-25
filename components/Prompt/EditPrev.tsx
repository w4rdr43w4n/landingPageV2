import { Button } from "@mui/material";
import Prev from "./Prev";
import { copyToClipboard, openHtmlInNewTab } from "@/lib/utils";
import { EditProps, steps } from "@/lib/config/types";
import { useState } from "react";

export default function EditPrev({ html, setStep }: EditProps) {
  const [copyState, setCopyState] = useState(false);
  const handleCopy = async () => {
    const res = await copyToClipboard(html);
    if (res) setCopyState(true);
    setTimeout(() => {
      setCopyState(false);
    }, 1000);
  };
  return (
    <div className="flex flex-col gap-3 max-w-[450px] w-fit h-fit bg-indigo-400 p-2 rounded-md shadow-black shadow-md">
      <Prev html={html} />
      <div className="flex flex-row gap-2">
        <Button
          variant="contained"
          className=" text-white flex-1 shadow-black shadow-sm bg-slate-800 hover:bg-slate-900"
          onClick={() => setStep(steps.PROMPT)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          className={`${
            copyState ? "bg-green-600" : ""
          } text-white flex-1 shadow-black shadow-sm`}
          onClick={handleCopy}
          disabled={copyState}
        >
          {copyState ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="contained"
          className=" text-white flex-1 bg-indigo-800 shadow-black shadow-sm hover:bg-indigo-900"
          onClick={() => openHtmlInNewTab(html)}
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
