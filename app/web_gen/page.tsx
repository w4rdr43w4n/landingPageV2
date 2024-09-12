"use client";

import { portfolio } from "@/lib/sample";
import { useState } from "react";
import ConfigPanel from "@/components/WebSpec/ConfigPanel";
import Preview from "@/components/Preview/Preview";

export default function Page() {
  const [code, setCode] = useState("");
  return (
    <main className="bg-[#121212] gap-1 w-full h-full text-white flex flex-col justify-center items-center overflow-auto p-4">
      {code ? <Preview code={code} /> : <ConfigPanel setCode={setCode} />}
    </main>
  );
}

/*<button
        disabled={loading}
        className="disabled:opacity-50 font-bold bg-indigo-800 p-2 rounded-md text-[24px]"
        onClick={generate}
      >
        {loading ? "Processing.." : "Generate"}
      </button> */
