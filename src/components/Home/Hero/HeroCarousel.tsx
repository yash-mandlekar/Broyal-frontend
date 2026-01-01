"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

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
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=351&h=358&fit=crop",
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
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=351&h=358&fit=crop",
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
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=351&h=358&fit=crop",
    imageAlt: "gemstone earrings",
  },
];

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {carouselSlides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
            <div className="max-w-[394px] py-10 px-5 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
              <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                  {slide.discount}%
                </span>
                <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                  Sale
                  <br />
                  Off
                </span>
              </div>

              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                <a href={slide.buttonLink}>{slide.title}</a>
              </h1>

              <p>{slide.description}</p>

              <a
                href={slide.buttonLink}
                className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
              >
                {slide.buttonText}
              </a>
            </div>

            <div>
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                width={351}
                height={358}
                className="rounded-md"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
