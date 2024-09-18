import { useState } from "react";
import Img from "./Img";

interface Props {
  links: string[];
  onRemove: (updatedLinks: string[]) => void;
}

export default function ImgList({ links, onRemove }: Props) {
  const handleRemoveAtIndex = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    onRemove(updatedLinks);
  };

  return (
    <section className="flex gap-2 py-2 w-full max-w-[200px] overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {links.map((link, index) => (
        <section
          key={index}
          className="relative h-fit w-fit group duration-500 ease-in-out "
        >
          <Img src={link} alt={`image ${index}`} width={50} />
          <button
            onClick={() => handleRemoveAtIndex(index)}
            className="absolute opacity-0 group-hover:opacity-100 duration-300 ease-in-out top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-md w-full h-full rounded-md"
          >
            <div className="flex items-center justify-center">
              <p className="text-white bg-red-800 w-fit h-fit rounded-full px-2 text-xl font-extrabold">×</p>
            </div>
          </button>
        </section>
      ))}
    </section>
  );
}
