import React, { useState } from "react";
import Prev from "./Prev";
import { SliderProps, steps, Temp } from "@/lib/config/types";
import { Button } from "@mui/material";
import { assembleDoc, openHtmlInNewTab } from "@/lib/utils";

export default function PrevSlider({
  slides,
  setChosen,
  setStep,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = slides.length == 1;
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const Proceed = () => {
    setChosen(slides[currentIndex]);
    setStep(steps.PROMPT);
  };
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto p-4 gap-2 rounded-md outline outline-1 outline-indigo-700 bg-indigo-600">
      <Prev
        html={assembleDoc(slides[currentIndex].html, slides[currentIndex].css)}
      />

      <div className="flex flex-row w-full justify-between h-fit items-center">
        {/* Left Arrow */}
        <button
          disabled={controls}
          onClick={prevSlide}
          className={`${
            controls ? "hidden" : ""
          }bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow`}
        >
          <svg
            className="w-7 h-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {/* Caption */}
        <div className="w-full text-center text-lg font-semibold text-white">
          {slides[currentIndex].name}
        </div>
        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={controls}
          className={`${
            controls ? "hidden" : ""
          }bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow`}
        >
          <svg
            className="w-7 h-7 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          variant="contained"
          className=" text-white flex-1"
          onClick={() =>
            openHtmlInNewTab(
              assembleDoc(slides[currentIndex].html, slides[currentIndex].css)
            )
          }
        >
          Preview
        </Button>
        <Button
          onClick={Proceed}
          variant="contained"
          className="bg-indigo-950 flex-1"
        >
          Choose
        </Button>
      </div>
    </div>
  );
}
