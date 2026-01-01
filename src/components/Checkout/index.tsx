"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import OrderList from "./OrderList";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectCartItems, clearCart } from "@/redux/features/cart/cart-slice";
import {
  asyncCheckoutOrder,
  asyncVerifyPayment,
} from "@/redux/features/order/order-thunk";
import { Address } from "@/types/order.types";
import { displayRazorpay } from "@/utils/razorpay";
import { toast } from "sonner";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const { currentOrder, isCheckoutLoading, isVerifyLoading } = useAppSelector(
    (state) => state.order
  );
  const { user } = useAppSelector((state) => state.auth);

  // Form states
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">(
    "ONLINE"
  );
  const [couponCode, setCouponCode] = useState("");
  const [orderNote, setOrderNote] = useState("");

  // Billing address state
  const [billingAddress, setBillingAddress] = useState<Address>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Shipping address state
  const [useShippingAddress, setUseShippingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Calculate order totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.variant?.price || item.product?.price || 0;
    return total + price * item.quantity;
  }, 0);

  const taxRate = 0.18; // 18% GST
  const taxTotal = subtotal * taxRate;
  const shippingCost = 0; // Free shipping for now
  const discount = 0; // Will be calculated by backend when coupon is applied
  const grandTotal = subtotal + taxTotal + shippingCost - discount;

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isCheckoutLoading) {
      toast.error("Your cart is empty");
      router.push("/cart");
    }
  }, [cartItems.length, isCheckoutLoading, router]);

  // Handle form submission
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !billingAddress.fullName ||
      !billingAddress.phone ||
      !billingAddress.addressLine1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.pincode
    ) {
      toast.error("Please fill in all required billing details");
      return;
    }

    const finalShippingAddress = useShippingAddress
      ? shippingAddress
      : billingAddress;

    if (
      useShippingAddress &&
      (!finalShippingAddress.fullName ||
        !finalShippingAddress.phone ||
        !finalShippingAddress.addressLine1 ||
        !finalShippingAddress.city ||
        !finalShippingAddress.state ||
        !finalShippingAddress.pincode)
    ) {
      toast.error("Please fill in all required shipping details");
      return;
    }

    try {
      const checkoutPayload = {
        paymentMethod,
        couponCode: couponCode.trim() || undefined,
        shipping: finalShippingAddress,
        billingAddress,
        orderNote: orderNote.trim() || undefined,
        taxRate,
        shippingCost,
      };

      const result = await dispatch(
        asyncCheckoutOrder(checkoutPayload)
      ).unwrap();

      if (paymentMethod === "COD") {
        // COD order is complete
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        router.push(`/orders/${result.order._id}`);
      } else {
        // Razorpay payment
        if (!result.razorpayOrderId || !result.key) {
          throw new Error("Failed to initialize payment");
        }

        const razorpayOptions = {
          key: result.key,
          amount: result.amount!,
          currency: result.currency!,
          name: "Broyal",
          description: "Order Payment",
          order_id: result.razorpayOrderId,
          handler: async (response: any) => {
            try {
              // Verify payment
              await dispatch(
                asyncVerifyPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                })
              ).unwrap();

              // Clear cart and redirect
              dispatch(clearCart());
              toast.success("Payment successful!");
              router.push(`/orders/${result.order._id}`);
            } catch (error: any) {
              toast.error(error || "Payment verification failed");
            }
          },
          prefill: {
            name: billingAddress.fullName,
            contact: billingAddress.phone,
          },
          theme: {
            color: "#3C50E0",
          },
          modal: {
            ondismiss: () => {
              toast.error("Payment cancelled");
            },
          },
        };

        await displayRazorpay(razorpayOptions);
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error || "Checkout failed");
    }
  };

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleCheckout}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* Checkout left */}
              <div className="lg:max-w-[670px] w-full">
                {/* Billing details */}
                <div className="mt-9">
                  <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
                    Billing details
                  </h2>

                  <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                    <div className="mb-5">
                      <label htmlFor="fullName" className="block mb-2.5">
                        Full Name <span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={billingAddress.fullName}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        required
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="phone" className="block mb-2.5">
                        Phone <span className="text-red">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={billingAddress.phone}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+91 1234567890"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        required
                      />
                    </div>

                    <div className="mb-5">
                      <label htmlFor="addressLine1" className="block mb-2.5">
                        Street Address <span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="addressLine1"
                        value={billingAddress.addressLine1}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            addressLine1: e.target.value,
                          })
                        }
                        placeholder="House number and street name"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        required
                      />
                      <div className="mt-5">
                        <input
                          type="text"
                          value={billingAddress.addressLine2 || ""}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              addressLine2: e.target.value,
                            })
                          }
                          placeholder="Apartment, suite, unit, etc. (optional)"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5 mb-5">
                      <div className="w-full">
                        <label htmlFor="city" className="block mb-2.5">
                          City <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={billingAddress.city}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              city: e.target.value,
                            })
                          }
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          required
                        />
                      </div>

                      <div className="w-full">
                        <label htmlFor="state" className="block mb-2.5">
                          State <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="state"
                          value={billingAddress.state}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              state: e.target.value,
                            })
                          }
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="pincode" className="block mb-2.5">
                        Pincode <span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        value={billingAddress.pincode}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            pincode: e.target.value,
                          })
                        }
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping address */}
                <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
                  <div
                    onClick={() => setUseShippingAddress(!useShippingAddress)}
                    className="cursor-pointer flex items-center gap-2.5 font-medium text-lg text-dark py-5 px-5.5"
                  >
                    <input
                      type="checkbox"
                      checked={useShippingAddress}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    Ship to a different address?
                  </div>

                  {useShippingAddress && (
                    <div className="p-4 sm:p-8.5 border-t border-gray-3">
                      <div className="mb-5">
                        <label
                          htmlFor="shippingFullName"
                          className="block mb-2.5"
                        >
                          Full Name <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="shippingFullName"
                          value={shippingAddress.fullName}
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              fullName: e.target.value,
                            })
                          }
                          placeholder="John Doe"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                      </div>

                      <div className="mb-5">
                        <label htmlFor="shippingPhone" className="block mb-2.5">
                          Phone <span className="text-red">*</span>
                        </label>
                        <input
                          type="tel"
                          id="shippingPhone"
                          value={shippingAddress.phone}
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+91 1234567890"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="shippingAddressLine1"
                          className="block mb-2.5"
                        >
                          Street Address <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="shippingAddressLine1"
                          value={shippingAddress.addressLine1}
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              addressLine1: e.target.value,
                            })
                          }
                          placeholder="House number and street name"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                        <div className="mt-5">
                          <input
                            type="text"
                            value={shippingAddress.addressLine2 || ""}
                            onChange={(e) =>
                              setShippingAddress({
                                ...shippingAddress,
                                addressLine2: e.target.value,
                              })
                            }
                            placeholder="Apartment, suite, unit, etc. (optional)"
                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-5 mb-5">
                        <div className="w-full">
                          <label
                            htmlFor="shippingCity"
                            className="block mb-2.5"
                          >
                            City <span className="text-red">*</span>
                          </label>
                          <input
                            type="text"
                            id="shippingCity"
                            value={shippingAddress.city}
                            onChange={(e) =>
                              setShippingAddress({
                                ...shippingAddress,
                                city: e.target.value,
                              })
                            }
                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          />
                        </div>

                        <div className="w-full">
                          <label
                            htmlFor="shippingState"
                            className="block mb-2.5"
                          >
                            State <span className="text-red">*</span>
                          </label>
                          <input
                            type="text"
                            id="shippingState"
                            value={shippingAddress.state}
                            onChange={(e) =>
                              setShippingAddress({
                                ...shippingAddress,
                                state: e.target.value,
                              })
                            }
                            className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                          />
                        </div>
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="shippingPincode"
                          className="block mb-2.5"
                        >
                          Pincode <span className="text-red">*</span>
                        </label>
                        <input
                          type="text"
                          id="shippingPincode"
                          value={shippingAddress.pincode}
                          onChange={(e) =>
                            setShippingAddress({
                              ...shippingAddress,
                              pincode: e.target.value,
                            })
                          }
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Order notes */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Other Notes (optional)
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Checkout right */}
              <div className="max-w-[455px] w-full">
                {/* Order list */}
                <OrderList
                  subtotal={subtotal}
                  taxTotal={taxTotal}
                  shippingCost={shippingCost}
                  discount={discount}
                  grandTotal={grandTotal}
                />

                {/* Coupon */}
                <Coupon
                  couponCode={couponCode}
                  onCouponChange={setCouponCode}
                />

                {/* Payment method */}
                <PaymentMethod
                  selectedMethod={paymentMethod}
                  onMethodChange={setPaymentMethod}
                />

                {/* Checkout button */}
                <button
                  type="submit"
                  disabled={
                    isCheckoutLoading ||
                    isVerifyLoading ||
                    cartItems.length === 0
                  }
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckoutLoading || isVerifyLoading
                    ? "Processing..."
                    : paymentMethod === "COD"
                    ? "Place Order (COD)"
                    : "Proceed to Payment"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
