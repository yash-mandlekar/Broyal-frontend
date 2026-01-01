"use client";
import React from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import EmptyCart from "../Common/CartSidebarModal/EmptyCart";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <>
      {/* <!-- ===== Breadcrumb Section Start ===== --> */}
      <section>
        <Breadcrumb title={"Cart"} pages={["Cart"]} />
      </section>
      {/* <!-- ===== Breadcrumb Section End ===== --> */}
      {cartItems.length > 0 ? (
        <section className="overflow-hidden py-20 bg-gray-50">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium text-black text-2xl">Your Cart</h2>
            </div>

            <div className="bg-white rounded-[10px] shadow-md border-2 border-gray-200">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-5.5 px-7.5">
                    <div className="min-w-[400px]">
                      <p className="text-black font-medium">Product</p>
                    </div>

                    <div className="min-w-[180px]">
                      <p className="text-black font-medium">Price</p>
                    </div>

                    <div className="min-w-[275px]">
                      <p className="text-black font-medium">Quantity</p>
                    </div>

                    <div className="min-w-[200px]">
                      <p className="text-black font-medium">Subtotal</p>
                    </div>

                    <div className="min-w-[50px]">
                      <p className="text-black font-medium text-right">
                        Action
                      </p>
                    </div>
                  </div>

                  {/* <!-- cart item --> */}
                  {cartItems.length > 0 &&
                    cartItems.map((item, key) => (
                      <SingleItem item={item} key={key} />
                    ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
              <Discount />
              <OrderSummary />
            </div>
          </div>
        </section>
      ) : (
        <>
          <EmptyCart />
        </>
      )}
    </>
  );
};

export default Cart;
