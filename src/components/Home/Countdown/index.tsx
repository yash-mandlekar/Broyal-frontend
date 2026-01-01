"use client";
import React, { useState, useEffect } from "react";

const CounDown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "January, 31, 2026";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden py-20 gradient-white-to-gray">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-black shadow-bw-heavy">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch">
            {/* Content Section */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 xl:p-16 relative z-10">
              <span className="inline-block font-semibold text-sm px-4 py-1.5 rounded-full mb-4 bg-gray-soft text-black">
                Exclusive Offer
              </span>

              <h2 className="font-bold text-3xl lg:text-4xl xl:text-5xl mb-4 text-black">
                Timeless Elegance Awaits
              </h2>

              <p className="text-base text-gray-700 mb-2">
                Discover our exquisite collection of handcrafted Boots.
              </p>
              <p className="text-sm text-gray-600 mb-8">
                Limited time offer - don&apos;t miss out on these exclusive
                pieces.
              </p>

              {/* Countdown timer */}
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
                {/* timer day */}
                <div className="flex flex-col items-center">
                  <div className="min-w-[70px] sm:min-w-[80px] h-16 sm:h-20 font-bold text-2xl sm:text-3xl lg:text-4xl text-white rounded-xl flex items-center justify-center px-4 mb-2 shadow-bw-medium transition-transform hover:scale-105 bg-black">
                    {days < 10 ? "0" + days : days}
                  </div>
                  <span className="block text-xs sm:text-sm font-semibold text-center text-black">
                    Days
                  </span>
                </div>

                {/* timer hours */}
                <div className="flex flex-col items-center">
                  <div className="min-w-[70px] sm:min-w-[80px] h-16 sm:h-20 font-bold text-2xl sm:text-3xl lg:text-4xl text-white rounded-xl flex items-center justify-center px-4 mb-2 shadow-bw-medium transition-transform hover:scale-105 bg-black">
                    {hours < 10 ? "0" + hours : hours}
                  </div>
                  <span className="block text-xs sm:text-sm font-semibold text-center text-black">
                    Hours
                  </span>
                </div>

                {/* timer minutes */}
                <div className="flex flex-col items-center">
                  <div className="min-w-[70px] sm:min-w-[80px] h-16 sm:h-20 font-bold text-2xl sm:text-3xl lg:text-4xl text-white rounded-xl flex items-center justify-center px-4 mb-2 shadow-bw-medium transition-transform hover:scale-105 bg-black">
                    {minutes < 10 ? "0" + minutes : minutes}
                  </div>
                  <span className="block text-xs sm:text-sm font-semibold text-center text-black">
                    Minutes
                  </span>
                </div>

                {/* timer seconds */}
                <div className="flex flex-col items-center">
                  <div className="min-w-[70px] sm:min-w-[80px] h-16 sm:h-20 font-bold text-2xl sm:text-3xl lg:text-4xl text-white rounded-xl flex items-center justify-center px-4 mb-2 shadow-bw-medium transition-transform hover:scale-105 bg-black-light">
                    {seconds < 10 ? "0" + seconds : seconds}
                  </div>
                  <span className="block text-xs sm:text-sm font-semibold text-center text-black">
                    Seconds
                  </span>
                </div>
              </div>

              <button className="inline-flex font-semibold text-sm sm:text-base text-white py-3 px-8 sm:px-10 rounded-lg transition-all duration-200 shadow-bw-medium hover:scale-105 bg-black hover:bg-black-light">
                Shop Collection →
              </button>
            </div>

            {/* Image Section */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <img
                src="/images/countdown/countdown-02.png"
                alt="jacket model"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                style={{ minHeight: "500px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounDown;
