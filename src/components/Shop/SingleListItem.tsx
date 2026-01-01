"use client";
import React from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";

const SingleListItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // Get primary image or first image from array
  const getPrimaryImage = () => {
    if (!item.images || item.images.length === 0) {
      return "/images/placeholder.png"; // fallback placeholder
    }
    const primaryImage = item.images.find((img) => img.isPrimary);
    return primaryImage ? primaryImage.url : item.images[0].url;
  };

  // Check if product is out of stock
  const isOutOfStock = item.stock === 0;

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // add to cart
  const handleAddToCart = () => {
    if (isOutOfStock) return;
    // dispatch(
    //   addItemToCart({
    //     ...item,
    //     quantity: 1,
    //   })
    // );
  };

  const handleItemToWishList = () => {
    // dispatch(
    //   addItemToWishlist({
    //     ...item,
    //     status: "available",
    //     quantity: 1,
    //   })
    // );
  };

  return (
    <div className="group rounded-lg bg-gradient-to-br from-amber-50/30 to-rose-50/30 border border-amber-100 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        <div className="relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4 bg-gradient-to-br from-amber-50/50 to-rose-50/50">
          <Image 
            src={getPrimaryImage()} 
            alt={item.title} 
            width={250} 
            height={250}
            className="transition-transform duration-300 group-hover:scale-105"
          />

          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <span className="text-white font-semibold text-lg px-4 py-2 rounded-lg bg-gray-800/80">
                Out of Stock
              </span>
            </div>
          )}

          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <button
              onClick={() => {
                openModal();
                handleQuickViewUpdate();
              }}
              aria-label="button for quick view"
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-lg ease-out duration-200 text-gray-700 bg-white hover:text-amber-600 hover:bg-amber-50 border border-amber-100 transition-all hover:shadow-xl"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleAddToCart()}
              disabled={isOutOfStock}
              className="inline-flex items-center gap-1.5 font-semibold text-sm py-2 px-5 rounded-[5px] text-white ease-out duration-200 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed bg-[#832729] disabled:bg-gray-400"
            >
              <ShoppingCart className="w-4 h-4" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              onClick={() => handleItemToWishList()}
              aria-label="button for favorite select"
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-lg ease-out duration-200 text-gray-700 bg-white hover:text-amber-600 hover:bg-amber-50 border border-amber-100 transition-all hover:shadow-xl"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-semibold text-base text-gray-900 ease-out duration-200 hover:text-amber-600 mb-1.5">
              <Link href={`/shop/${item.slug}`}> {item.title} </Link>
            </h3>

            {!isOutOfStock && (
              <span className="flex items-center gap-2 font-medium text-lg">
                <span className="text-amber-600">₹{item.discountPrice}</span>
                <span className="text-gray-400 line-through text-sm">₹{item.price}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListItem;