import React from "react";
import Image from "next/image";

interface PaymentMethodProps {
  selectedMethod: "COD" | "ONLINE";
  onMethodChange: (method: "COD" | "ONLINE") => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Payment Method</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="online"
            className="flex cursor-pointer select-none items-center gap-4"
          >
            <div className="relative">
              <input
                type="radio"
                name="payment"
                id="online"
                className="sr-only"
                checked={selectedMethod === "ONLINE"}
                onChange={() => onMethodChange("ONLINE")}
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  selectedMethod === "ONLINE"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div
              className={`rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none ${
                selectedMethod === "ONLINE"
                  ? "border-transparent bg-gray-2"
                  : " border-gray-4 shadow-1"
              }`}
            >
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image
                    src="/images/checkout/bank.svg"
                    alt="razorpay"
                    width={29}
                    height={12}
                  />
                </div>

                <div className="border-l border-gray-4 pl-2.5">
                  <p>Razorpay (Online Payment)</p>
                </div>
              </div>
            </div>
          </label>

          <label
            htmlFor="cod"
            className="flex cursor-pointer select-none items-center gap-4"
          >
            <div className="relative">
              <input
                type="radio"
                name="payment"
                id="cod"
                className="sr-only"
                checked={selectedMethod === "COD"}
                onChange={() => onMethodChange("COD")}
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  selectedMethod === "COD"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div
              className={`rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none min-w-[240px] ${
                selectedMethod === "COD"
                  ? "border-transparent bg-gray-2"
                  : " border-gray-4 shadow-1"
              }`}
            >
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image
                    src="/images/checkout/cash.svg"
                    alt="cash"
                    width={21}
                    height={21}
                  />
                </div>

                <div className="border-l border-gray-4 pl-2.5">
                  <p>Cash on delivery</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
