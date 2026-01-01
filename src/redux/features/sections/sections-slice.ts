// redux/features/sections/sections-slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { asyncGetSection } from "./sections-thunk";

// State for each section
interface SectionData {
  products: Product[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

// Dynamic sections state
interface SectionsState {
  [sectionSlug: string]: SectionData;
}

const initialState: SectionsState = {};

// Helper to get initial section state
const getInitialSectionState = (): SectionData => ({
  products: [],
  loading: false,
  error: null,
  lastFetched: null,
});

const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    clearSectionError: (state, action: { payload: string }) => {
      const sectionSlug = action.payload;
      if (state[sectionSlug]) {
        state[sectionSlug].error = null;
      }
    },
    resetSection: (state, action: { payload: string }) => {
      const sectionSlug = action.payload;
      state[sectionSlug] = getInitialSectionState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetSection.pending, (state, action) => {
        const sectionSlug = action.meta.arg;
        if (!state[sectionSlug]) {
          state[sectionSlug] = getInitialSectionState();
        }
        state[sectionSlug].loading = true;
        state[sectionSlug].error = null;
      })
      .addCase(asyncGetSection.fulfilled, (state, action) => {
        const { slug, products } = action.payload;
        if (!state[slug]) {
          state[slug] = getInitialSectionState();
        }
        state[slug].loading = false;
        state[slug].products = products;
        state[slug].lastFetched = Date.now();
      })
      .addCase(asyncGetSection.rejected, (state, action) => {
        const sectionSlug = action.meta.arg;
        if (!state[sectionSlug]) {
          state[sectionSlug] = getInitialSectionState();
        }
        state[sectionSlug].loading = false;
        state[sectionSlug].error =
          action.payload || `Failed to fetch ${sectionSlug}`;
      });
  },
});

export const { clearSectionError, resetSection } = sectionsSlice.actions;
export default sectionsSlice.reducer;
