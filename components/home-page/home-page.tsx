"use client"
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import NavigationBar from "@/components/home-page/nav-bar";
import MintingCard from "./nft-mint-card";
import TagLine from "./tag-line";
import { AccordionDemo } from "./faq";
// import  { CarouselDemo } from "./sponsor-logo";
import Sponsors from "./sponsor-logo";
import FooterBar from "./footer";





const HomePageView = () => {

  return (
    <div className="flex min-h-screen w-full flex-col bg-neutral-950">
      <BackgroundBeams />
      <NavigationBar />
      <TagLine />
      <MintingCard />
      {/* <CarouselDemo /> */}
      <Sponsors />
      <AccordionDemo/>
      <FooterBar />
    </div>
  );
}

export default HomePageView;