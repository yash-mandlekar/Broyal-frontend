// redux/slices/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Product, Variant } from "@/types/product";
import {
  asyncGetPublicProducts,
  asyncGetProductById,
  asyncGetProductBySlug,
  asyncGetProductVariants,
  asyncGetVariantById,
} from "./product-thunk";

interface ProductState {
  // Single product details
  productDetails: {
    value: Product | null;
    loading: boolean;
    error: string | null;
  };

  // Products list
  products: {
    list: Product[];
    total: number;
    page: number;
    limit: number;
    loading: boolean;
    error: string | null;
  };

  // Product variants
  variants: {
    list: Variant[];
    loading: boolean;
    error: string | null;
  };

  // Single variant
  variant: {
    value: Variant | null;
    loading: boolean;
    error: string | null;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  productDetails: {
    value: null,
    loading: false,
    error: null,
  },

  products: {
    list: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
  },

  variants: {
    list: [],
    loading: false,
    error: null,
  },

  variant: {
    value: null,
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = {
        value: null,
        loading: false,
        error: null,
      };
    },
    clearProductsError: (state) => {
      state.products.error = null;
    },
    clearVariantsError: (state) => {
      state.variants.error = null;
    },
    resetProductsFilter: (state) => {
      state.products = {
        list: [],
        total: 0,
        page: 1,
        limit: 10,
        loading: false,
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    // Get Public Products
    builder
      .addCase(asyncGetPublicProducts.pending, (state) => {
        state.products.loading = true;
        state.products.error = null;
      })
      .addCase(asyncGetPublicProducts.fulfilled, (state, action) => {
        state.products.loading = false;
        state.products.list = action.payload.products;
        state.products.total = action.payload.total;
        state.products.page = action.payload.page;
      })
      .addCase(asyncGetPublicProducts.rejected, (state, action) => {
        state.products.loading = false;
        state.products.error = action.payload || "Failed to fetch products";
      });

    // Get Product by ID
    builder
      .addCase(asyncGetProductById.pending, (state) => {
        state.productDetails.loading = true;
        state.productDetails.error = null;
      })
      .addCase(asyncGetProductById.fulfilled, (state, action) => {
        state.productDetails.loading = false;
        state.productDetails.value = action.payload;
      })
      .addCase(asyncGetProductById.rejected, (state, action) => {
        state.productDetails.loading = false;
        state.productDetails.error =
          action.payload || "Failed to fetch product";
      });

    // Get Product by Slug
    builder
      .addCase(asyncGetProductBySlug.pending, (state) => {
        state.productDetails.loading = true;
        state.productDetails.error = null;
      })
      .addCase(asyncGetProductBySlug.fulfilled, (state, action) => {
        state.productDetails.loading = false;
        state.productDetails.value = action.payload;
      })
      .addCase(asyncGetProductBySlug.rejected, (state, action) => {
        state.productDetails.loading = false;
        state.productDetails.error =
          action.payload || "Failed to fetch product";
      });

    // Get Product Variants
    builder
      .addCase(asyncGetProductVariants.pending, (state) => {
        state.variants.loading = true;
        state.variants.error = null;
      })
      .addCase(asyncGetProductVariants.fulfilled, (state, action) => {
        state.variants.loading = false;
        state.variants.list = action.payload;
      })
      .addCase(asyncGetProductVariants.rejected, (state, action) => {
        state.variants.loading = false;
        state.variants.error = action.payload || "Failed to fetch variants";
      });

    // Get Variant by ID
    builder
      .addCase(asyncGetVariantById.pending, (state) => {
        state.variant.loading = true;
        state.variant.error = null;
      })
      .addCase(asyncGetVariantById.fulfilled, (state, action) => {
        state.variant.loading = false;
        state.variant.value = action.payload;
      })
      .addCase(asyncGetVariantById.rejected, (state, action) => {
        state.variant.loading = false;
        state.variant.error = action.payload || "Failed to fetch variant";
      });
  },
});

export const {
  clearProductDetails,
  clearProductsError,
  clearVariantsError,
  resetProductsFilter,
} = productSlice.actions;

export default productSlice.reducer;
