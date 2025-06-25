import React from "react";

export default function StepLine({ currentStep = 1 }) {
  const steps = ["Choose", "Edit", "Preview"];

  return (
    <div className="flex items-center justify-between w-full max-w-md">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`w-16 p-2 h-8 rounded-md flex items-center justify-center text-white text-sm font-medium 
                ${index <= currentStep ? "bg-indigo-600" : "bg-gray-300"}`}
            >
              {step}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                index < currentStep ? "bg-indigo-600" : "bg-gray-300"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
