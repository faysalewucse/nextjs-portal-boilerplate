"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import UserMenu from "@/components/ui/UserMenu";
import MenuToggle from "@/components/ui/MenuToggle";
import { useAuthStore } from "@/stores/authStore";
import { useSidebar } from "@/lib/contexts/SidebarContext";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title = "Dashboard" }) => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { isCollapsed } = useSidebar();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          isCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <MenuToggle />
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            </div>
            {user && <UserMenu user={user} onLogout={handleLogout} />}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
