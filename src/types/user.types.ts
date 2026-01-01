export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  page_loading: boolean;
  btnloading: boolean;
  error: string | null;
  roles: string[];
  permissions: string[];
  counselling_category: any[];
  counselling_product: any[];
  users: User[];
  pagination: any | null;
  selectedUser: User | null;
}

export interface User {
  name?: string;
  email: string;
  password?: string;
  otp?: string;
  avatar?: string;
  phone?: string;
  isVerified?: boolean;
  isProfileCompleted?: boolean;
  authProviders?: IAuthProvider[];
  roles?: string;
  status?: string;
  meta?: string;
  address?: IAddress[];
  wishlist?: string[];
  lastLogin?: Date;
  loginHistory?: ILoginHistory[];
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IAuthProvider {
  provider: string; // e.g., 'email', 'google', 'otp', 'facebook'
  providerId?: string; // e.g., googleId, facebookId
  meta?: string; // e.g., tokens, expiry, etc.
}
export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
}
export interface ILoginHistory {
  date: Date;
  ip?: string;
}
