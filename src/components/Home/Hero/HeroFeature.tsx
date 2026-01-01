import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Free Shipping",
    description: "For all orders ₹200",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="w-full justify-between flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
        {featureData.map((item, key) => (
          <div
            className="flex items-center gap-4 hover-scale group cursor-pointer"
            key={key}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black group-hover:bg-black-light transition-all">
              <Image
                src={item.img}
                alt="icons"
                width={28}
                height={28}
                className="filter invert"
              />
            </div>

            <div>
              <h3 className="font-semibold text-lg text-black">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
