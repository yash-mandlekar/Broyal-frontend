import React from "react";
import { useAppSelector } from "@/redux/store";
import { selectCartItems } from "@/redux/features/cart/cart-slice";
import Image from "next/image";

interface OrderListProps {
  subtotal: number;
  taxTotal: number;
  shippingCost: number;
  discount: number;
  grandTotal: number;
}

const OrderList: React.FC<OrderListProps> = ({
  subtotal,
  taxTotal,
  shippingCost,
  discount,
  grandTotal,
}) => {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <div className="bg-white shadow-1 rounded-[10px]">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Your Order</h3>
      </div>

      <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
        {/* Title */}
        <div className="flex items-center justify-between py-5 border-b border-gray-3">
          <div>
            <h4 className="font-medium text-dark">Product</h4>
          </div>
          <div>
            <h4 className="font-medium text-dark text-right">Subtotal</h4>
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="py-5 border-b border-gray-3">
            <p className="text-dark-5 text-center">Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => {
            const price = item.variant?.price || item.product?.price || 0;
            const itemTotal = price * item.quantity;
            const title = item.product?.title || "Unknown Product";
            const variantInfo = item.variant?.attributes
              ? Object.entries(item.variant.attributes)
                  .map(([key, value]) => `${value}`)
                  .join(", ")
              : "";

            return (
              <div
                key={`${item.productId}-${item.variantId || "default"}`}
                className="flex items-center justify-between py-5 border-b border-gray-3"
              >
                <div className="flex items-center gap-3 flex-1">
                  {(item.variant?.image || item.product?.images?.[0]?.url) && (
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={
                          item.variant?.image ||
                          item.product?.images?.[0]?.url ||
                          ""
                        }
                        alt={title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-dark font-medium">
                      {title} {variantInfo && `(${variantInfo})`}
                    </p>
                    <p className="text-sm text-dark-5">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div>
                  <p className="text-dark text-right">
                    ₹{itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })
        )}

        {/* Subtotal */}
        <div className="flex items-center justify-between py-5 border-b border-gray-3">
          <div>
            <p className="text-dark">Subtotal</p>
          </div>
          <div>
            <p className="text-dark text-right">₹{subtotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between py-5 border-b border-gray-3">
          <div>
            <p className="text-dark">Tax (GST 18%)</p>
          </div>
          <div>
            <p className="text-dark text-right">₹{taxTotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between py-5 border-b border-gray-3">
          <div>
            <p className="text-dark">Shipping Fee</p>
          </div>
          <div>
            <p className="text-dark text-right">₹{shippingCost.toFixed(2)}</p>
          </div>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <p className="text-dark">Discount</p>
            </div>
            <div>
              <p className="text-green text-right">-₹{discount.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between pt-5">
          <div>
            <p className="font-medium text-lg text-dark">Total</p>
          </div>
          <div>
            <p className="font-medium text-lg text-dark text-right">
              ₹{grandTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
