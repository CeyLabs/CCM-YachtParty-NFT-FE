"use client";
import React from "react";
import Image from "next/image";
import { CustomConnectionButton } from "@/components/wallet-connect/wallet-connect-button";

const NavigationBar: React.FC = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4  px-4 md:px-6 justify-between">
      <div className="site-logo">
        <Image
          src="/images/logo.png"
          alt="ceylon crypto meetup"
          width={50}
          height={50}
        />
      </div>
      <div className="wallet-connect-buttons">
        <CustomConnectionButton />
      </div>
    </header>
  );
}

export default NavigationBar;