"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// const Sponsors: React.FC = () => {
//   return (
//     <div className="sticky pt-20 flex h-full items-center gap-4 px-4 md:px-10 md:mx-10 justify-between">
//       <div >
//         <a target="_blank" href="https://t.me/cryptokalliya">
//             <Image
//             src="/images/sponsors/CK_White.png"
//             alt="Crypto Kalliya"
//             width={100}
//             height={100}
//             />
//         </a>
//      </div>
//      <div>
//         <a target="_blank" href="https://chainlyze.ai">
//             <Image
//             src="/images/sponsors/Chainlyze_B.png"
//             alt="Chainlyze"
//             width={100}
//             height={100}
//             />
//         </a>
//       </div>
//       <div>
// <a target="_blank" href="https://perfectustec.com">
//     <Image
//     src="/images/sponsors/perfectus_horizontal_logo_green_white.png"
//     alt="Perfectus Tec"
//     width={100}
//     height={100}
//     />
// </a>
//       </div>
//       <div>
// <Image
//   src="/images/sponsors/Swiss Ceylon.png"
//   alt="Swiss Ceylon Gemology"
//   width={100}
//   height={100}
// />
//       </div>
//       <div>
// <a target="_blank" href="https://technews.lk">
//     <Image
//     src="/images/sponsors/techie-logo-technews.lk.png"
//     alt="Technews.lk"
//     width={100}
//     height={100}
//     />
// </a>
//       </div>
//       <div>
// <a target="_blank" href="https://ceylonnewsfactory.lk/">
//     <Image
//     src="/images/sponsors/CNF logo.png"
//     alt="Ceylon News Factory"
//     width={60}
//     height={60}
//     />
// </a>
//       </div>
//       <div>
// <a target="_blank" href="https://nelnamango.com/">
//     <Image
//     src="/images/sponsors/Nelna Mango.png"
//     alt="Nelna Agri Development"
//     width={80}
//     height={80}
//     />
// </a>
//       </div>
//     </div>

//   );
// }

export function CarouselDemo() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full mx-auto lg:w-4/5 px-10 pt-6"
      plugins={[plugin.current]}
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem key="0" className="md:basis-1/2 lg:basis-1/4">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <a target="_blank" href="https://t.me/cryptokalliya">
                  <Image
                    src="/images/sponsors/CK_White.png"
                    alt="Crypto Kalliya"
                    width={100}
                    height={100}
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem key="1" className="md:basis-1/2 lg:basis-1/4">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <a target="_blank" href="https://chainlyze.ai">
                  <Image
                    src="/images/sponsors/Chainlyze_B.png"
                    alt="Chainlyze"
                    width={100}
                    height={100}
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem key="2" className="md:basis-1/2 lg:basis-1/4">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <a target="_blank" href="https://perfectustec.com">
                  <Image
                    src="/images/sponsors/perfectus_horizontal_logo_green_white.png"
                    alt="Perfectus Tec"
                    width={100}
                    height={100}
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem key="3" className="md:basis-1/2 lg:basis-1/4">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <Image
                  src="/images/sponsors/Swiss Ceylon.png"
                  alt="Swiss Ceylon Gemology"
                  width={100}
                  height={100}
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem key="4" className="md:basis-1/2 lg:basis-1/4">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <a target="_blank" href="https://technews.lk">
                  <Image
                    src="/images/sponsors/techie-logo-technews.lk.png"
                    alt="Technews.lk"
                    width={100}
                    height={100}
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem key="5" className="md:basis-1/2 lg:basis-1/4">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <a target="_blank" href="https://ceylonnewsfactory.lk/">
                  <Image
                    src="/images/sponsors/CNF logo.png"
                    alt="Ceylon News Factory"
                    width={60}
                    height={60}
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem key="6" className="md:basis-1/2 lg:basis-1/4">
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <a target="_blank" href="https://nelnamango.com/">
                  <Image
                    src="/images/sponsors/Nelna Mango.png"
                    alt="Nelna Agri Development"
                    width={80}
                    height={80}
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
        <CarouselNext /> */}
    </Carousel>
  );
}

// export default Sponsors;
