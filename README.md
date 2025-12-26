# Next.js Portal Boilerplate

A modern, production-ready portal application built with Next.js 16, integrated with a NestJS backend for authentication and user management.

## Features

- **Modern Authentication**: Full integration with NestJS backend
- **Role-Based Access Control**: Permission-based UI rendering
- **Reusable Components**: Centralized form fields and buttons
- **Type-Safe**: Full TypeScript support
- **State Management**: Zustand with persistence
- **Modern UI**: Tailwind CSS with custom theme colors
- **Protected Routes**: HOC-based route protection
- **Responsive Design**: Mobile-first approach

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Form Handling**: React Hook Form (ready to integrate)
- **API Client**: Custom fetch-based client

## Project Structure

```
nextjs-portal-boilerplate/
├── app/                      # Next.js app router
│   ├── login/               # Login page
│   ├── unauthorized/        # Unauthorized access page
│   ├── page.tsx            # Protected home page
│   └── layout.tsx          # Root layout
├── components/              # Reusable components
│   ├── forms/              # Form components
│   │   ├── TextFieldWithLabel.tsx
│   │   └── LoginForm.tsx
│   └── ui/                 # UI components
│       └── PrimaryButton.tsx
├── lib/                    # Utilities and libraries
│   ├── api/               # API client
│   │   ├── client.ts     # Base API client
│   │   └── auth.ts       # Auth API endpoints
│   ├── auth/             # Auth utilities
│   │   └── withAuth.tsx  # Route protection HOC
│   └── utils.ts          # Shared utilities
├── stores/                # Zustand stores
│   └── authStore.ts      # Authentication store
└── types/                # TypeScript types
    └── auth.ts          # Auth-related types
```

See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for detailed documentation.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Running NestJS backend (see Integration section)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-portal-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME=Portal
NEXT_PUBLIC_APP_URL=http://localhost:4000
```

4. Start the development server:
```bash
npm run dev
```

The portal will be available at `http://localhost:4000`

## Backend Integration

This portal integrates with the NestJS backend located at:
```
/Users/nerddevs/Documents/Faysal/nestjs-boilerplate
```

### Setup Backend

1. Start your NestJS backend:
```bash
cd /Users/nerddevs/Documents/Faysal/nestjs-boilerplate
npm run dev
```

2. Ensure backend is running on `http://localhost:8000`

3. Verify CORS is enabled for `http://localhost:4000`

See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for complete integration documentation.

## Key Components

### TextFieldWithLabel

Reusable text input with label, validation, and password toggle:

```tsx
import TextFieldWithLabel from "@/components/forms/TextFieldWithLabel";

<TextFieldWithLabel
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

Features:
- Label with required indicator
- Show/hide password toggle
- Error and helper text
- Accessibility support
- Full TypeScript support

### PrimaryButton

Versatile button component with multiple variants:

```tsx
import PrimaryButton from "@/components/ui/PrimaryButton";

<PrimaryButton
  variant="primary"
  size="md"
  loading={isLoading}
  leftIcon={<Icon />}
  onClick={handleClick}
>
  Click Me
</PrimaryButton>
```

Variants:
- `primary` - Main action button
- `secondary` - Secondary actions
- `tertiary` - Tertiary actions
- `outline` - Outlined button
- `ghost` - Minimal button
- `destructive` - Dangerous actions

Sizes: `sm`, `md`, `lg`, `xl`, `icon`

### Route Protection

Protect routes with the `withAuth` HOC:

```tsx
import { withAuth } from "@/lib/auth/withAuth";

function ProtectedPage() {
  return <div>Protected Content</div>;
}

export default withAuth(ProtectedPage, {
  requirePortalAccess: true,
  redirectTo: "/login"
});
```

## Authentication Flow

1. User visits protected route
2. `withAuth` checks authentication
3. Redirects to `/login` if not authenticated
4. User logs in with credentials
5. Token stored in Zustand + localStorage
6. User redirected to requested page
7. Subsequent requests include token in header

## Theme Colors

The application uses three main colors defined in `globals.css`:

- **Primary**: Blue-violet for main actions
- **Secondary**: Purple for secondary actions
- **Tertiary**: Light blue for tertiary actions

Modify these in `app/globals.css` to change the entire theme.

## State Management

### Auth Store

```tsx
import { useAuthStore } from "@/stores/authStore";

function Component() {
  const { user, login, logout, isLoading } = useAuthStore();

  const handleLogin = async () => {
    await login({ email, password });
  };

  return (
    <div>
      {user ? `Hello ${user.name}` : "Not logged in"}
    </div>
  );
}
```

## Permission Checks

```tsx
import { hasPermission, hasAnyPermission } from "@/types/auth";

// Check single permission
if (hasPermission(user, "users.create")) {
  // Show create user button
}

// Check multiple permissions
if (hasAnyPermission(user, ["users.read", "users.create"])) {
  // Show users section
}
```

## API Client

```tsx
import { apiClient } from "@/lib/api/client";

// GET request
const data = await apiClient.get("/endpoint");

// POST request with auth
const response = await apiClient.post(
  "/endpoint",
  { data },
  { token: accessToken }
);
```

## Scripts

- `npm run dev` - Start development server on port 4000
- `npm run dev:auto` - Start development server (auto port)
- `npm run build` - Build for production
- `npm run start` - Start production server on port 4000
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Portal` |
| `NEXT_PUBLIC_APP_URL` | Portal URL | `http://localhost:4000` |

## Building for Production

1. Update environment variables for production
2. Build the application:
```bash
npm run build
```

3. Start production server:
```bash
npm run start
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
```

## Security Considerations

- Tokens stored in localStorage (consider HttpOnly cookies for production)
- All API requests use HTTPS in production
- CORS properly configured
- Input validation on both client and server
- XSS protection via React
- CSRF protection recommended for mutations

## Troubleshooting

### Backend Connection Issues
- Verify backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in `.env.local` (should be `http://localhost:8000/api/v1`)
- Verify CORS is enabled in backend

### Login Not Working
- Check browser console for errors
- Verify backend `/auth/login` endpoint
- Ensure proper credentials
- Check network tab for API response

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

## Documentation

- [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) - Detailed folder structure
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Backend integration guide

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions, please check the documentation or create an issue.
