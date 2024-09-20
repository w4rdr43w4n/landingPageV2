"use client";

import GenerateField from "@/components/Preview/GenerateField";
import Preview from "@/components/Preview/Preview";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  return (
    <>
      <main className="flex flex-col items-center justify-center p-8 gap-10">
        <section className="flex flex-row gap-2">
          <a
            className="text-white font-extrabold bg-teal-900 text-xl rounded-md p-2"
            href="/web_gen"
          >
            Custom AI Generated Website Tool
          </a>
          <a
            className="text-white font-extrabold bg-teal-900 text-xl rounded-md p-2"
            href="/img_to_website"
          >
            Image to Website Tool
          </a>
        </section>
      </main>
    </>
  );
}
