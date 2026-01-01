import apiClient from "@/hooks/useAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const asyncLoginThunk = createAsyncThunk<
  { accessToken: string },
  { identifier: string; password: string },
  { rejectValue: string }
>("auth/asyncLoginThunk", async (credentials, { rejectWithValue }) => {
  try {
    const res = await apiClient.post("/api/auth/login", credentials);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const asyncSendOtpThunk = createAsyncThunk<
  { accessToken: string },
  { identifier: string },
  { rejectValue: string }
>("auth/asyncSendOtpThunk", async (credentials, { rejectWithValue }) => {
  try {
    const res = await apiClient.post("/api/auth/send-otp", credentials);
    toast.success(res.data.message);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Send Otp failed");
  }
});

export const asyncVerifyOtpThunk = createAsyncThunk<
  { accessToken: string },
  { identifier: string; otp: string },
  { rejectValue: string }
>("auth/asyncVerifyOtpThunk", async (credentials, { rejectWithValue }) => {
  try {
    const res = await apiClient.post("/api/auth/verify-otp", credentials);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Verify Otp failed");
  }
});

// export const asyncSignupThunk = createAsyncThunk<
//   { user: User; token: string },
//   { name: string; email: string; password: string },
//   { rejectValue: string }
// >("auth/signupUser", async (credentials, { rejectWithValue }) => {
//   try {
//     const res = await apiClient.post("/api/auth/signup", credentials);
//     return res.data;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || "Signup failed");
//   }
// });

// export const asyncSignupThunk = createAsyncThunk<
//   { user: User; token: string },
//   { name: string; email: string; password: string },
//   { rejectValue: string }
// >("auth/signupUser", async (credentials, { rejectWithValue }) => {
//   try {
//     const res = await apiClient.post("/api/auth/signup", credentials);
//     return res.data;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || "Signup failed");
//   }
// });
