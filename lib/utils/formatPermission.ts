/**
 * Format permission key for display
 *
 * Transforms permission keys from backend format to user-friendly display format.
 *
 * Examples:
 * - "roles.read" → "Read Roles"
 * - "roles.permissions.update" → "Roles Permissions Update"
 * - "users.profile.read" → "Users Profile Read"
 * - "system.health.check" → "System Health Check"
 *
 * @param permission - Permission key in dot notation (e.g., "roles.read")
 * @returns Formatted permission string for display
 */
export function formatPermission(permission: string): string {
  if (!permission) return "";

  const parts = permission.split(".");

  if (parts.length === 0) return permission;

  // List of common action verbs that should be moved to the front
  const actionVerbs = [
    "read",
    "create",
    "update",
    "delete",
    "manage",
    "assign",
    "activate",
    "verify",
    "register",
    "login",
    "logout",
    "reset",
    "change",
    "resend",
    "check",
    "run",
  ];

  const lastPart = parts[parts.length - 1].toLowerCase();
  const isAction = actionVerbs.includes(lastPart);

  let formatted: string[];

  // Only move to front if it's a 2-part permission and last part is an action
  // e.g., "roles.read" → ["read", "roles"]
  // But "roles.permissions.update" → stays as ["roles", "permissions", "update"]
  if (isAction && parts.length === 2) {
    const action = parts.pop()!;
    formatted = [action, ...parts];
  } else {
    // Keep original order for multi-part permissions
    formatted = parts;
  }

  // Capitalize each word and join with spaces
  return formatted
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Formats permission with emojis based on action type
 */
export function formatPermissionWithIcon(permission: string): string {
  const formatted = formatPermission(permission);
  const lower = permission.toLowerCase();

  // Add icons based on action
  if (lower.includes("read") || lower.includes("check")) {
    return `👁️ ${formatted}`;
  } else if (lower.includes("create") || lower.includes("register")) {
    return `➕ ${formatted}`;
  } else if (lower.includes("update") || lower.includes("change")) {
    return `✏️ ${formatted}`;
  } else if (lower.includes("delete")) {
    return `🗑️ ${formatted}`;
  } else if (lower.includes("manage") || lower.includes("admin")) {
    return `⚙️ ${formatted}`;
  } else if (lower.includes("login") || lower.includes("logout")) {
    return `🔐 ${formatted}`;
  } else if (lower.includes("verify") || lower.includes("activate")) {
    return `✅ ${formatted}`;
  }

  return formatted;
}
