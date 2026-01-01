"use client";
import React, { useEffect, useState } from "react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart/cart-slice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { X, ZoomIn, Minus, Plus, Heart, Check } from "lucide-react";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  // Get the product data
  const product = useAppSelector((state) => state.quickViewReducer.value);
  const [activePreview, setActivePreview] = useState(0);

  // Get product images - handle new API structure
  const productImages = product?.images || [];

  // Get primary image or first image
  const getProductImage = (index: number = 0) => {
    if (!productImages || productImages.length === 0) {
      return "/images/placeholder.png";
    }
    return productImages[index]?.url || productImages[0]?.url;
  };

  // Check if product is out of stock
  const isOutOfStock = product?.stock === 0;

  // Preview modal
  const handlePreviewSlider = () => {
    dispatch(updateQuickView(product));
    openPreviewModal();
  };

  // Add to cart
  const handleAddToCart = () => {
    if (isOutOfStock) return;

    // dispatch(
    //   addItemToCart({
    //     ...product,
    //     quantity,
    //   })
    // );

    closeModal();
  };

  useEffect(() => {
    // Closing modal while clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as Element).closest(".modal-content")) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setQuantity(1);
      setActivePreview(0);
    };
  }, [isModalOpen, closeModal]);

  // Don't render if no product data
  if (!product) {
    return null;
  }

  return (
    <div
      className={`${
        isModalOpen ? "z-9999" : "hidden"
      } fixed top-0 left-0 overflow-y-auto no-scrollbar w-full h-screen sm:py-20 xl:py-25 2xl:py-[230px] px-4 sm:px-8 py-5`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[1100px] rounded-xl shadow-lg bg-white p-7.5 relative modal-content">
          {/* Close Button */}
          <button
            onClick={() => closeModal()}
            aria-label="Close modal"
            className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 hover:opacity-80 text-black hover:bg-gray-100"
          >
            <X size={26} />
          </button>

          <div className="flex flex-wrap items-center gap-12.5">
            {/* Left Section - Images */}
            <div className="max-w-[526px] w-full">
              <div className="flex gap-5">
                {/* Thumbnails - Only show if multiple images */}
                {productImages.length > 1 && (
                  <div className="flex flex-col gap-5">
                    {productImages.map((img, key) => (
                      <button
                        onClick={() => setActivePreview(key)}
                        key={img._id || key}
                        className="flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg ease-out duration-200 transition-all bg-gray-100 hover:bg-gray-200"
                        style={{
                          border:
                            activePreview === key
                              ? "2px solid #000000"
                              : "2px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (activePreview !== key) {
                            e.currentTarget.style.border = "2px solid #000000";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activePreview !== key) {
                            e.currentTarget.style.border =
                              "2px solid transparent";
                          }
                        }}
                      >
                        <Image
                          src={img.url}
                          alt={`thumbnail ${key + 1}`}
                          width={61}
                          height={61}
                          className="aspect-square object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="relative z-1 overflow-hidden flex items-center justify-center w-full sm:min-h-[508px] rounded-lg border-2 bg-gray-100 border-gray-200">
                  <div>
                    <button
                      onClick={handlePreviewSlider}
                      aria-label="Zoom image"
                      className="absolute top-4 lg:top-8 right-4 lg:right-8 z-50 w-10 h-10 rounded-[5px] bg-white shadow-lg flex items-center justify-center ease-out duration-200 hover:shadow-xl text-black hover:bg-gray-100"
                    >
                      <ZoomIn size={22} />
                    </button>

                    {productImages.length > 0 && (
                      <Image
                        src={getProductImage(activePreview)}
                        alt={product.title || "product"}
                        width={400}
                        height={400}
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Product Details */}
            <div className="max-w-[445px] w-full">
              {/* Badge */}
              {!isOutOfStock && (
                <span
                  className="inline-block text-xs font-semibold text-white py-1 px-3 rounded mb-6.5"
                  style={{ backgroundColor: "#22AD5C" }}
                >
                  SALE 20% OFF
                </span>
              )}

              {isOutOfStock && (
                <span
                  className="inline-block text-xs font-semibold text-white py-1 px-3 rounded mb-6.5"
                  style={{ backgroundColor: "#d32f2f" }}
                >
                  OUT OF STOCK
                </span>
              )}

              {/* Product Title */}
              <h3 className="font-semibold text-xl xl:text-2xl mb-4 text-black">
                {product.title}
              </h3>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {isOutOfStock ? (
                  <>
                    <div style={{ color: "#d32f2f" }}>
                      <X size={20} />
                    </div>
                    <span className="font-medium" style={{ color: "#d32f2f" }}>
                      Out of Stock
                    </span>
                  </>
                ) : (
                  <>
                    <div style={{ color: "#22AD5C" }}>
                      <Check size={20} />
                    </div>
                    <span className="font-medium text-black">
                      In Stock ({product.stock})
                    </span>
                  </>
                )}
              </div>

              {/* Product Description */}
              <p
                className="mb-6 text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: product.excerpt || product.description || "",
                }}
              />

              {/* Price and Quantity Section */}
              <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                {!isOutOfStock && (
                  <div>
                    <h4 className="font-semibold text-lg mb-3.5 text-black">
                      Price
                    </h4>
                    <span className="flex items-center gap-2">
                      <span className="font-semibold text-xl xl:text-2xl text-black">
                        ₹{product.discountPrice}
                      </span>
                      <span className="font-medium text-lg xl:text-xl line-through text-gray-400">
                        ₹{product.price}
                      </span>
                    </span>
                  </div>
                )}

                {!isOutOfStock && (
                  <div>
                    <h4 className="font-semibold text-lg mb-3.5 text-black">
                      Quantity
                    </h4>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                        className="flex items-center justify-center w-10 h-10 rounded-[5px] ease-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 bg-gray-100 text-black"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="flex items-center justify-center w-20 h-10 rounded-[5px] font-medium border-2 border-gray-200 bg-white text-black">
                        {quantity}
                      </span>

                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="Increase quantity"
                        className="flex items-center justify-center w-10 h-10 rounded-[5px] ease-out duration-200 hover:bg-gray-200 bg-gray-100 text-black"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  disabled={isOutOfStock || quantity === 0}
                  onClick={handleAddToCart}
                  className="inline-flex font-semibold text-white py-3 px-7 rounded-md ease-out duration-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg bg-black hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>

                <button className="inline-flex items-center gap-2 font-semibold text-white py-3 px-6 rounded-md ease-out duration-200 transition-all hover:opacity-90 bg-gray-800 hover:bg-gray-700">
                  <Heart size={20} />
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
