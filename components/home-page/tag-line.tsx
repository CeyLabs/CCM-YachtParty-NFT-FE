"use client";
import React from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const TagLine = () => {
  const words = [
    {
      text: "Ceylon",
      className: "text-slate-400 uppercase",
    },
    {
      text: "Halving",
      className: "text-slate-400 uppercase",
    },
    {
      text: "yacht",
      className: "text-slate-400 uppercase",
    },
    {
      text: "Party",
      className: "bg-gradient-to-r from-orange-500 to-amber-500 inline-block text-transparent bg-clip-text uppercase",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} />
      <div className="tag text-slate-300 pb-4">Mint your NFT</div>
    </div>
  );
}

export default TagLine;