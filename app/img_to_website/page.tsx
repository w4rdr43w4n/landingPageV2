"use client";

import Desc2Web from "@/components/ImageProcess/Image2Web";
import ImageAnalyzer from "@/components/ImageProcess/ImageAnalyzer";
import { useState } from "react";

export default function Page() {
  const [Instr, setInstr] = useState<string | null>(null);
  const [code, setSourceCode] = useState<string | null>(null);
  return (
    <main className="p-5 flex flex-col justify-center items-center h-full gap-2">
      {Instr ? (
        <Desc2Web Instr={Instr} />
      ) : (
        <ImageAnalyzer setInstr={setInstr} />
      )}
    </main>
  );
}
