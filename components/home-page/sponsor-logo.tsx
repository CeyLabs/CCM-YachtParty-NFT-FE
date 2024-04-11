"use client"
import React from "react"
import Image from "next/image";
import { CustomConnectionButton } from "@/components/wallet-connect/wallet-connect-button";

const NavigationBar: React.FC = () => {
  return (
    <header className="sticky top-100 pt-20 flex h-full items-center gap-4  px-4 md:px-6 justify-between">
      <div>
        <Image
          src="/images/sponsors/CK_White.png"
          alt="Crypto Kalliya"
          width={100}
          height={100}
        />
     </div>
     <div>
        <Image
          src="/images/sponsors/Chainlyze_B.png"
          alt="Chainlyze"
          width={100}
          height={100}
        />
      </div>
      <div>
        <Image
          src="/images/sponsors/perfectus_horizontal_logo_green_white.png"
          alt="Perfectus Tec"
          width={100}
          height={100}
        />
      </div>
      <div>
        <Image
          src="/images/sponsors/Swiss Ceylon.png"
          alt="Swiss Ceylon Gemology"
          width={100}
          height={100}
        />
      </div>
      <div>
        <Image
          src="/images/sponsors/techie-logo-technews.lk.png"
          alt="Technews.lk"
          width={100}
          height={100}
        />
      </div>
      <div>
        <Image
          src="/images/sponsors/CNF logo .png"
          alt="Ceylon News Factory"
          width={60}
          height={60}
        />
      </div>
    </header>
  );
}



export default NavigationBar;