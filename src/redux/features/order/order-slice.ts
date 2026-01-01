import { Order } from "@/types/order.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { asyncCheckoutOrder, asyncVerifyPayment } from "./order-thunk";

interface OrderState {
  currentOrder: Order | null;
  orders: Order[];
  isCheckoutLoading: boolean;
  isVerifyLoading: boolean;
  checkoutError: string | null;
  verifyError: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  orders: [],
  isCheckoutLoading: false,
  isVerifyLoading: false,
  checkoutError: null,
  verifyError: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.checkoutError = null;
      state.verifyError = null;
    },
    clearErrors: (state) => {
      state.checkoutError = null;
      state.verifyError = null;
    },
  },
  extraReducers: (builder) => {
    // Checkout Order
    builder
      .addCase(asyncCheckoutOrder.pending, (state) => {
        state.isCheckoutLoading = true;
        state.checkoutError = null;
      })
      .addCase(asyncCheckoutOrder.fulfilled, (state, action) => {
        state.isCheckoutLoading = false;
        state.currentOrder = action.payload.order;
        state.orders.push(action.payload.order);
      })
      .addCase(asyncCheckoutOrder.rejected, (state, action) => {
        state.isCheckoutLoading = false;
        state.checkoutError = action.payload || "Checkout failed";
      });

    // Verify Payment
    builder
      .addCase(asyncVerifyPayment.pending, (state) => {
        state.isVerifyLoading = true;
        state.verifyError = null;
      })
      .addCase(asyncVerifyPayment.fulfilled, (state, action) => {
        state.isVerifyLoading = false;
        if (state.currentOrder) {
          state.currentOrder = action.payload.order;
        }
        // Update order in orders array
        const index = state.orders.findIndex(
          (o) => o._id === action.payload.order._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }
      })
      .addCase(asyncVerifyPayment.rejected, (state, action) => {
        state.isVerifyLoading = false;
        state.verifyError = action.payload || "Payment verification failed";
      });
  },
});

export const { clearCurrentOrder, clearErrors } = orderSlice.actions;
export default orderSlice.reducer;
