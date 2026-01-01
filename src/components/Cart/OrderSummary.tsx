import { selectTotalPrice } from "@/redux/features/cart/cart-slice";
import { useAppSelector } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-md border-2 border-gray-200 rounded-[10px]">
        <div className="border-b border-gray-200 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-black">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-200">
            <div>
              <h4 className="font-medium text-black">Product</h4>
            </div>
            <div>
              <h4 className="font-medium text-black text-right">Subtotal</h4>
            </div>
          </div>

          {/* <!-- product item --> */}
          {/* {items.map((item, key) => (
            <div key={key} className="flex items-center justify-between py-5 border-b border-gray-200">
              <div>
                <p className="text-black">{item.title}</p>
              </div>
              <div>
                <p className="text-black text-right">
                  ${item.discountedPrice * item.quantity}
                </p>
              </div>
            </div>
          ))} */}

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-black">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-black text-right">
                ${totalPrice}
              </p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <button
            type="submit"
            className="w-full flex justify-center font-medium text-white bg-black hover:bg-gray-800 py-3 px-6 rounded-md ease-out duration-200 mt-7.5"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
