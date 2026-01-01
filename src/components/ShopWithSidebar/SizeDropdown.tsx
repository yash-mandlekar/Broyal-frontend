"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SizeDropdown = () => {
  const [toggleDropdown, setToggleDropdown] = useState(true);
  const [selectedSize, setSelectedSize] = useState("sizeM");

  const sizes = [
    { id: "sizeM", label: "M" },
    { id: "sizeL", label: "L" },
    { id: "sizeXL", label: "XL" },
    { id: "sizeXXL", label: "XXL" },
  ];

  return (
    <div
      className="bg-white rounded-2xl border-2"
      style={{
        borderColor: "#e5d9d0",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className={`cursor-pointer flex items-center justify-between py-4 pl-6 pr-5 transition-all duration-200 rounded-t-2xl ${
          toggleDropdown ? "shadow-sm" : ""
        }`}
      >
        <p className="font-semibold text-base" style={{ color: "#4F1719" }}>
          Size
        </p>
        <button
          onClick={() => setToggleDropdown(!toggleDropdown)}
          aria-label="button for size dropdown"
          className={`ease-out duration-300 transition-transform ${
            toggleDropdown ? "rotate-180" : ""
          }`}
          style={{ color: "#832729" }}
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Dropdown menu */}
      <div
        className={`flex-wrap gap-2.5 p-6 ${
          toggleDropdown ? "flex" : "hidden"
        }`}
      >
        {sizes.map((size) => (
          <label
            key={size.id}
            htmlFor={size.id}
            className={`cursor-pointer select-none flex items-center rounded-lg transition-all duration-300 ease-out border-2  ${
              selectedSize === size.id
                ? "text-white shadow-lg"
                : "text-gray-700 "
            }`}
            style={{
              backgroundColor: selectedSize === size.id ? "#832729" : "white",
              borderColor: selectedSize === size.id ? "#832729" : "#e5d9d0",
              boxShadow:
                selectedSize === size.id
                  ? "0 4px 12px rgba(131, 39, 41, 0.3)"
                  : "none",
            }}
          >
            <div className="relative">
              <input
                type="radio"
                name="size"
                id={size.id}
                className="sr-only"
                checked={selectedSize === size.id}
                onChange={() => setSelectedSize(size.id)}
              />
              <div className="text-sm font-semibold py-2 px-4 rounded-lg">
                {size.label}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SizeDropdown;
