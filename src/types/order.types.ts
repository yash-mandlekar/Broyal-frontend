// Order and Payment Types

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface CheckoutPayload {
  paymentMethod: "COD" | "ONLINE";
  couponCode?: string;
  shipping: Address;
  billingAddress: Address;
  orderNote?: string;
  taxRate?: number;
  shippingCost?: number;
  estimatedDelivery?: string;
}

export interface OrderItem {
  product: string;
  variant?: string;
  quantity: number;
  price: number;
  productTitle: string;
  productSKU: string;
  productImage: string;
  productBrand: string;
  productCategory: string;
  variantSKU?: string;
  variantAttributes?: any;
  variantImage?: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  subtotal: number;
  taxTotal: number;
  taxRate: number;
  taxBreakdown: {
    GST: number;
  };
  shippingCost: number;
  discount: number;
  discountAmount: number;
  grandTotal: number;
  total: number;
  shipping: Address;
  billingAddress: Address;
  orderNote?: string;
  estimatedDelivery?: string;
  coupon?: string;
  couponCode?: string;
  status: string;
  payment: {
    method: string;
    transactionId: string;
  };
  paymentStatus: string;
  statusHistory: Array<{
    status: string;
    date: Date;
  }>;
  razorpayOrderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CheckoutResponse {
  order: Order;
  razorpayOrderId?: string;
  amount?: number;
  currency?: string;
  key?: string;
}

export interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  order: Order;
}

// Razorpay SDK Types
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: any) => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
