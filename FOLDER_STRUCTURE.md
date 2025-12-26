# Project Folder Structure

This document explains the folder structure and organization of the portal application.

## Directory Overview

```
nextjs-portal-boilerplate/
├── app/                          # Next.js App Router
│   ├── login/                    # Login page route
│   │   └── page.tsx             # Login page component
│   ├── unauthorized/             # Unauthorized access page
│   │   └── page.tsx             # Unauthorized page component
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (protected)
│   └── globals.css              # Global styles with theme
│
├── components/                   # Reusable components
│   ├── forms/                   # Form-related components
│   │   ├── TextFieldWithLabel.tsx  # Reusable text input with label
│   │   └── LoginForm.tsx        # Login form component
│   └── ui/                      # UI components
│       └── PrimaryButton.tsx    # Reusable button component
│
├── lib/                         # Utility functions and helpers
│   ├── auth/                    # Authentication utilities
│   │   └── withAuth.tsx        # HOC for route protection
│   └── utils.ts                # Shared utility functions
│
├── stores/                      # State management
│   └── authStore.ts            # Zustand auth store
│
└── types/                       # TypeScript type definitions
    └── auth.ts                 # Auth-related types
```

## Detailed Breakdown

### `/app` - Application Routes
- **`layout.tsx`**: Root layout with fonts and metadata
- **`page.tsx`**: Protected home page, requires authentication and portal access
- **`login/page.tsx`**: Public login page
- **`unauthorized/page.tsx`**: Page shown when user lacks permissions
- **`globals.css`**: Theme configuration with primary, secondary, tertiary colors

### `/components` - Reusable Components

#### `/components/forms`
Form components that can be used throughout the application:

- **`TextFieldWithLabel.tsx`**:
  - Centralized text input component with label
  - Built-in show/hide password functionality
  - Error and helper text support
  - Accessibility features (aria-labels, proper focus states)
  - Supports types: text, email, password, number, tel, url

- **`LoginForm.tsx`**:
  - Complete login form with validation
  - Integrates with auth store
  - Error handling and loading states

#### `/components/ui`
UI components for consistent design:

- **`PrimaryButton.tsx`**:
  - Main button component with multiple variants
  - Variants: primary, secondary, tertiary, outline, ghost, destructive
  - Sizes: sm, md, lg, xl, icon
  - Loading state support
  - Icon support (left/right)

### `/lib` - Libraries and Utilities

#### `/lib/auth`
- **`withAuth.tsx`**:
  - Higher-Order Component for route protection
  - Checks authentication status
  - Validates portal access permission
  - Redirects unauthorized users

#### `/lib/utils.ts`
- Shared utility functions (e.g., `cn` for className merging)

### `/stores` - State Management
- **`authStore.ts`**:
  - Zustand store for authentication state
  - Handles login/logout
  - Persists auth state to localStorage
  - Helper functions for permission checking

### `/types` - TypeScript Types
- **`auth.ts`**:
  - Type definitions for User, LoginCredentials, AuthState
  - Permission enum
  - Ensures type safety across the app

## Color Theme

The application uses a modern color scheme with three main colors:

- **Primary**: Blue-violet (`oklch(0.52 0.24 265)`)
- **Secondary**: Purple (`oklch(0.62 0.22 285)`)
- **Tertiary**: Light blue (`oklch(0.72 0.18 245)`)

These colors are defined in `globals.css` and can be easily modified centrally.

## Authentication Flow

1. User visits protected route (e.g., `/`)
2. `withAuth` HOC checks authentication
3. If not authenticated → redirect to `/login`
4. User logs in via `LoginForm`
5. Auth state saved in `authStore`
6. If authenticated but lacks portal access → redirect to `/unauthorized`
7. If authenticated with portal access → access granted

## Best Practices

1. **Reusability**: Use `TextFieldWithLabel` and `PrimaryButton` throughout the app
2. **Central Theming**: Modify colors in `globals.css` for app-wide changes
3. **Type Safety**: Import types from `/types` directory
4. **State Management**: Use `authStore` for all auth-related state
5. **Route Protection**: Wrap protected pages with `withAuth` HOC

## Adding New Components

### New Form Fields
Create in `/components/forms` following the pattern of `TextFieldWithLabel.tsx`:
- Accept standard HTML input props
- Include error and helper text support
- Use theme colors
- Export TypeScript interface

### New UI Components
Create in `/components/ui` following the pattern of `PrimaryButton.tsx`:
- Use `class-variance-authority` for variants
- Include loading states if applicable
- Support different sizes
- Use theme colors

### New Protected Routes
1. Create route in `/app`
2. Wrap component with `withAuth` HOC
3. Specify required permissions

## Demo Credentials

- **Email**: admin@example.com
- **Password**: admin123

This user has both `portal_access` and `admin_access` permissions.
