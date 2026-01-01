
export interface AddToCartPayload {
  product: string; // Product ID
  variant?: string; // Variant ID (optional)
  quantity: number;
}

export interface UpdateCartItemPayload {
  product: string; // Product ID
  variant?: string; // Variant ID (optional)
  quantity: number;
}

export interface RemoveFromCartPayload {
  product: string; // Product ID
  variant?: string; // Variant ID (optional)
}

export interface CartItemBackend {
  _id?: string;
  product: any; // Product object from backend
  variant?: any; // Variant object from backend
  quantity: number;
}

export interface GetCartResponse {
  items: CartItemBackend[];
}

export interface CartResponse {
  success: boolean;
  items: CartItemBackend[];
}
