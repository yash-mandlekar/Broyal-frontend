"use client";
import React, { useEffect, useState } from "react";
import { Lock, Mail, Send } from "lucide-react";
import {
  asyncLoginThunk,
  asyncSendOtpThunk,
  asyncVerifyOtpThunk,
} from "@/redux/features/auth/auth-thunk";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import PreLoader from "../Common/PreLoader";
import { setLoadingFalse } from "@/redux/features/auth/auth-slice";

type Tab = "password" | "otp";

interface FormData {
  identifier: string;
  password: string;
  otp: string;
}

const Signin = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<Tab>("password");
  const [formData, setFormData] = useState<FormData>({
    identifier: "oabhishekh8@gmail.com",
    password: "Abhi1234",
    otp: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");

  // Validation functions
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone: string): boolean => {
    // Indian phone number: 10 digits, optionally starting with +91 or 91
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const isValidIdentifier = (identifier: string): boolean => {
    return isValidEmail(identifier) || isValidPhoneNumber(identifier);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error when user types
    if (name === "identifier") {
      setValidationError("");
    }
  };

  const validateIdentifier = (): boolean => {
    if (!formData.identifier.trim()) {
      setValidationError("Please enter an email or phone number");
      return false;
    }

    if (!isValidIdentifier(formData.identifier)) {
      setValidationError("Please enter a valid email or 10-digit phone number");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handlePasswordSignIn = async () => {
    if (!validateIdentifier()) return;

    setIsLoading(true);
    try {
      console.log("Password Sign-In", {
        identifier: formData.identifier,
        password: formData.password,
      });
      const res = await dispatch(
        asyncLoginThunk({
          identifier: formData.identifier,
          password: formData.password,
        })
      ).unwrap();
      if (res.accessToken) {
        route.push("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await dispatch(
        asyncVerifyOtpThunk({
          identifier: formData.identifier,
          otp: formData.otp,
        })
      ).unwrap();
      if (res.accessToken) {
        route.push("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!validateIdentifier()) return;

    setIsLoading(true);
    try {
      dispatch(asyncSendOtpThunk({ identifier: formData.identifier }));
      setOtpSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (activeTab === "password") handlePasswordSignIn();
    else handleOtpSignIn();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (
        activeTab === "password" &&
        formData.identifier &&
        formData.password
      ) {
        handleSubmit();
      } else if (activeTab === "otp" && otpSent && formData.otp.length === 4) {
        handleSubmit();
      }
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setOtpSent(false);
    setFormData((prev) => ({ ...prev, otp: "" }));
    setValidationError("");
  };

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      route.push("/");
    } else {
      dispatch(setLoadingFalse());
    }
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  // Check if Send OTP button should be enabled
  const isSendOtpEnabled =
    formData.identifier.trim() && isValidIdentifier(formData.identifier);

  return (
    <section className="overflow-hidden py-20 min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block text-center lg:text-left space-y-6">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <h1 className="text-4xl font-bold text-black">BROYAL</h1>
              </div>
              <p className="text-lg text-gray-700">
                Premium Leather Collection
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-black">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Authentic Pieces
                  </h3>
                  <p className="text-sm text-gray-600">
                    Curated collection of premium Leather
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-black">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Secure Shopping
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your account is protected with advanced security
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-black">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Exclusive Deals
                  </h3>
                  <p className="text-sm text-gray-600">
                    Access special offers and member benefits
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 xl:p-10 border-2 border-gray-200">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-black">
                Welcome Back
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                Signin/Signup to your exclusive collection
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 p-1.5 rounded-lg relative bg-gray-100">
              {["password", "otp"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab as Tab)}
                  className={`flex-1 py-2.5 px-4 text-sm sm:text-base font-semibold rounded-md transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-black text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "password" ? "Password" : "OTP"}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Email / Mobile */}
              <div className="transition-opacity duration-300">
                <label
                  htmlFor="identifier"
                  className="block mb-2.5 text-sm font-semibold text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-black" />
                    Email or Mobile Number
                  </div>
                </label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email or mobile"
                  disabled={activeTab === "otp" && otpSent}
                  className="w-full rounded-lg border-2 px-4 py-3 text-gray-900 bg-white placeholder-gray-400 outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 border-gray-200 focus:border-black"
                />
                {validationError && (
                  <p className="text-red-500 text-sm mt-2">{validationError}</p>
                )}
              </div>

              {/* Password Input */}
              <div
                className={`transition-all duration-300 ${
                  activeTab === "password"
                    ? "opacity-100 max-h-40 translate-y-0"
                    : "opacity-0 max-h-0 -translate-y-2 overflow-hidden pointer-events-none"
                }`}
              >
                <label
                  htmlFor="password"
                  className="block mb-2.5 text-sm font-semibold text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    <Lock size={18} className="text-black" />
                    Password
                  </div>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border-2 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 border-gray-200 focus:border-black"
                />

                <a
                  href="#"
                  className="inline-block text-sm font-semibold mt-3 hover:opacity-70 transition-opacity text-black"
                >
                  Forgot your password?
                </a>
              </div>

              {/* OTP Section */}
              <div
                className={`transition-all duration-300 ${
                  activeTab === "otp"
                    ? "opacity-100 max-h-96 translate-y-0"
                    : "opacity-0 max-h-0 -translate-y-2 overflow-hidden pointer-events-none"
                }`}
              >
                {!otpSent ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      We will send a one-time password to your email or mobile
                      number
                    </p>
                    <button
                      type="button"
                      disabled={isLoading || !isSendOtpEnabled}
                      onClick={handleSendOtp}
                      className="w-full py-3 px-6 rounded-lg text-white font-semibold shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl transform hover:scale-105 bg-black hover:bg-gray-800"
                    >
                      {isLoading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2.5 text-sm font-semibold text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <Send size={18} className="text-black" />
                        Enter OTP
                      </div>
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      maxLength={6}
                      inputMode="numeric"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="w-full rounded-lg border-2 px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 text-center text-2xl tracking-widest border-gray-200 focus:border-black"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setFormData((prev) => ({ ...prev, otp: "" }));
                      }}
                      className="text-sm font-semibold mt-3 hover:opacity-70 transition-opacity text-black"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              {activeTab === "password" || (activeTab === "otp" && otpSent) ? (
                <button
                  type="button"
                  disabled={
                    isLoading ||
                    !formData.identifier ||
                    (activeTab === "password" && !formData.password) ||
                    (activeTab === "otp" && formData.otp.length !== 4)
                  }
                  onClick={handleSubmit}
                  className="w-full mt-8 py-3.5 px-6 rounded-lg text-white font-semibold shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl transform hover:scale-105 bg-black hover:bg-gray-800"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
