import React from "react";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import FullScreenHeroSlider from "./FullScreenHeroSlider";

const Hero = () => {
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5  animate-fade-in">
      <div className="w-full mx-auto px-4 sm:px-8 xl:px-10">
        <div className="flex flex-wrap gap-5">
          <div className="w-full">
            <div className="relative z-1 rounded-[10px] glass-white overflow-hidden shadow-bw-medium hover-lift">
              {/* Subtle gradient overlay */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gray-100 to-transparent opacity-50 -z-1"></div>

              <FullScreenHeroSlider />
            </div>
          </div>
        </div>
      </div>

      {/* Hero features */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
