import { createSlice } from "@reduxjs/toolkit";
import { asyncLoginThunk, asyncVerifyOtpThunk } from "./auth-thunk";
import { toast } from "sonner";
import { AuthState } from "@/types/user.types";
import { jwtDecode } from "jwt-decode";

const initialState: AuthState = {
  user: null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  isAuthenticated: false,
  loading: true,
  page_loading: true,
  btnloading: false,
  error: null,
  roles: [],
  permissions: [],
  counselling_category: [],
  counselling_product: [],
  users: [],
  pagination: null,
  selectedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      toast.info("You've been logged out...");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    },
    fetchUser: (state, action) => {
      state.user = jwtDecode(action.payload);
      state.loading = false;
    },
    setLoadingFalse: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // ============================================================ Admin ============================================================
    // 🔹 LOGIN
    builder
      .addCase(asyncLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = jwtDecode(action.payload.accessToken);
        state.isAuthenticated = true;
        toast.success(`Welcome back! ${state.user.name} `);
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(asyncLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
        toast.error(state.error);
      });

    // 🔹 VERIFY OTP
    builder
      .addCase(asyncVerifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncVerifyOtpThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = jwtDecode(action.payload.accessToken);
        state.isAuthenticated = true;
        toast.success(`Welcome back! ${state?.user?.name} `);
        localStorage.setItem("accessToken", action.payload.accessToken);
        setTimeout(() => {
          state.loading = false;
        }, 500);
      })
      .addCase(asyncVerifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
        toast.error(state.error);
      });

    // 🔹 FETCH ADMIN PROFILE
    // builder
    //   .addCase(fetchAdminProfile.pending, (state) => {
    //     state.page_loading = true;
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchAdminProfile.fulfilled, (state, action) => {
    //     state.page_loading = false;
    //     state.loading = false;
    //     if (action.payload.roles === "admin") {
    //       state.user = action.payload;
    //       state.isAuthenticated = true;
    //     }
    //   })
    //   .addCase(fetchAdminProfile.rejected, (state, action) => {
    //     state.page_loading = false;
    //     state.loading = false;
    //     state.error = action.payload || "Failed to fetch user.";
    //     state.isAuthenticated = false;
    //   });

    // 🔹 UPDATE ADMIN PROFILE
    // builder
    //   .addCase(updateUserProfile.pending, (state) => {
    //     state.btnloading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateUserProfile.fulfilled, (state, action) => {
    //     state.btnloading = false;
    //     if (state.user && action.payload) {
    //       state.user = {
    //         ...state.user,
    //         ...action.payload,
    //       };
    //     }
    //   })
    //   .addCase(updateUserProfile.rejected, (state, action) => {
    //     state.btnloading = false;
    //     state.error = action.payload || "Profile update failed.";
    //     toast.error(state.error);
    //   });
  },
});

export const { logoutAdmin, fetchUser, setLoadingFalse } = authSlice.actions;
export default authSlice.reducer;
