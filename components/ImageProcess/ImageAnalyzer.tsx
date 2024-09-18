"use client";

import React, { useState, DragEvent } from "react";
import { analyzeImage } from "@/lib/img2web/gemini";
import { ImageData } from "@/components/config/types";
import { adjustSize } from "@/lib/utils";
import LoadingAnimation from "../Animations/Loading";

export default function ImageAnalyzer({
  setInstr,
}: {
  setInstr: (desc: string) => void;
}) {
  const [image, setImage] = useState<ImageData | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [loading, setLoadingState] = useState(false);
  const [Drag, setDragState] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      setImage({
        image_name: e.target.files[0].name,
        image_size: adjustSize(e.target.files[0].size),
      });
    }
  };
  const handleAnalyze = async () => {
    if (base64) {
      try {
        setLoadingState(true);
        const result = await analyzeImage(base64.split(",")[1]);
        setInstr(result.analysis);
      } catch (error) {
        console.error("Error analyzing image:", error);
      } finally {
        setLoadingState(false);
      }
    }
  };
  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Please drop a valid image file");
    }
    setImage({ image_name: file.name, image_size: adjustSize(file.size) });
    setDragState(false);
  }
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragState(true);
  };
  const handleOpenImage = () => {
    const selector = document.getElementById("selector");
    selector?.click();
  };
  const handleRemove = () => {
    setBase64(null);
    setImage(null);
  };
  const handleDrag = () => {
    setDragState(false);
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`flex flex-row  justify-center items-center gap-40 border-dashed border-[4px] w-fit h-fit p-12 duration-200 rounded-m ${
        Drag ? "border-green-500" : "border-slate-500"
      }  `}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
        id="selector"
      />
      {base64 ? (
        <div>
          {loading ? (
            <LoadingAnimation />
          ) : (
            <div className="flex flex-col gap-10">
              <div className="relative">
                <img
                  src={base64}
                  alt="Dropped"
                  className="w-56 h-56 rounded-md object-cover"
                />
                <div className="flex flex-row w-full bg-slate-600 h-fit text-white p-5 absolute bottom-0 opacity-85 items-center justify-center gap-3">
                  <p className="font-bold text-sm">{image?.image_name}</p>
                  <p className="font-bold">{image?.image_size}</p>
                  <button
                    disabled={loading}
                    onClick={handleRemove}
                    className="bg-red-500 w-16 text-[12px] text-white font-bold p-1 rounded-md duration-300 disabled:opacity-50 "
                  >
                    X
                  </button>
                </div>
              </div>
              <button
                className="text-white font-bold border-none disabled:opacity-50 bg-teal-900 p-5 shadow-md duration-200  rounded-md"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? "Analyzing" : "Analyze Image"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 w-[300px]">
          <p
            className={`${
              Drag ? "text-green-500" : "text-slate-500"
            } transition-all`}
          >
            {Drag
              ? "Drop The Image Now"
              : "Drag or Choose an Image to be analyzed"}{" "}
          </p>
          <button
            className="text-white bg-teal-950 p-5 font-bold rounded-md opacity-60 hover:opacity-100 duration-300"
            onClick={handleOpenImage}
          >
            Choose An Image
          </button>
        </div>
      )}
    </div>
  );
}
