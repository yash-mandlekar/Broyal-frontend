"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import testimonialsData from "./testimonialsData";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";

const Testimonials = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section
      className="overflow-hidden py-16 sm:py-20"
      style={{
        background: "linear-gradient(135deg, #f5f1ed 0%, #ede8e3 100%)",
      }}
    >
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="swiper testimonial-carousel common-carousel">
          {/* Section title */}
          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span
                className="flex items-center gap-2.5 font-semibold text-sm mb-2"
                style={{ color: "#832729" }}
              >
                <Star size={20} fill="#832729" />
                Testimonials
              </span>
              <h2
                className="font-bold text-2xl sm:text-3xl lg:text-4xl"
                style={{ color: "#4F1719" }}
              >
                What Our Customers Say
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Hear from our satisfied customers about their experience
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                style={{
                  borderColor: "#832729",
                  backgroundColor: "#ffffff",
                  color: "#832729",
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                style={{
                  backgroundColor: "#832729",
                  color: "#ffffff",
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            ref={sliderRef}
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1000: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonialsData.map((item, key) => (
              <SwiperSlide key={key}>
                <SingleItem testimonial={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;