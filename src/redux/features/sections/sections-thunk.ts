// redux/features/sections/sections-thunk.ts
import apiClient from "@/hooks/useAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

// Section response from API
export interface SectionResponse {
  _id: string;
  title: string;
  slug: string;
  products: Product[];
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Get section by slug (e.g., 'new-arrivals', 'best-sellers', 'featured')
export const asyncGetSection = createAsyncThunk<
  { slug: string; products: Product[] },
  string,
  { rejectValue: string }
>("sections/asyncGetSection", async (sectionSlug, { rejectWithValue }) => {
  try {
    const res = await apiClient.get<SectionResponse>(
      `/api/sections/${sectionSlug}`
    );

    return {
      slug: sectionSlug,
      products: res.data.products || [],
    };
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || `Failed to fetch ${sectionSlug} section`
    );
  }
});
