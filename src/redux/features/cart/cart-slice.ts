import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Product, Variant } from "@/types/product";
import {
  asyncGetCart,
  asyncAddToCart,
  asyncUpdateCartItem,
  asyncRemoveFromCart,
  asyncClearCart,
} from "./cart-thunk";

type InitialState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

type CartItem = {
  productId: string; // Product ID
  variantId?: string; // Variant ID (optional)
  quantity: number;
  // Denormalized data for faster rendering
  product?: Product;
  variant?: Variant;
};

const initialState: InitialState = {
  items: [],
  loading: false,
  error: null,
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart (local state only - for immediate UI feedback)
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, variantId, quantity, product, variant } =
        action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId,
          variantId,
          quantity,
          product,
          variant,
        });
      }
      state.error = null;
    },

    // Remove item from cart (local state)
    removeItemFromCart: (
      state,
      action: PayloadAction<{ productId: string; variantId?: string }>
    ) => {
      const { productId, variantId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId)
      );
    },

    // Update quantity (local state)
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        variantId?: string;
        quantity: number;
      }>
    ) => {
      const { productId, variantId, quantity } = action.payload;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) =>
            !(item.productId === productId && item.variantId === variantId)
        );
      } else {
        const existingItem = state.items.find(
          (item) => item.productId === productId && item.variantId === variantId
        );

        if (existingItem) {
          existingItem.quantity = quantity;
        }
      }
    },

    // Clear all items from cart (local state)
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    },

    // Set error state
    setCartError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Get Cart
    builder
      .addCase(asyncGetCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items.map((item) => ({
          productId: item.product._id,
          variantId: item.variant?._id,
          quantity: item.quantity,
          product: item.product,
          variant: item.variant,
        }));
      })
      .addCase(asyncGetCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      });

    // Add to Cart
    builder
      .addCase(asyncAddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Map backend response, but preserve product data if it's missing from backend
        state.items = action.payload.items.map((backendItem) => {
          // Find existing item in state (from optimistic update)
          const existingItem = state.items.find(
            (item) => item.productId === backendItem.product._id
          );

          return {
            productId: backendItem.product._id,
            variantId: backendItem.variant?._id,
            quantity: backendItem.quantity,
            // Use backend product data if available, otherwise keep existing
            product: backendItem.product || existingItem?.product,
            variant: backendItem.variant || existingItem?.variant,
          };
        });
      })
      .addCase(asyncAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add to cart";
      });

    // Update Cart Item
    builder
      .addCase(asyncUpdateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpdateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items.map((item) => ({
          productId: item.product._id,
          variantId: item.variant?._id,
          quantity: item.quantity,
          product: item.product,
          variant: item.variant,
        }));
      })
      .addCase(asyncUpdateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update cart";
      });

    // Remove from Cart
    builder
      .addCase(asyncRemoveFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRemoveFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items.map((item) => ({
          productId: item.product._id,
          variantId: item.variant?._id,
          quantity: item.quantity,
          product: item.product,
          variant: item.variant,
        }));
      })
      .addCase(asyncRemoveFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove from cart";
      });

    // Clear Cart
    builder
      .addCase(asyncClearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncClearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(asyncClearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to clear cart";
      });
  },
});

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartLoading = (state: RootState) => state.cart.loading;

export const selectCartError = (state: RootState) => state.cart.error;

// Total price selector (using discounted price if available)
export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  return items.reduce((total, item) => {
    const price = item.product?.discountPrice ?? item.product?.price ?? 0;
    return total + price * item.quantity;
  }, 0);
});

// Original total price (before discount)
export const selectOriginalTotalPrice = createSelector(
  [selectCartItems],
  (items) => {
    return items.reduce((total, item) => {
      const price = item.product?.price ?? 0;
      return total + price * item.quantity;
    }, 0);
  }
);

// Total discount amount
export const selectTotalDiscount = createSelector(
  [selectOriginalTotalPrice, selectTotalPrice],
  (original, discounted) => original - discounted
);

// Cart item count (total quantity)
export const selectCartItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((count, item) => count + item.quantity, 0)
);

// Cart line items count (unique product+variant combinations)
export const selectCartLineItemsCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

// Check if item is in cart
export const selectIsItemInCart = (productId: string, variantId?: string) =>
  createSelector([selectCartItems], (items) =>
    items.some(
      (item) => item.productId === productId && item.variantId === variantId
    )
  );

// Get specific cart item
export const selectCartItem = (productId: string, variantId?: string) =>
  createSelector([selectCartItems], (items) =>
    items.find(
      (item) => item.productId === productId && item.variantId === variantId
    )
  );

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
  setCartError,
} = cart.actions;

export default cart.reducer;
