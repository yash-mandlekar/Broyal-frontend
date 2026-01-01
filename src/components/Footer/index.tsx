import React from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Sparkles,
  Apple,
  Smartphone,
} from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden gradient-white-to-gray">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* Footer menu start */}
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between pt-17.5 xl:pt-22.5 pb-10 xl:pb-15">
          <div className="max-w-[330px] w-full">
            <h2 className="mb-7.5 text-lg font-semibold text-black">
              Help & Support
            </h2>

            <ul className="flex flex-col gap-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0">
                  <MapPin className="w-5 h-5 text-black" />
                </span>
                <span className="text-sm text-gray-700">
                  685 Market Street, Las Vegas, LA 95820, United States.
                </span>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 text-sm transition-all duration-200 hover:opacity-70 text-gray-700"
                >
                  <Phone className="w-5 h-5 text-black" />
                  (+099) 532-786-9843
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 text-sm transition-all duration-200 hover:opacity-70 text-gray-700"
                >
                  <Mail className="w-5 h-5 text-black" />
                  support@broyal.com
                </a>
              </li>
            </ul>

            {/* Social Links start */}
            <div className="flex items-center gap-4 mt-7.5">
              <a
                href="#"
                aria-label="Facebook Social Link"
                className="flex transition-all duration-200 hover:scale-110 text-black"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Twitter Social Link"
                className="flex transition-all duration-200 hover:scale-110 text-black"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Instagram Social Link"
                className="flex transition-all duration-200 hover:scale-110 text-black"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                aria-label="Linkedin Social Link"
                className="flex transition-all duration-200 hover:scale-110 text-black"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            {/* Social Links end */}
          </div>

          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-lg font-semibold text-black">Account</h2>

            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  Login / Register
                </a>
              </li>
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-lg font-semibold text-black">
              Quick Link
            </h2>

            <ul className="flex flex-col gap-3">
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  FAQ&apos;s
                </a>
              </li>
              <li>
                <a
                  className="text-sm font-medium transition-all duration-200 hover:opacity-70"
                  href="#"
                  style={{ color: "#000000" }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-lg font-semibold lg:text-right text-black">
              Download App
            </h2>

            <div className="flex items-center gap-2 justify-start lg:justify-end mb-4">
              <Sparkles className="w-4 h-4 text-black" />
              <p className="text-sm font-medium text-gray-600">
                Save ₹3 With App & New User only
              </p>
            </div>

            <ul className="flex flex-col lg:items-end gap-3">
              <li>
                <a
                  className="inline-flex items-center gap-3 py-2.5 pl-4 pr-7 text-white rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-bw-medium bg-black hover:bg-black-light"
                  href="#"
                >
                  <Apple className="w-8 h-8" />
                  <div>
                    <span className="block text-xs opacity-90">
                      Download on the
                    </span>
                    <p className="font-semibold">App Store</p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  className="inline-flex items-center gap-3 py-2.5 pl-4 pr-7 text-white rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-bw-medium bg-black-light hover:bg-black"
                  href="#"
                >
                  <Smartphone className="w-8 h-8" />
                  <div>
                    <span className="block text-xs opacity-90">Get in On</span>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer menu end */}
      </div>

      {/* Footer bottom start */}
      <div className="py-5 xl:py-7.5 bg-white border-t-2 border-gray-3">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-5 flex-wrap items-center justify-between">
            <p className="text-sm font-medium text-black">
              &copy; {year}. All rights reserved by Broyal.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <p className="text-sm font-semibold text-black">We Accept:</p>

              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="#"
                  aria-label="payment system with visa card"
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Image
                    src="/images/payment/payment-01.svg"
                    alt="visa card"
                    width={66}
                    height={22}
                  />
                </a>
                <a
                  href="#"
                  aria-label="payment system with paypal"
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Image
                    src="/images/payment/payment-02.svg"
                    alt="paypal"
                    width={18}
                    height={21}
                  />
                </a>
                <a
                  href="#"
                  aria-label="payment system with master card"
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Image
                    src="/images/payment/payment-03.svg"
                    alt="master card"
                    width={33}
                    height={24}
                  />
                </a>
                <a
                  href="#"
                  aria-label="payment system with apple pay"
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Image
                    src="/images/payment/payment-04.svg"
                    alt="apple pay"
                    width={52.94}
                    height={22}
                  />
                </a>
                <a
                  href="#"
                  aria-label="payment system with google pay"
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Image
                    src="/images/payment/payment-05.svg"
                    alt="google pay"
                    width={56}
                    height={22}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer bottom end */}
    </footer>
  );
};

export default Footer;
