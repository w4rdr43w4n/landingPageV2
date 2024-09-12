// components/FontPreview.tsx
import { useEffect, useState } from "react";

interface FontPreviewProps {
  fontFamily: string; 
  text: string;
}

export default function FontPreview({ fontFamily, text }:FontPreviewProps){
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      /\s+/g,
      "+"
    )}:wght@400&display=swap`;
    link.rel = "stylesheet";
    link.onload = () => setLoading(false);
    link.onerror = () => {
      console.error('Failed to load font');
      setLoading(false);
    };

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontFamily]);

  return (
    <div className="flex flex-col items-center justify-center h-fit p-2 border-[2px] border-slate-700 rounded-md ">
      {loading ? (
        <p className="text-lg text-gray-500">Loading...</p>
      ) : (
        <p className="text-3xl" style={{ fontFamily }}>
          {text}
        </p>
      )}
    </div>
  );
};

