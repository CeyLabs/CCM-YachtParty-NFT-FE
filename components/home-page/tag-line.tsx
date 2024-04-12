"use client";
import React from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const TagLine = () => {
  const words = [
    {
      text: "Ceylon",
      className: "text-slate-400 uppercase font-['Exo']",
    },
    {
      text: "Halving",
      className: "text-slate-400 uppercase font-['Exo']",
    },
    {
      text: "yacht",
      className: "text-slate-400 uppercase font-['Exo']",
    },
    {
      text: "Party",
      className: "bg-gradient-to-r from-orange-500 to-amber-500 inline-block text-transparent bg-clip-text uppercase font-['Exo']",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} />
      <div className="tag text-slate-200 font-['Exo']">Mint your NFT</div>
    </div>
  );
}

export default TagLine;