"use client";
import "../globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {children}
    </div>
  );
}
