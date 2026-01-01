
// types/product.ts
/**
 * Product Types
 * Centralized type definitions for product-related data structures
 */

// Product Image
export interface ProductImage {
  url: string;
  isPrimary?: boolean;
  _id?: string;
}

// Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
  parent?: string | null;
  description?: string;
  image?: string;
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Variant Attribute
export interface VariantAttribute {
  key: string;
  value: string;
}

// Product Variant
export interface Variant {
  _id: string;
  product: string;
  attributes: VariantAttribute[];
  price: number;
  discountPrice?: number;
  stock: number;
  SKU?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Main Product
export interface Product {
  _id: string;
  title: string;
  excerpt?: string;
  description: string; // HTML string
  price: number;
  discountPrice?: number;
  stock: number;
  images: ProductImage[];
  category: Category;
  brand: string;
  SKU?: string;
  variants?: Variant[];
  attributes?: VariantAttribute[];
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// API Response for Single Product
export interface GetProductResponse {
  success: boolean;
  data: Product;
  message?: string;
}

// API Response for Multiple Products
export interface GetProductsResponse {
  success: boolean;
  products: Product[];
  total?: number;
  page?: number;
  message?: string;
}

// Product Form Data (for create/update)
export interface ProductFormData {
  title: string;
  excerpt?: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string; // category ID
  brand: string;
  // images and variants handled separately
}

// Variant Form Data (for create/update)
export interface VariantFormData {
  product: string; // product ID
  attributes: VariantAttribute[];
  price: number;
  discountPrice?: number;
  stock: number;
  SKU?: string;
  image?: string;
}

// Filter/Search Params
export interface ProductFilterParams {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
  sort?: "price" | "newest" | "popular";
}

// Stock Update
export interface StockUpdateData {
  productId: string;
  quantity: number;
}

// Cart Item (for reference)
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}