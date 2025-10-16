"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./carousel";
import Autoscroll from "embla-carousel-auto-scroll";

const logos = [
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
  {
    image: "https://cdn.worldvectorlogo.com/logos/lorem-lorem.svg",
    name: "lorem",
  },
];

export const Logos3 = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center text-4xl tracking-tight font-medium text-white">
              Trusted by teams at over 1,000 of the world's leading organizations
            </div>
          </div>
          <Carousel
            plugins={[
              Autoscroll({
                speed: 0.5,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {logos.map((logo, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/6"
                >
                  <div className="flex aspect-video items-center justify-center p-6">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="max-h-10"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};