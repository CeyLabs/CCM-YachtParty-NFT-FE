"use client";
import React from "react";
import Image from "next/image";

const FooterBar: React.FC = () => {
    return (
        <div className="sticky mx-auto text-xs text-slate-400 flex h-16 gap-1 items-center x-4 md:px-6">
            Made in Sri Lanka 🇱🇰 Developed by <a target="_blank" href="https://perfectustec.com/">Perfectus</a>
        </div>     
    );
  }
  
  export default FooterBar;