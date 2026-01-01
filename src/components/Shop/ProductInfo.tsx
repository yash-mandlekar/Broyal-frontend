// components/Shop/ProductInfo.tsx
"use client";

import React, { useState } from "react";

interface ProductInfoProps {
  title: string;
  price: number;
  discountPrice?: number;
  stock: number;
  brand: string;
  category: {
    name: string;
    slug: string;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price,
  discountPrice,
  stock,
  brand,
  category,
}) => {
  const [quantity, setQuantity] = useState(1);

  // Calculate discount percentage
  const discountPercentage = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  // Determine stock status
  const isInStock = stock > 0;
  const stockStatus = isInStock ? "In Stock" : "Out of Stock";
  const stockColor = isInStock ? "text-green" : "text-red";

  // Display price (discounted or original)
  const displayPrice = discountPrice || price;

  return (
    <div className="max-w-[539px] w-full">
      {/* Title and Discount Badge */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
          {title}
        </h2>

        {discountPercentage > 0 && (
          <div className="inline-flex font-medium text-custom-sm text-white bg-blue rounded py-0.5 px-2.5">
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Category and Brand */}
      <div className="flex flex-wrap items-center gap-5.5 mb-4.5">
        <div className="flex items-center gap-2.5">
          <span className="text-sm text-gray-4">Category:</span>
          <span className="text-sm font-medium text-dark">{category.name}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-sm text-gray-4">Brand:</span>
          <span className="text-sm font-medium text-dark">{brand}</span>
        </div>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-1.5 mb-4.5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_375_9221)">
            <path
              d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
              fill={isInStock ? "#22AD5C" : "#DC2626"}
            />
            <path
              d="M12.6875 7.09374L8.9688 10.7187L7.2813 9.06249C7.00005 8.78124 6.56255 8.81249 6.2813 9.06249C6.00005 9.34374 6.0313 9.78124 6.2813 10.0625L8.2813 12C8.4688 12.1875 8.7188 12.2812 8.9688 12.2812C9.2188 12.2812 9.4688 12.1875 9.6563 12L13.6875 8.12499C13.9688 7.84374 13.9688 7.40624 13.6875 7.12499C13.4063 6.84374 12.9688 6.84374 12.6875 7.09374Z"
              fill={isInStock ? "#22AD5C" : "#DC2626"}
            />
          </g>
          <defs>
            <clipPath id="clip0_375_9221">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <span className={`font-medium ${stockColor}`}>{stockStatus}</span>
      </div>

      {/* Price Section */}
      <h3 className="font-medium text-custom-1 mb-4.5">
        <span className="text-sm sm:text-base text-dark">
          Price: ₹{displayPrice.toLocaleString()}
        </span>
        {discountPrice && (
          <span className="line-through ml-3">
            ₹{price.toLocaleString()}
          </span>
        )}
      </h3>

      {/* Features */}
      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-2.5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
              fill="#3C50E0"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
              fill="#3C50E0"
            />
          </svg>
          Free delivery available
        </li>

        <li className="flex items-center gap-2.5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
              fill="#3C50E0"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
              fill="#3C50E0"
            />
          </svg>
          {discountPercentage > 0 && (
            <span>Sales {discountPercentage}% Off Use Code: PROMO{discountPercentage}</span>
          )}
          {discountPercentage === 0 && <span>Premium Quality Guaranteed</span>}
        </li>
      </ul>

      {/* Quantity and Action Buttons */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-4.5 border-b border-gray-3 mt-7.5 mb-9"></div>

        <div className="flex flex-wrap items-center gap-4.5">
          {/* Quantity Selector */}
          <div className="flex items-center rounded-md border border-gray-3">
            <button
              aria-label="button for remove product"
              className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              type="button"
            >
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33301 10.0001C3.33301 9.53984 3.7061 9.16675 4.16634 9.16675H15.833C16.2932 9.16675 16.6663 9.53984 16.6663 10.0001C16.6663 10.4603 16.2932 10.8334 15.833 10.8334H4.16634C3.7061 10.8334 3.33301 10.4603 3.33301 10.0001Z"
                  fill=""
                />
              </svg>
            </button>

            <span className="flex items-center justify-center w-16 h-12 border-x border-gray-4">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="button for add product"
              className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
              type="button"
            >
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33301 10C3.33301 9.5398 3.7061 9.16671 4.16634 9.16671H15.833C16.2932 9.16671 16.6663 9.5398 16.6663 10C16.6663 10.4603 16.2932 10.8334 15.833 10.8334H4.16634C3.7061 10.8334 3.33301 10.4603 3.33301 10Z"
                  fill=""
                />
                <path
                  d="M9.99967 16.6667C9.53944 16.6667 9.16634 16.2936 9.16634 15.8334L9.16634 4.16671C9.16634 3.70647 9.53944 3.33337 9.99967 3.33337C10.4599 3.33337 10.833 3.70647 10.833 4.16671L10.833 15.8334C10.833 16.2936 10.4599 16.6667 9.99967 16.6667Z"
                  fill=""
                />
              </svg>
            </button>
          </div>

          {/* Purchase Button */}
          <button
            type="submit"
            className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isInStock}
          >
            {isInStock ? "Purchase Now" : "Out of Stock"}
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-3 ease-out duration-200 hover:text-white hover:bg-dark hover:border-transparent"
            aria-label="Add to wishlist"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.62436 4.42423C3.96537 5.18256 2.75 6.98626 2.75 9.13713C2.75 11.3345 3.64922 13.0283 4.93829 14.4798C6.00072 15.6761 7.28684 16.6677 8.54113 17.6346C8.83904 17.8643 9.13515 18.0926 9.42605 18.3219C9.95208 18.7366 10.4213 19.1006 10.8736 19.3649C11.3261 19.6293 11.6904 19.75 12 19.75C12.3096 19.75 12.6739 19.6293 13.1264 19.3649C13.5787 19.1006 14.0479 18.7366 14.574 18.3219C14.8649 18.0926 15.161 17.8643 15.4589 17.6346C16.7132 16.6677 17.9993 15.6761 19.0617 14.4798C20.3508 13.0283 21.25 11.3345 21.25 9.13713C21.25 6.98626 20.0346 5.18256 18.3756 4.42423C16.7639 3.68751 14.5983 3.88261 12.5404 6.02077C12.399 6.16766 12.2039 6.25067 12 6.25067C11.7961 6.25067 11.601 6.16766 11.4596 6.02077C9.40166 3.88261 7.23607 3.68751 5.62436 4.42423ZM12 4.45885C9.68795 2.39027 7.09896 2.1009 5.00076 3.05999C2.78471 4.07296 1.25 6.42506 1.25 9.13713C1.25 11.8027 2.3605 13.8361 3.81672 15.4758C4.98287 16.789 6.41022 17.888 7.67083 18.8586C7.95659 19.0786 8.23378 19.2921 8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.66C10.6739 20.9855 11.3096 21.25 12 21.25C12.6904 21.25 13.3261 20.9855 13.8832 20.66C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999C15.7662 19.2921 16.0434 19.0786 16.3292 18.8586C17.5898 17.888 19.0171 16.789 20.1833 15.4758C21.6395 13.8361 22.75 11.8027 22.75 9.13713C22.75 6.42506 21.2153 4.07296 18.9992 3.05999C16.901 2.1009 14.3121 2.39027 12 4.45885Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductInfo;