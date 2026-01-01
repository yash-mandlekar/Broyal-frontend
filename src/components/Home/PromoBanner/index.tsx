import React from "react";
import Image from "next/image";
import { Sparkles, Gem } from "lucide-react";

const PromoBanner = () => {
  return (
    <section className="overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Main Large Banner */}
        <div className="relative z-1 overflow-hidden rounded-2xl py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 mb-6 md:mb-8 lg:mb-10 gradient-white-to-gray border-2 border-gray-3 hover-lift">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <Sparkles size={18} className="text-black" />
                <span className="font-semibold text-sm md:text-base text-gray-600">
                  Premium Collection
                </span>
              </div>

              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 lg:mb-5 leading-tight text-black">
                Diamond Solitaire Collection
              </h2>

              <p className="font-bold text-xl sm:text-2xl md:text-3xl mb-3 md:mb-4 text-black">
                UP TO 30% OFF
              </p>

              <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 max-w-md leading-relaxed">
                Celebrate life&apos;s most precious moments with our exquisite
                diamond solitaire rings. Each piece features conflict-free
                diamonds, expertly cut and set in premium metals.
              </p>

              <button className="inline-flex font-semibold text-sm md:text-base py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 hover:scale-105 w-fit bg-black text-white hover:bg-black-light shadow-bw-medium">
                Buy Now
              </button>
            </div>

            {/* Image */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-full lg:min-h-80">
              <Image
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop"
                alt="diamond solitaire ring"
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
                width={400}
                height={500}
              />
            </div>
          </div>
        </div>

        {/* Two Small Banners Grid */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Pearl Necklace Banner */}
          <div className="relative z-1 overflow-hidden rounded-2xl py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white-soft border-2 border-gray-3 hover-lift">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Image for mobile/tablet */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:order-2 flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
                  alt="pearl necklace"
                  className="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
                  width={300}
                  height={300}
                />
              </div>

              {/* Content */}
              <div className="flex-1 md:order-1">
                <div className="flex items-center gap-2 mb-2">
                  <Gem size={16} className="text-black" />
                  <span className="text-sm font-semibold text-gray-600">
                    Pearl Collection
                  </span>
                </div>

                <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-2 text-black">
                  Timeless Elegance
                </h3>

                <p className="font-semibold text-base sm:text-lg mb-4 text-black">
                  Flat 20% off
                </p>

                <p className="text-xs sm:text-sm text-gray-700 mb-4">
                  Freshwater pearls combined with premium gold settings for an
                  timeless look.
                </p>

                <button className="font-semibold text-sm md:text-base py-2.5 md:py-3 px-6 md:px-7 rounded-lg transition-all duration-300 hover:scale-105 w-fit bg-black text-white hover:bg-black-light shadow-bw-soft">
                  Grab Now
                </button>
              </div>
            </div>
          </div>

          {/* Emerald Earrings Banner */}
          <div className="relative z-1 overflow-hidden rounded-2xl py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gray-soft border-2 border-gray-3 hover-lift">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Image for mobile/tablet */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:order-2 flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop"
                  alt="emerald earrings"
                  className="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-500"
                  width={300}
                  height={300}
                />
              </div>

              {/* Content */}
              <div className="flex-1 md:order-1">
                <div className="flex items-center gap-2 mb-2">
                  <Gem size={16} className="text-black" />
                  <span className="text-sm font-semibold text-gray-600">
                    Gemstone Collection
                  </span>
                </div>

                <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-2 text-black">
                  Emerald & Diamond
                </h3>

                <p className="font-semibold text-base sm:text-lg mb-4 text-black">
                  Up to 40% off
                </p>

                <p className="text-xs sm:text-sm text-gray-700 mb-4 max-w-xs">
                  Stunning emerald gemstones surrounded by brilliant diamonds,
                  handcrafted to perfection in 18K gold settings.
                </p>

                <button className="font-semibold text-sm md:text-base py-2.5 md:py-3 px-6 md:px-7 rounded-lg transition-all duration-300 hover:scale-105 w-fit bg-black text-white hover:bg-black-light shadow-bw-soft">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
