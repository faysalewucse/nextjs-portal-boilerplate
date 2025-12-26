import { apiClient } from "./client";
import type {
  LoginCredentials,
  RegisterCredentials,
  VerifyOtpData,
  ResendOtpData,
  GoogleLoginData,
  AuthResponse,
  RegisterResponse,
} from "@/types/auth";

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/login", credentials);
  },

  async register(
    credentials: RegisterCredentials
  ): Promise<RegisterResponse> {
    return apiClient.post<RegisterResponse>("/auth/register", credentials);
  },

  async verifyOtp(data: VerifyOtpData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/verify-otp", data);
  },

  async resendOtp(
    data: ResendOtpData
  ): Promise<{ status: string; message: string; data: { sentTo: string } }> {
    return apiClient.post("/auth/resend-otp", data);
  },

  async googleLogin(data: GoogleLoginData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/google-login", data);
  },

  async getCurrentUser(token: string): Promise<AuthResponse> {
    return apiClient.get<AuthResponse>("/auth/me", { token });
  },

  async refreshToken(
    token: string
  ): Promise<{ accessToken: string }> {
    return apiClient.post<{ accessToken: string }>(
      "/auth/refresh",
      {},
      { token }
    );
  },
};
