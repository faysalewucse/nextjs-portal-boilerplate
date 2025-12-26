"use client";

import { withAuth } from "@/lib/auth/withAuth";
import { useAuthStore } from "@/stores/authStore";
import MainLayout from "@/components/layouts/MainLayout";
import { User } from "lucide-react";

function HomePage() {
  const { user } = useAuthStore();
  const userRole = typeof user?.role === "string" ? null : user?.role;

  return (
    <MainLayout title="Dashboard">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-sm text-muted-foreground">
            Here's what's happening with your portal today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Revenue Card */}
          <div className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-primary/5 via-card to-card p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Revenue
                </p>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-lg">💰</span>
                </div>
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                $45,231
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-green-600">↑ 20.1%</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-secondary/5 via-card to-card p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Orders
                </p>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <span className="text-lg">📦</span>
                </div>
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                1,429
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-green-600">↑ 15.3%</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>

          {/* Active Customers Card */}
          <div className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-tertiary/5 via-card to-card p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-tertiary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Active Customers
                </p>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-tertiary/20 to-tertiary/5 flex items-center justify-center">
                  <User className="h-4 w-4 text-tertiary" />
                </div>
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-tertiary to-tertiary/70 bg-clip-text text-transparent">
                892
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-green-600">↑ 12.5%</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          </div>

          {/* Pending Orders Card */}
          <div className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-orange-500/5 via-card to-card p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pending Orders
                </p>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                  </div>
                </div>
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-500/70 bg-clip-text text-transparent">
                48
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-orange-600">Needs attention</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Avg Order Value */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Order Value</p>
                <p className="text-xl font-bold mt-1">$31.65</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <p className="text-xl font-bold mt-1">3.24%</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <span className="text-xl">📈</span>
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Products</p>
                <p className="text-xl font-bold mt-1">2,456</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <span className="text-xl">🏷️</span>
              </div>
            </div>
          </div>

          {/* Your Role */}
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Your Role</p>
                <p className="text-xl font-bold mt-1 capitalize">{userRole?.name || "N/A"}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
                <span className="text-xl">🔐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="rounded-lg border border-dashed bg-accent/20 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            This is your protected dashboard. Only authenticated users with
            portal access can view this content.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default withAuth(HomePage, { requirePortalAccess: true });
