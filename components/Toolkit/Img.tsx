import React, { useState, useEffect } from "react";

interface ImgProps {
  src: string;
  alt: string;
  width?: number | string;
  dark: boolean;
  height?: number | string;
}

export default function Img({
  src,
  alt,
  width = 50,
  height = width,
  dark = true,
}: ImgProps) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    try {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsValid(true);
      img.onerror = () => setIsValid(false);
    } catch (err: any) {
      console.error("Image Loading Error: " + err.message);
    }
  }, [src]);

  return (
    <>
      {isValid ? (
        <div style={{ width, height }}>
          <img
            src={src}
            alt={alt}
            style={{ width, height }}
            className="rounded-md object-cover"
          />
        </div>
      ) : (
        <>
          {dark ? (
            <div
              className={`flex items-center justify-center rounded-md bg-slate-900 border border-gray-600`}
              style={{ width, height }}
            >
              <span className="text-white text-xl font-extrabold">?</span>
            </div>
          ) : (
            <div
              className={`flex items-center justify-center rounded-md bg-white border border-gray-300`}
              style={{ width, height }}
            >
              <span className="text-black text-xl font-extrabold">?</span>
            </div>
          )}
        </>
      )}
    </>
  );
}
