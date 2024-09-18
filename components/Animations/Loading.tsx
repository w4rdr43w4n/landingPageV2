import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LottieAnimationsURLS } from "../config/types";

interface Props {
  size?: number;
}

export default function LoadingAnimation({ size = 250 }: Props) {
  return (
      <section className="bg-gray-500 rounded-md" style={{ width: `${size}px`, height: `${size}px`}} >
      <DotLottieReact src={LottieAnimationsURLS.Loading} loop autoplay  />
    </section>
  );
}
