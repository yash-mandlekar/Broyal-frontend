"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Eye, Heart, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { addItemToCart } from "@/redux/features/cart/cart-slice";
import { toast } from "sonner";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [isAdding, setIsAdding] = useState(false);

  // Get the primary image or first image
  const getProductImage = () => {
    if (!item.images || item.images.length === 0) {
      return "/images/placeholder.png";
    }

    const primaryImage = item.images.find((img) => img.isPrimary);
    return primaryImage ? primaryImage.url : item.images[0].url;
  };

  // Check if product is out of stock
  const isOutOfStock = item.stock === 0;

  // Check if product is already in cart
  const isProductInCart = items.some(
    (cartItem) => cartItem.productId === item._id
  );

  // Update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // Add to cart
  const handleAddToCart = () => {
    if (isOutOfStock || isProductInCart || isAdding) {
      return;
    }

    setIsAdding(true);

    // Add to local cart state
    dispatch(
      addItemToCart({
        productId: item._id,
        quantity: 1,
        product: item,
      })
    );

    toast.success("Product added to cart!");
    setIsAdding(false);
  };

  // Add to wishlist
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
    <div className="group">
      {/* Product Image Container */}
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-50/50 to-rose-50/50 border border-amber-100 shadow-md min-h-[270px] mb-4 transition-all duration-300 group-hover:shadow-xl group-hover:border-amber-200">
        <Image
          src={getProductImage()}
          alt={item.title}
          width={250}
          height={250}
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <span className="text-white font-semibold text-lg px-4 py-2 rounded-lg bg-gray-800/80">
              Out of Stock
            </span>
          </div>
        )}

        {/* Action Buttons - Hover Animation */}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0 z-10">
          {/* Quick View Button */}
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            aria-label="Quick view product"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-lg ease-out duration-200 text-gray-700 bg-white hover:text-amber-600 hover:bg-amber-50 border border-amber-100 transition-all hover:shadow-xl"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isProductInCart || isAdding}
            className={`inline-flex items-center gap-1.5 font-semibold text-sm py-2 px-5 rounded-[5px] text-white ease-out duration-200 transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed ${
              isProductInCart
                ? "bg-green-600 disabled:opacity-100"
                : isAdding
                ? "bg-amber-600 disabled:opacity-100"
                : isOutOfStock
                ? "bg-gray-400 disabled:opacity-50"
                : "bg-[#832729] hover:bg-amber-700"
            }`}
          >
            {isProductInCart ? (
              <>
                <Check className="w-4 h-4 " />
                Added to Cart
              </>
            ) : isAdding ? (
              <>
                <ShoppingCart className="w-4 h-4 animate-pulse" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </>
            )}
          </button>

          {/* Add to Wishlist Button */}
          <button
            onClick={handleItemToWishList}
            aria-label="Add to wishlist"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-lg ease-out duration-200 text-gray-700 bg-white hover:text-amber-600 hover:bg-amber-50 border border-amber-100 transition-all hover:shadow-xl"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Title */}
      <h3 className="font-semibold text-base text-gray-900 mb-1.5 transition-colors duration-200 hover:text-amber-600">
        <Link href={`/shop/${item._id}`}>{item.title}</Link>
      </h3>

      {/* Price Section */}
      {!isOutOfStock && (
        <div className="flex items-center gap-2 font-medium text-lg">
          <span className="text-amber-600">₹{item.discountPrice}</span>
          <span className="text-gray-400 line-through text-sm">
            ₹{item.price}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
