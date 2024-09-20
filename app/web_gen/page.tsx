"use client";

import { useState } from "react";
import ConfigPanel from "@/components/WebSpec/ConfigPanel";
import Preview from "@/components/Preview/Preview";

export default function Page() {
  const [code, setCode] = useState("");
  return (
    <main className="bg-[#121212] gap-1 w-full h-full text-white flex flex-col justify-center items-center overflow-auto p-4">
      {code ? <Preview setCode={setCode} code={code} /> : <ConfigPanel setCode={setCode} />}
    </main>
  );
}

