# NestJS Backend Integration Guide

This guide explains how the Next.js portal integrates with your NestJS backend.

## Overview

The portal is now fully integrated with your NestJS backend located at `/Users/nerddevs/Documents/Faysal/nestjs-boilerplate`. All authentication and user management is handled through your backend API.

## Setup Instructions

### 1. Environment Configuration

The portal uses environment variables to connect to your backend. Make sure `.env.local` is configured:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME=Portal
NEXT_PUBLIC_APP_URL=http://localhost:4000
```

**Important**:
- Your NestJS backend runs on port `8000` (as configured in your backend .env)
- The Next.js portal runs on port `4000` (as configured in package.json)

### 2. Start Your Backend

First, ensure your NestJS backend is running:

```bash
cd /Users/nerddevs/Documents/Faysal/nestjs-boilerplate
npm run dev
```

The backend should be accessible at `http://localhost:8000/api/v1`

### 3. Start the Portal

Then start the Next.js portal:

```bash
cd /Users/nerddevs/Documents/Faysal/nextjs-portal-boilerplate
npm run dev
```

The portal will run on port 4000.

## Integration Architecture

### API Client

The portal uses a custom API client (`lib/api/client.ts`) that:
- Automatically adds the API base URL to all requests
- Handles authentication tokens via `Authorization: Bearer <token>` header
- Provides centralized error handling
- Returns typed responses

### Authentication Flow

1. **Login**:
   - User enters email/password
   - Portal sends `POST /auth/login` to backend
   - Backend returns user object and JWT access token
   - Token is stored in Zustand store and persisted to localStorage

2. **Token Storage**:
   - Access token is stored in the auth store
   - Automatically included in all API requests
   - Persisted across browser sessions

3. **Route Protection**:
   - Protected routes use `withAuth` HOC
   - Checks if user is authenticated and active
   - Redirects to `/login` if not authenticated
   - Redirects to `/unauthorized` if user lacks required permissions

4. **Token Validation**:
   - `checkAuth()` function validates token on app load
   - Calls `GET /auth/me` endpoint with token
   - Updates user data if valid, clears auth if invalid

## API Endpoints Used

### Authentication Endpoints

All endpoints are prefixed with `/api/v1/auth/`

#### Login
```typescript
POST /auth/login
Request: { email: string, password: string }
Response: {
  status: "success",
  message: "Login successful",
  data: {
    user: User,
    accessToken: string
  }
}
```

#### Register (Optional - for future use)
```typescript
POST /auth/register
Request: { name: string, email: string, password: string, phone?: string }
Response: {
  status: "success",
  message: "User registered successfully. Please verify your OTP.",
  data: {
    user: User,
    sentTo: string
  }
}
```

#### Verify OTP (Optional - for future use)
```typescript
POST /auth/verify-otp
Request: { email?: string, phone?: string, code: string }
Response: {
  status: "success",
  message: "OTP verified successfully. Account activated.",
  data: {
    user: User,
    accessToken: string
  }
}
```

#### Get Current User (for token validation)
```typescript
GET /auth/me
Headers: { Authorization: "Bearer <token>" }
Response: {
  status: "success",
  data: {
    user: User
  }
}
```

## User & Role Structure

