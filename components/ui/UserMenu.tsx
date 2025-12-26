"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User as UserType } from "@/types/auth";

interface UserMenuProps {
  user: UserType;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userRole = typeof user.role === "string" ? null : user.role;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center rounded-lg p-2 transition-all cursor-pointer border border-border",
          "hover:bg-accent/30 hover:border-primary/50",
          isOpen && "bg-accent/30 border-primary/50"
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border bg-card shadow-lg z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b bg-accent/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
            {userRole && (
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
                <span className="text-xs font-medium text-primary capitalize">
                  {userRole.name}
                </span>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Profile</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </Link>

            <div className="my-1 border-t" />

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
