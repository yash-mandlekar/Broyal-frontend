"use client";
import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Eye, Heart, ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { asyncAddToCart } from "@/redux/features/cart/cart-thunk";
import { addItemToCart } from "@/redux/features/cart/cart-slice";

interface ProductCardProps {
  item: Product;
  variant?: "grid" | "list";
}

const ProductCard = ({ item, variant = "grid" }: ProductCardProps) => {
  const { openModal } = useModalContext();
  const { items, loading: cartLoading } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  // Local state for this specific product
  const [isAdding, setIsAdding] = useState(false);
  const [optimisticInCart, setOptimisticInCart] = useState(false);

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

  // Memoized check if product is in cart - this will update when items change
  const isProductInCart = useMemo(() => {
    return (
      items.some((cartItem) => cartItem.productId === item._id) ||
      optimisticInCart
    );
  }, [items, item._id, optimisticInCart]);

  // Update the QuickView state
  const handleQuickViewUpdate = useCallback(() => {
    dispatch(updateQuickView({ ...item }));
  }, [dispatch, item]);

  // Add to cart with optimistic UI update
  const handleAddToCart = useCallback(async () => {
    if (isOutOfStock || isProductInCart || isAdding) {
      return;
    }

    setIsAdding(true);
    setOptimisticInCart(true); // Optimistic update for immediate UI feedback

    // Optimistically add to local cart for instant UI update
    dispatch(
      addItemToCart({
        productId: item._id,
        quantity: 1,
        product: item,
      })
    );

    try {
      // Sync with backend
      await dispatch(
        asyncAddToCart({
          quantity: 1,
          product: item._id,
        })
      ).unwrap();

      // Success - backend has synced, optimistic state can stay
    } catch (error: any) {
      console.error("Failed to add to cart - Full error:", error);
      console.error("Error type:", typeof error);
      console.error("Error message:", error?.message || error);
      // Revert optimistic update on error
      setOptimisticInCart(false);
      // The backend sync failed, but we keep the local state
      // The user can try again or the cart will sync on next page load
    } finally {
      setIsAdding(false);
    }
  }, [isOutOfStock, isProductInCart, isAdding, dispatch, item]);

  // Add to wishlist
  const handleItemToWishList = useCallback(() => {
    // dispatch(
    //   addItemToWishlist({
    //     ...item,
    //     status: "available",
    //     quantity: 1,
    //   })
    // );
  }, []);

  // Render Grid Variant
  if (variant === "grid") {
    return (
      <div className="group">
        {/* Product Image Container */}
        <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md min-h-[270px] mb-4 transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-300">
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
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-lg ease-out duration-200 text-gray-700 bg-white hover:text-black hover:bg-gray-100 border border-gray-200 transition-all hover:shadow-xl hover:scale-105"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isProductInCart || isAdding}
              className={`inline-flex items-center gap-1.5 font-semibold text-sm py-2 px-5 rounded-[5px] ease-out duration-200 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:cursor-not-allowed ${
                isProductInCart
                  ? "bg-green-600 text-white disabled:opacity-100"
                  : isAdding
                  ? "bg-gray-600 text-white disabled:opacity-100"
                  : isOutOfStock
                  ? "bg-gray-400 text-white disabled:opacity-50"
                  : "bg-black text-white hover:bg-gray-800"
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
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-lg ease-out duration-200 text-gray-700 bg-white hover:text-black hover:bg-gray-100 border border-gray-200 transition-all hover:shadow-xl hover:scale-105"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-semibold text-base text-gray-900 mb-1.5 transition-colors duration-200 hover:text-black">
          <Link href={`/shop/${item._id}`}>{item.title}</Link>
        </h3>

        {/* Price Section */}
        {!isOutOfStock && (
          <div className="flex items-center gap-2 font-medium text-lg">
            <span className="text-black">₹{item.discountPrice}</span>
            <span className="text-gray-400 line-through text-sm">
              ₹{item.price}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Render List Variant
  return (
    <div className="group rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        <div className="relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={getProductImage()}
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
              aria-label="Quick view product"
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-lg ease-out duration-200 text-gray-700 bg-white hover:text-black hover:bg-gray-100 border border-gray-200 transition-all hover:shadow-xl hover:scale-105"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isProductInCart || isAdding}
              className={`inline-flex items-center gap-1.5 font-semibold text-sm py-2 px-5 rounded-[5px] ease-out duration-200 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:cursor-not-allowed ${
                isProductInCart
                  ? "bg-green-600 text-white disabled:opacity-100"
                  : isAdding
                  ? "bg-gray-600 text-white disabled:opacity-100"
                  : isOutOfStock
                  ? "bg-gray-400 text-white disabled:opacity-50"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isProductInCart ? (
                <>
                  <Check className="w-4 h-4" />
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

            <button
              onClick={handleItemToWishList}
              aria-label="Add to wishlist"
              className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-lg ease-out duration-200 text-gray-700 bg-white hover:text-black hover:bg-gray-100 border border-gray-200 transition-all hover:shadow-xl hover:scale-105"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-semibold text-base text-gray-900 ease-out duration-200 hover:text-black mb-1.5">
              <Link href={`/shop/${item._id}`}> {item.title} </Link>
            </h3>

            {!isOutOfStock && (
              <span className="flex items-center gap-2 font-medium text-lg">
                <span className="text-black">₹{item.discountPrice}</span>
                <span className="text-gray-400 line-through text-sm">
                  ₹{item.price}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
