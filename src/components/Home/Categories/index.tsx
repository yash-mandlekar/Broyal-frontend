"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import data from "./categoryData";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";

const Categories = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.init();
    }
  }, []);

  return (
    <section className="overflow-hidden pt-12 sm:pt-16 md:pt-20 lg:pt-24">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          {/* Section Title */}
          <div className="pr-2 mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Sparkles size={20} className="text-black" />
                <span className="font-semibold text-xs sm:text-sm uppercase tracking-wide text-gray-600">
                  Collections
                </span>
              </div>
              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black">
                Browse by Category
              </h2>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrev}
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full border border-gray-3 text-black transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 hover:bg-black hover:text-white hover:border-black"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full border border-gray-3 text-black transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 hover:bg-black hover:text-white hover:border-black"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            ref={sliderRef}
            spaceBetween={16}
            slidesPerView={6}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              1000: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
            }}
          >
            {data.map((item, key) => (
              <SwiperSlide key={key}>
                <SingleItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;
