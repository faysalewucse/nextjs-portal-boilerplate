"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { hasPermission } from "@/types/auth";
import { useSidebar } from "@/lib/contexts/SidebarContext";

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
  permission?: string;
  badge?: string | number;
}

interface SidebarProps {
  items?: SidebarItem[];
  onLogout?: () => void;
}

const defaultItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    permission: "users.read",
  },
  {
    label: "Roles",
    href: "/roles",
    icon: Shield,
    permission: "roles.read",
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ items = defaultItems, onLogout }) => {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const { user } = useAuthStore();

  const filteredItems = items.filter((item) => {
    if (item.permission) {
      return hasPermission(user, item.permission);
    }
    return true;
  });

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
          <Image
            src="/site_logo.png"
            alt="Portal Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          {!isCollapsed && (
            <span className="text-xl font-bold text-primary">Portal</span>
          )}
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground",
                isCollapsed && "justify-center px-2"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Logout */}
      {onLogout && (
        <div className="border-t border-border p-4">
          <button
            onClick={onLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              "text-destructive hover:bg-destructive/10",
              isCollapsed && "justify-center px-2"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
