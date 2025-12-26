export interface Permission {
  key: string;
  maskIndex: number;
  description: string;
  category: string;
}

export const PERMISSIONS: Permission[] = [
  // USER MANAGEMENT (0-8)
  {
    key: "users.read",
    maskIndex: 0,
    description: "View user information and list users",
    category: "User Management",
  },
  {
    key: "users.create",
    maskIndex: 1,
    description: "Create new users",
    category: "User Management",
  },
  {
    key: "users.update",
    maskIndex: 2,
    description: "Update existing user information",
    category: "User Management",
  },
  {
    key: "users.delete",
    maskIndex: 3,
    description: "Delete users from the system",
    category: "User Management",
  },
  {
    key: "users.manage",
    maskIndex: 4,
    description: "Full user management access",
    category: "User Management",
  },
  {
    key: "users.activate",
    maskIndex: 5,
    description: "Activate or deactivate user accounts",
    category: "User Management",
  },
  {
    key: "users.verify",
    maskIndex: 6,
    description: "Manually verify user email or phone",
    category: "User Management",
  },
  {
    key: "users.profile.read",
    maskIndex: 7,
    description: "View own profile information",
    category: "User Management",
  },
  {
    key: "users.profile.update",
    maskIndex: 8,
    description: "Update own profile information",
    category: "User Management",
  },

  // ROLE MANAGEMENT (20-26)
  {
    key: "roles.read",
    maskIndex: 20,
    description: "View roles and their permissions",
    category: "Role Management",
  },
  {
    key: "roles.create",
    maskIndex: 21,
    description: "Create new roles",
    category: "Role Management",
  },
  {
    key: "roles.update",
    maskIndex: 22,
    description: "Update existing roles",
    category: "Role Management",
  },
  {
    key: "roles.delete",
    maskIndex: 23,
    description: "Delete roles from the system",
    category: "Role Management",
  },
  {
    key: "roles.manage",
    maskIndex: 24,
    description: "Full role management access",
    category: "Role Management",
  },
  {
    key: "roles.permissions.update",
    maskIndex: 25,
    description: "Update permissions for a role",
    category: "Role Management",
  },
  {
    key: "roles.assign",
    maskIndex: 26,
    description: "Assign roles to users",
    category: "Role Management",
  },

  // AUTHENTICATION (40-49)
  {
    key: "auth.register",
    maskIndex: 40,
    description: "Register new user accounts",
    category: "Authentication",
  },
  {
    key: "auth.login",
    maskIndex: 41,
    description: "Login to the system",
    category: "Authentication",
  },
  {
    key: "auth.logout",
    maskIndex: 42,
    description: "Logout from the system",
    category: "Authentication",
  },
  {
    key: "auth.refresh.token",
    maskIndex: 43,
    description: "Refresh authentication tokens",
    category: "Authentication",
  },
  {
    key: "auth.password.reset",
    maskIndex: 44,
    description: "Reset user passwords",
    category: "Authentication",
  },
  {
    key: "auth.password.change",
    maskIndex: 45,
    description: "Change own password",
    category: "Authentication",
  },
  {
    key: "auth.otp.verify",
    maskIndex: 46,
    description: "Verify OTP codes",
    category: "Authentication",
  },
  {
    key: "auth.otp.resend",
    maskIndex: 47,
    description: "Resend OTP codes",
    category: "Authentication",
  },
  {
    key: "auth.google.login",
    maskIndex: 48,
    description: "Login with Google account",
    category: "Authentication",
  },
  {
    key: "auth.social.login",
    maskIndex: 49,
    description: "Login with any social provider",
    category: "Authentication",
  },

  // SYSTEM (100-105)
  {
    key: "system.health.check",
    maskIndex: 100,
    description: "Check system health status",
    category: "System",
  },
  {
    key: "system.settings.read",
    maskIndex: 101,
    description: "View system settings",
    category: "System",
  },
  {
    key: "system.settings.update",
    maskIndex: 102,
    description: "Update system settings",
    category: "System",
  },
  {
    key: "system.logs.read",
    maskIndex: 103,
    description: "View system logs",
    category: "System",
  },
  {
    key: "system.cleanup.run",
    maskIndex: 104,
    description: "Manually run cleanup jobs",
    category: "System",
  },
  {
    key: "system.admin",
    maskIndex: 105,
    description: "Full system administration access",
    category: "System",
  },
];

// Get all permission keys
export const getAllPermissionKeys = (): string[] => {
  return PERMISSIONS.map((p) => p.key);
};

// Get permission by key
export const getPermissionByKey = (
  key: string
): Permission | undefined => {
  return PERMISSIONS.find((p) => p.key === key);
};

// Get permissions by category
export const getPermissionsByCategory = (
  category: string
): Permission[] => {
  return PERMISSIONS.filter((p) => p.category === category);
};

// Get all categories
export const getPermissionCategories = (): string[] => {
  return Array.from(new Set(PERMISSIONS.map((p) => p.category)));
};

// Check if user has system admin permission
export const isSystemAdmin = (permissions: string[]): boolean => {
  return permissions.includes("system.admin");
};

// Default permission sets
export const DEFAULT_USER_PERMISSIONS = [
  "users.profile.read",
  "users.profile.update",
  "auth.login",
  "auth.logout",
  "auth.password.change",
  "auth.refresh.token",
];

export const DEFAULT_ADMIN_PERMISSIONS = getAllPermissionKeys();
