import { configureStore } from "@reduxjs/toolkit";

import auth from "./features/auth/auth-slice";
import quickViewReducer from "./features/quickView-slice";
import cart from "./features/cart/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import products from "./features/product/product-slice";
import sections from "./features/sections/sections-slice";
import order from "./features/order/order-slice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth,
    quickViewReducer,
    cart,
    wishlistReducer,
    products,
    sections,
    order,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
