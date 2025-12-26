import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AuthStore,
  LoginCredentials,
  RegisterCredentials,
  VerifyOtpData,
  ResendOtpData,
  GoogleLoginData,
  RegisterResponse,
} from "@/types/auth";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authApi.login(credentials);

          set({
            user: response.data.user,
            accessToken: response.data.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof ApiError
              ? error.message
              : "An error occurred during login";

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            accessToken: null,
          });
          throw error;
        }
      },

      register: async (
        credentials: RegisterCredentials
      ): Promise<RegisterResponse> => {
        set({ isLoading: true, error: null });

        try {
          const response = await authApi.register(credentials);
          set({ isLoading: false });
          return response;
        } catch (error) {
          const errorMessage =
            error instanceof ApiError
              ? error.message
              : "An error occurred during registration";

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      verifyOtp: async (data: VerifyOtpData) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authApi.verifyOtp(data);

          set({
            user: response.data.user,
            accessToken: response.data.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof ApiError
              ? error.message
              : "An error occurred during OTP verification";

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      resendOtp: async (data: ResendOtpData) => {
        set({ isLoading: true, error: null });

        try {
          await authApi.resendOtp(data);
          set({ isLoading: false });
        } catch (error) {
          const errorMessage =
            error instanceof ApiError
              ? error.message
              : "An error occurred while resending OTP";

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      googleLogin: async (data: GoogleLoginData) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authApi.googleLogin(data);

          set({
            user: response.data.user,
            accessToken: response.data.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage =
            error instanceof ApiError
              ? error.message
              : "An error occurred during Google login";

          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            accessToken: null,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: async () => {
        const { accessToken } = get();

        if (!accessToken) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        try {
          const response = await authApi.getCurrentUser(accessToken);
          set({
            user: response.data.user,
            isAuthenticated: true,
          });
        } catch (error) {
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Export helper functions from types
export { hasPermission, hasPortalAccess, hasAnyPermission, hasAllPermissions } from "@/types/auth";
