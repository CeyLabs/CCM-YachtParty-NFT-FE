"use client"
import React from "react"
import Image from "next/image";
import { CustomConnectionButton } from "@/components/wallet-connect/wallet-connect-button";

const Sponsors: React.FC = () => {
  return (
    <header className="sticky pt-20 flex h-full items-center gap-4 px-4 md:px-10 md:mx-10 justify-between">
      <div>
        <a target="_blank" href="https://t.me/cryptokalliya">
            <Image
            src="/images/sponsors/CK_White.png"
            alt="Crypto Kalliya"
            width={100}
            height={100}
            />
        </a>
     </div>
     <div>
        <a target="_blank" href="https://chainlyze.ai">
            <Image
            src="/images/sponsors/Chainlyze_B.png"
            alt="Chainlyze"
            width={100}
            height={100}
            />
        </a>
      </div>
      <div>
        <a target="_blank" href="https://perfectustec.com">
            <Image
            src="/images/sponsors/perfectus_horizontal_logo_green_white.png"
            alt="Perfectus Tec"
            width={100}
            height={100}
            />
        </a>
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
        <a target="_blank" href="https://technews.lk">
            <Image
            src="/images/sponsors/techie-logo-technews.lk.png"
            alt="Technews.lk"
            width={100}
            height={100}
            />
        </a>
      </div>
      <div>
        <a target="_blank" href="https://ceylonnewsfactory.lk/">
            <Image
            src="/images/sponsors/CNF logo.png"
            alt="Ceylon News Factory"
            width={60}
            height={60}
            />
        </a>
      </div>
      <div>
        <a target="_blank" href="https://nelnamango.com/">
            <Image
            src="/images/sponsors/Nelna Mango.png"
            alt="Nelna Agri Development"
            width={80}
            height={80}
            />
        </a>
      </div>
    </header>
  );
}



export default Sponsors;