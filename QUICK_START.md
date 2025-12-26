# Quick Start Guide

## Prerequisites

- Node.js installed
- MongoDB running (for backend)
- Both projects cloned:
  - Backend: `/Users/nerddevs/Documents/Faysal/nestjs-boilerplate`
  - Frontend: `/Users/nerddevs/Documents/Faysal/nextjs-portal-boilerplate`

## 1. Start Backend Server

```bash
cd /Users/nerddevs/Documents/Faysal/nestjs-boilerplate
npm install  # If not done already
npm run dev
```

Backend will run on: `http://localhost:8000`

## 2. Start Frontend Portal

```bash
cd /Users/nerddevs/Documents/Faysal/nextjs-portal-boilerplate
npm install  # If not done already
npm run dev
```

Portal will run on: `http://localhost:4000`

## 3. Login

Visit `http://localhost:4000` and you'll be redirected to login page.

### Test Credentials

Use any user from your backend database that has:
- `isActive: true`
- Valid email and password

## Project Structure

### Frontend (Next.js Portal)

```
├── app/                    # Pages
│   ├── login/             # Login page
│   ├── unauthorized/      # Access denied page
│   └── page.tsx          # Protected home page
├── components/
│   ├── forms/            # Form components
│   │   ├── TextFieldWithLabel.tsx
│   │   └── LoginForm.tsx
│   └── ui/               # UI components
│       └── PrimaryButton.tsx
├── lib/
│   ├── api/              # API client
│   │   ├── client.ts
│   │   └── auth.ts
│   └── auth/
│       └── withAuth.tsx  # Route protection
├── stores/
│   └── authStore.ts      # Auth state (Zustand)
├── types/
│   └── auth.ts           # TypeScript types
└── .env.local            # Environment config
```

### Backend (NestJS)

Already configured with:
- MongoDB database
- JWT authentication
- Role-based permissions
- OTP verification
- Google login support

## Key Features

### 1. Reusable Components

- **TextFieldWithLabel**: Input with label, validation, show/hide password
- **PrimaryButton**: Button with variants (primary, secondary, tertiary, outline, ghost, destructive)

### 2. Authentication

- Email/password login
- JWT token storage
- Auto-redirect on auth status
- Protected routes with HOC

### 3. Permission System

```typescript
import { hasPermission, hasPortalAccess } from "@/types/auth";

// Check portal access
hasPortalAccess(user);

// Check specific permission
hasPermission(user, "users.read");
```

### 4. Theme Colors

Defined in `app/globals.css`:
- **Primary**: Blue-violet
- **Secondary**: Purple
- **Tertiary**: Light blue

Modify these for app-wide color changes.

## API Endpoints

All endpoints use base URL: `http://localhost:8000/api/v1`

### Auth Endpoints

- `POST /auth/login` - Email/password login
- `POST /auth/register` - Register new user
- `POST /auth/verify-otp` - Verify OTP code
- `POST /auth/resend-otp` - Resend OTP
- `POST /auth/google-login` - Google OAuth login
- `GET /auth/me` - Get current user (with token)

## Common Tasks

### Add Protected Route

```typescript
// app/admin/page.tsx
import { withAuth } from "@/lib/auth/withAuth";

function AdminPage() {
  return <div>Admin Dashboard</div>;
}

export default withAuth(AdminPage, { requirePortalAccess: true });
```

### Check Permissions in Component

```typescript
import { useAuthStore } from "@/stores/authStore";
import { hasPermission } from "@/types/auth";

function UserManagement() {
  const { user } = useAuthStore();

  if (!hasPermission(user, "users.manage")) {
    return <div>Access Denied</div>;
  }

  return <div>User Management</div>;
}
```

### Use Form Components

```typescript
import TextFieldWithLabel from "@/components/forms/TextFieldWithLabel";
import PrimaryButton from "@/components/ui/PrimaryButton";

function MyForm() {
  const [email, setEmail] = useState("");

  return (
    <form>
      <TextFieldWithLabel
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PrimaryButton type="submit" variant="primary" fullWidth>
        Submit
      </PrimaryButton>
    </form>
  );
}
```

## Troubleshooting

### Can't login?

1. Check backend is running on port 8000
2. Check MongoDB is connected
3. Verify user exists in database with `isActive: true`
4. Check browser console for errors

### CORS errors?

Backend already has CORS enabled for all origins in development. If you see CORS errors:
1. Restart backend server
2. Clear browser cache
3. Check backend console for errors

### Permission errors?

1. Verify user has a role assigned
2. Check role has permissions array
3. Use `hasPermission()` helper to debug

## Documentation

- [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) - Complete folder structure and component docs
- [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) - Detailed integration guide
- Backend API Docs: `http://localhost:8000/api/docs` (Swagger)

## Next Steps

1. Create user in your backend database
2. Test login flow
3. Explore permission system
4. Add new protected routes
5. Customize theme colors
6. Build your admin dashboard!

---

**Need help?** Check the detailed guides or backend API documentation.
