// redux/thunks/productThunk.ts
import apiClient from "@/hooks/useAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Product,
  Variant,
  ProductFilterParams,
  GetProductsResponse,
  GetProductResponse,
} from "@/types/product";

// Get all public products with filters, search, pagination, sorting
export const asyncGetPublicProducts = createAsyncThunk<
  { products: Product[]; total: number; page: number },
  ProductFilterParams,
  { rejectValue: string }
>("products/asyncGetPublicProducts", async (params, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<GetProductsResponse>("/api/products", {
      params,
    });
    return {
      products: res.data.products,
      total: res.data.total || 0,
      page: res.data.page || 1,
    };
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch products"
    );
  }
});

// Get single product by ID
export const asyncGetProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/asyncGetProductById", async (productId, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<GetProductResponse>(
      `/api/products/${productId}`
    );
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch product"
    );
  }
});

// Get product by slug
export const asyncGetProductBySlug = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/asyncGetProductBySlug", async (slug, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<GetProductResponse>(
      `/api/products/slug/${slug}`
    );
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch product"
    );
  }
});

// Get product variants
export const asyncGetProductVariants = createAsyncThunk<
  Variant[],
  string,
  { rejectValue: string }
>(
  "products/asyncGetProductVariants",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await apiClient.get<{ success: boolean; data: Variant[] }>(
        `/api/products/${productId}/variants`
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch variants"
      );
    }
  }
);

// Get single variant by ID
export const asyncGetVariantById = createAsyncThunk<
  Variant,
  string,
  { rejectValue: string }
>("products/asyncGetVariantById", async (variantId, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<{ success: boolean; data: Variant }>(
      `/api/variants/${variantId}`
    );
    return res.data.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch variant"
    );
  }
});
