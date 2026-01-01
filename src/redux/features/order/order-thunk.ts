import apiClient from "@/hooks/useAxios";
import {
  CheckoutPayload,
  CheckoutResponse,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "@/types/order.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Checkout order (COD or Razorpay)
export const asyncCheckoutOrder = createAsyncThunk<
  CheckoutResponse,
  CheckoutPayload,
  { rejectValue: string }
>("order/asyncCheckoutOrder", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiClient.post<CheckoutResponse>(
      "/api/public/orders/checkout",
      payload
    );

    if (payload.paymentMethod === "COD") {
      toast.success("Order placed successfully!");
    }

    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.error || "Failed to checkout";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// Verify Razorpay payment
export const asyncVerifyPayment = createAsyncThunk<
  VerifyPaymentResponse,
  VerifyPaymentPayload,
  { rejectValue: string }
>("order/asyncVerifyPayment", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiClient.post<VerifyPaymentResponse>(
      "/api/public/payment/verify",
      payload
    );

    toast.success("Payment verified successfully!");
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.error || "Payment verification failed";
    toast.error(message);
    return rejectWithValue(message);
  }
});
