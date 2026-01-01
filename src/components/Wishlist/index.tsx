"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";

export const Wishlist = () => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  return (
    <>
      <section className="overflow-hidden py-20 bg-gray-50 mt-44">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-black text-2xl">Your Wishlist</h2>
            <button className="text-black hover:text-gray-700 font-medium">
              Clear Wishlist Cart
            </button>
          </div>

          <div className="bg-white rounded-[10px] shadow-md border-2 border-gray-200">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10">
                  <div className="min-w-[83px]"></div>
                  <div className="min-w-[387px]">
                    <p className="text-black font-medium">Product</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-black font-medium">Unit Price</p>
                  </div>

                  <div className="min-w-[265px]">
                    <p className="text-black font-medium">Stock Status</p>
                  </div>

                  <div className="min-w-[150px]">
                    <p className="text-black font-medium text-right">Action</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {wishlistItems.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
