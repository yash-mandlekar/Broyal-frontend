import React from "react";

const Discount = () => {
  return (
    <div className="lg:max-w-[670px] w-full">
      <form>
        {/* <!-- coupon box --> */}
        <div className="bg-white shadow-md border-2 border-gray-200 rounded-[10px]">
          <div className="border-b border-gray-200 py-5 px-4 sm:px-5.5">
            <h3 className="text-black font-medium">Have any discount code?</h3>
          </div>

          <div className="py-8 px-4 sm:px-8.5">
            <div className="flex flex-wrap gap-4 xl:gap-5.5">
              <div className="max-w-[426px] w-full">
                <input
                  type="text"
                  name="coupon"
                  id="coupon"
                  placeholder="Enter coupon code"
                  className="rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-md focus:ring-2 focus:ring-black/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex font-medium text-white bg-black hover:bg-gray-800 py-3 px-8 rounded-md ease-out duration-200"
              >
                Apply Code
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Discount;
