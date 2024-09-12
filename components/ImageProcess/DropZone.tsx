"use client";
import { useState, DragEvent } from "react";
import { ImageData } from "@/components/config/types"

interface Props{
  setCode: (code:string)=>void;
}


export default function Dropzone({setCode}:Props) {
  const [base64, setBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image_data,setData] = useState<ImageData | null>(null)
  function handleDrop(e: DragEvent<HTMLDivElement>){
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
        setCode(reader.result as string);
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please drop a valid image file");
    }
    
    setData({image_name:file.name,image_size:""+file.size / 1000})
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-400 rounded-md h-64 min-w-96"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {!base64 && <p className="text-gray-600">
        Drag & drop an image here
      </p>}
      {error && <p className="text-red-500">{error}</p>}
      {base64 && (
        <div className="mt-4 relative">
          <img src={base64} alt="Dropped" className="w-56 h-56 rounded-md" />
          <div className="flex flex-row w-full bg-slate-600 h-fit text-white p-5 absolute bottom-0 opacity-90 items-center justify-center gap-3">
            <p className="font-bold text-sm">{image_data?.image_name}</p>
            <p className="font-bold">{image_data?.image_size}KB</p>
          </div>
        </div>
      )}
    </div>
  );
}
