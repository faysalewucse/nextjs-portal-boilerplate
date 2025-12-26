export enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
  FACEBOOK = "facebook",
  APPLE = "apple",
}

export interface Role {
  _id: string;
  name: string;
  permissions: string[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  authProvider: AuthProvider;
  googleId?: string;
  facebookId?: string;
  appleId?: string;
  photoUrl?: string;
  role: Role | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface VerifyOtpData {
  email?: string;
  phone?: string;
  code: string;
}

export interface ResendOtpData {
  email?: string;
  phone?: string;
}

export interface GoogleLoginData {
  idToken: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    user: User;
    sentTo: string;
  };
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<RegisterResponse>;
  verifyOtp: (data: VerifyOtpData) => Promise<void>;
  resendOtp: (data: ResendOtpData) => Promise<void>;
  googleLogin: (data: GoogleLoginData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setAccessToken: (token: string) => void;
}

export type AuthStore = AuthState & AuthActions;

// Helper function to check if user has specific permission
export const hasPermission = (
  user: User | null,
  permission: string
): boolean => {
  if (!user) return false;
  const role = typeof user.role === "string" ? null : user.role;
  if (!role) return false;
  return role.permissions.includes(permission);
};

// Helper function to check if user has portal access
export const hasPortalAccess = (user: User | null): boolean => {
  if (!user || !user.isActive) return false;
  return true;
};

// Helper function to check if user has any of the given permissions
export const hasAnyPermission = (
  user: User | null,
  permissions: string[]
): boolean => {
  if (!user) return false;
  return permissions.some((permission) => hasPermission(user, permission));
};

// Helper function to check if user has all given permissions
export const hasAllPermissions = (
  user: User | null,
  permissions: string[]
): boolean => {
  if (!user) return false;
  return permissions.every((permission) => hasPermission(user, permission));
};
