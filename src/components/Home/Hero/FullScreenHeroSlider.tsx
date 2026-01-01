"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";

// Carousel data interface
interface CarouselSlide {
  id: number;
  discount: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imageAlt: string;
}

// Carousel slides data
const carouselSlides: CarouselSlide[] = [
  {
    id: 1,
    discount: 40,
    title: "Elegant Diamond Engagement Rings",
    description:
      "Discover timeless elegance with our handcrafted diamond rings. Each piece is meticulously designed to celebrate your special moments.",
    buttonText: "Shop Now",
    buttonLink: "#",
    image:
      "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd8ef7708/homepage/HeroBanner/mriganka-wo-desktop-new.jpg",
    imageAlt: "diamond engagement ring",
  },
  {
    id: 2,
    discount: 25,
    title: "Luxury Pearl & Gold Necklaces",
    description:
      "Adorn yourself with our exquisite collection of pearl necklaces, crafted with premium gold and finest pearls from around the world.",
    buttonText: "Shop Now",
    buttonLink: "#",
    image:
      "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw32e1f8d0/homepage/HeroBanner/floral-bloom-desktop.jpg",
    imageAlt: "pearl necklace",
  },
  {
    id: 3,
    discount: 35,
    title: "Stunning Gemstone Collection",
    description:
      "Explore our vibrant collection of emerald, sapphire, and ruby jackets. Each gemstone is ethically sourced and beautifully set.",
    buttonText: "Shop Now",
    buttonLink: "#",
    image:
      "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwe29c0ff4/homepage/HeroBanner/sachin-exchange-desktop-pdt.jpg",
    imageAlt: "gemstone earrings",
  },
];

const FullScreenHeroSlider = () => {
  return (
    <div className="relative w-full lg:h-150 md:h-100 h-45 overflow-hidden">
      <style jsx global>{`
        .hero-slider .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .hero-slider .swiper-pagination-bullet-active {
          width: 40px;
          border-radius: 6px;
          background: white;
        }

        .hero-slider .swiper-pagination {
          bottom: 40px;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .swiper-slide-active .slide-content > * {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .swiper-slide-active .slide-content > *:nth-child(1) {
          animation-delay: 0.2s;
        }

        .swiper-slide-active .slide-content > *:nth-child(2) {
          animation-delay: 0.4s;
        }

        .swiper-slide-active .slide-content > *:nth-child(3) {
          animation-delay: 0.6s;
        }

        .swiper-slide-active .slide-content > *:nth-child(4) {
          animation-delay: 0.8s;
        }

        .slide-content > * {
          opacity: 0;
        }

        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }

        .hero-image {
          animation: kenburns 20s ease-out infinite alternate;
        }
      `}</style>

      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1500}
        fadeEffect={{
          crossFade: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="hero-slider w-full h-full"
      >
        {carouselSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image with Ken Burns effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="hero-image w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute bg-gradient-to-t from-black to-transparent w-full h-50 bottom-0"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullScreenHeroSlider;
