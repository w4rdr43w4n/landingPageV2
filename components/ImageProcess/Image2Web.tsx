"use client";

import { Img2Code } from "@/lib/img2web/claude_img";
import { ChangeEvent, useState } from "react";
import Preview from "../Preview/Preview";

export default function Desc2Web({ Instr }: { Instr: string }) {
  const [loading, setLoadingState] = useState(false);
  const [desc, setDesc] = useState<string>(Instr);
  const [srcCode, setSourceCode] = useState<string | null>(null);
  async function handleGenerate() {
    try {
      setLoadingState(true);
      const code = await Img2Code({ Instr: desc });
      if (code.success) setSourceCode(code.source_code);
      else console.log(code.errMsg);
    } catch (err: any) {
      setLoadingState(false);
      console.error(err.message);
    } finally {
      setLoadingState(false);
    }
  }
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDesc(e.target.value);

  return (
    <>
      {srcCode ? (
        <Preview code={srcCode} setCode={setSourceCode} />
      ) : (
        <main className="border-indigo-950 border-dashed rounded-md p-5 border-[4px] flex flex-col justify-center items-center gap-4">
          <textarea
            className="rounded-md p-2 outline-none text-[16px] bg-slate-600 text-white w-[300px] min-h-[200px] max-h-[400px] overflow-y-auto"
            disabled={loading}
            value={desc}
            onChange={handleChange}
          ></textarea>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="text-white bg-indigo-950 font-bold rounded-md p-2 duration-300 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Website"}
          </button>
        </main>
      )}
    </>
  );
}
