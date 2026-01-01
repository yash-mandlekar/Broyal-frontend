import apiClient from "@/hooks/useAxios";
import {
  AddToCartPayload,
  CartResponse,
  GetCartResponse,
  RemoveFromCartPayload,
  UpdateCartItemPayload,
} from "@/types/cart.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Get user's cart
export const asyncGetCart = createAsyncThunk<
  GetCartResponse,
  void,
  { rejectValue: string }
>("cart/asyncGetCart", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<GetCartResponse>("/api/cart");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || "Failed to fetch cart");
  }
});

// Add item to cart
export const asyncAddToCart = createAsyncThunk<
  CartResponse,
  AddToCartPayload,
  { rejectValue: string }
>("cart/asyncAddToCart", async (payload, { rejectWithValue }) => {
  try {
    const res = await apiClient.post<CartResponse>("/api/cart/add", payload);
    toast.success("Product added to cart!");
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.error || "Failed to add to cart";
    toast.error(message);
    return rejectWithValue(message);
  }
});

// Update cart item quantity
export const asyncUpdateCartItem = createAsyncThunk<
  CartResponse,
  UpdateCartItemPayload,
  { rejectValue: string }
>(
  "cart/asyncUpdateCartItem",
  async ({ product, variant, quantity }, { rejectWithValue }) => {
    try {
      const res = await apiClient.put<CartResponse>("/api/cart/update", {
        product,
        variant,
        quantity,
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update cart"
      );
    }
  }
);

// Remove item from cart
export const asyncRemoveFromCart = createAsyncThunk<
  CartResponse,
  RemoveFromCartPayload,
  { rejectValue: string }
>(
  "cart/asyncRemoveFromCart",
  async ({ product, variant }, { rejectWithValue }) => {
    try {
      const res = await apiClient.delete<CartResponse>("/api/cart/remove", {
        data: { product, variant },
      });
      toast.success("Item removed from cart");
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.error || "Failed to remove from cart";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Clear entire cart
export const asyncClearCart = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("cart/asyncClearCart", async (_, { rejectWithValue }) => {
  try {
    // You need to implement a clear cart endpoint on backend
    // For now, we can remove items one by one or just clear local state
    toast.success("Cart cleared");
    return;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || "Failed to clear cart");
  }
});