### User Object
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  authProvider: "local" | "google" | "facebook" | "apple";
  photoUrl?: string;
  role: Role | string;
  createdAt?: string;
  updatedAt?: string;
}
```

### Role Object
```typescript
interface Role {
  _id: string;
  name: string;
  permissions: string[];  // e.g., ["users.read", "users.create", "roles.manage"]
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

**Note**: Permissions use dot notation (e.g., `users.read`) not colon notation.

## Permission System

The portal includes helper functions for permission checking:

```typescript
import { hasPermission, hasPortalAccess, hasAnyPermission, hasAllPermissions } from "@/types/auth";

// Check if user has portal access (is active)
if (hasPortalAccess(user)) {
  // User can access the portal
}

// Check specific permission
if (hasPermission(user, "users.create")) {
  // User can create users
}

// Check if user has any of the given permissions
if (hasAnyPermission(user, ["users.read", "users.create"])) {
  // User has at least one permission
}

// Check if user has all given permissions
if (hasAllPermissions(user, ["users.read", "users.create"])) {
  // User has all permissions
}
```

## State Management

### Auth Store (Zustand)

The auth store (`stores/authStore.ts`) provides:

```typescript
// State
{
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Actions
{
  login(credentials: LoginCredentials): Promise<void>;
  register(credentials: RegisterCredentials): Promise<RegisterResponse>;
  verifyOtp(data: VerifyOtpData): Promise<void>;
  resendOtp(data: ResendOtpData): Promise<void>;
  googleLogin(data: GoogleLoginData): Promise<void>;
  logout(): void;
  checkAuth(): Promise<void>;
  clearError(): void;
  setAccessToken(token: string): void;
}
```

### Usage Example

```typescript
import { useAuthStore } from "@/stores/authStore";

function MyComponent() {
  const { user, login, logout, isLoading, error } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login({ email: "user@example.com", password: "password" });
      // Login successful
    } catch (error) {
      // Error is already set in store
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Error Handling

The API client provides structured error handling:

```typescript
try {
  await login(credentials);
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.status);   // HTTP status code
    console.log(error.message);  // Error message
    console.log(error.data);     // Additional error data
  }
}
```

Common error statuses:
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid credentials or token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## CORS Configuration

Ensure your NestJS backend has CORS enabled for the portal URL:

```typescript
// In your NestJS main.ts
app.enableCors({
  origin: 'http://localhost:4000', // Next.js portal URL
  credentials: true,
});
```

Or for development, allow all origins (your backend already has this configured):

```typescript
app.enableCors({
  origin: true,
  credentials: true,
});
```

## Testing the Integration

### 1. Test Login

1. Ensure your NestJS backend is running on port 8000
2. Visit `http://localhost:4000/login`
3. Enter credentials for a user in your database (or use demo credentials if configured)
4. Click "Sign In"
5. If successful, you'll be redirected to the home page

### 2. Test Protected Routes

1. Try accessing `http://localhost:4000` without logging in
2. You should be redirected to `/login`
3. After logging in, you should see the home page with user info

### 3. Test Logout

1. Click the "Logout" button in the header
2. You should be redirected to `/login`
3. Auth state should be cleared

### 4. Test Permission Checks

1. Login with a user that has specific permissions
2. The home page displays all permissions from the user's role
3. Use permission helpers to control UI elements

## Production Deployment

### Environment Variables

Update `.env.production`:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
NEXT_PUBLIC_APP_NAME=Portal
NEXT_PUBLIC_APP_URL=https://your-portal-domain.com
```

### Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Token Storage**: Consider using HttpOnly cookies instead of localStorage for token storage
3. **Token Expiration**: Implement token refresh logic
4. **CORS**: Restrict CORS to specific origins in production
5. **Rate Limiting**: Implement rate limiting on your backend
6. **Input Validation**: Both frontend and backend should validate inputs

## Troubleshooting

### Connection Refused
- Check if backend is running on port 8000
- Verify `NEXT_PUBLIC_API_URL` is set to `http://localhost:8000/api/v1`
- Check CORS configuration
- Verify MongoDB connection in your backend

### 401 Unauthorized
- Token may be expired or invalid
- Check if `Authorization` header is being sent
- Verify JWT secret matches between backend and portal

### Role/Permissions Not Showing
- Ensure backend populates the `role` field in user response
- Check if role includes permissions array
- Verify user is active (`isActive: true`)

### Login Not Working
- Check browser console for errors
- Verify backend `/auth/login` endpoint is working
- Check if credentials are correct
- Ensure backend returns proper response format

## Future Enhancements

Consider implementing:

1. **Token Refresh**: Auto-refresh tokens before expiration
2. **Remember Me**: Extend session duration
3. **Two-Factor Authentication**: Add 2FA support
4. **Social Login**: Implement Google/Facebook login UI
5. **Password Reset**: Add password reset flow
6. **Email Verification**: Add email verification UI
7. **Profile Management**: Allow users to update their profile
8. **Role Management**: Admin UI for managing roles and permissions

## Support

For issues or questions:
1. Check the [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for component documentation
2. Review the NestJS backend API documentation at `/api/docs`
3. Check backend logs for API errors
4. Check browser console for frontend errors
