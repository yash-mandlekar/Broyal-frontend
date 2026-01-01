import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { asyncRemoveFromCart } from "@/redux/features/cart/cart-thunk";

const SingleItem = ({ item, removeItemFromCart }) => {
  const dispatch = useDispatch<AppDispatch>();
  const product = item?.product; // Extract product from cart item
  const [isRemoving, setIsRemoving] = useState(false);

  // Safety check - if no product data, don't render
  if (!product) {
    console.error("Cart item missing product data:", item);
    return null;
  }

  // Get primary image or first image from array
  const getPrimaryImage = () => {
    if (!product.images || product.images.length === 0) {
      return "/images/placeholder.png";
    }
    const primaryImage = product.images.find((img) => img.isPrimary);
    return primaryImage ? primaryImage.url : product.images[0].url;
  };

  const handleRemoveFromCart = async () => {
    if (isRemoving) return;

    setIsRemoving(true);

    try {
      // Remove from backend cart - the fulfilled case will update the cart state automatically
      await dispatch(
        asyncRemoveFromCart({
          product: item.productId,
          variant: item.variant,
        })
      ).unwrap();

      // No need to manually dispatch removeItemFromCart here
      // The asyncRemoveFromCart.fulfilled case in cart-slice.ts already updates state.items
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-5 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="w-full flex items-center gap-6">
        <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 max-w-[90px] w-full h-22.5 p-2">
          <Image
            src={getPrimaryImage()}
            alt={product.title || "Product"}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <div>
          <h3 className="font-semibold text-base text-gray-900 mb-1 ease-out duration-200 hover:text-black">
            <Link href={`/shop/${product._id || product.slug || "#"}`}>
              {product.title || "Product"}
            </Link>
          </h3>
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-black">
              ₹{product.discountPrice}
            </p>
            {product.price !== product.discountPrice && (
              <p className="text-sm text-gray-400 line-through">
                ₹{product.price}
              </p>
            )}
          </div>
          {item.quantity && (
            <p className="text-xs text-gray-500 mt-1">
              Quantity: {item.quantity}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleRemoveFromCart}
        disabled={isRemoving}
        aria-label="Remove product from cart"
        className={`flex items-center justify-center rounded-lg min-w-[38px] w-[38px] h-9.5 bg-white border border-gray-200 text-gray-700 ease-out duration-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
          isRemoving ? "animate-pulse" : ""
        }`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SingleItem;
