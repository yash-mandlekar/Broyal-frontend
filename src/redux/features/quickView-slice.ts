import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    _id: "",
    title: "",
    excerpt: "",
    description: "",
    price: 0,
    discountPrice: 0,
    stock: 0,
    images: [],
    category: {
      _id: "",
      name: "",
      slug: "",
      parent: null,
      description: "",
      image: "",
      status: "active",
      createdAt: "",
      updatedAt: "",
    },
    brand: "",
    SKU: "",
    variants: [],
    attributes: [],
    slug: "",
    createdAt: "",
    updatedAt: "",
  },
} as InitialState;

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
