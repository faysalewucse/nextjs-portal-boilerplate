"use client";

import { withAuth } from "@/lib/auth/withAuth";
import { useAuthStore } from "@/stores/authStore";
import MainLayout from "@/components/layouts/MainLayout";
import DashboardInfoCard from "@/components/ui/DashboardInfoCard";
import {
  CurrencyDollar,
  Package,
  Users,
  ClockCounterClockwise,
  CreditCard,
  TrendUp,
  Tag,
  ShieldCheck,
} from "phosphor-react";

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
          <DashboardInfoCard
            title="Total Revenue"
            value="$45,231"
            icon={CurrencyDollar}
            variant="primary"
            trend={{ value: "↑ 20.1%", label: "vs last month", isPositive: true }}
          />

          <DashboardInfoCard
            title="Total Orders"
            value="1,429"
            icon={Package}
            variant="secondary"
            trend={{ value: "↑ 15.3%", label: "vs last month", isPositive: true }}
          />

          <DashboardInfoCard
            title="Active Customers"
            value="892"
            icon={Users}
            variant="tertiary"
            trend={{ value: "↑ 12.5%", label: "vs last month", isPositive: true }}
          />

          <DashboardInfoCard
            title="Pending Orders"
            value="48"
            icon={ClockCounterClockwise}
            variant="warning"
            trend={{ value: "Needs attention", label: "", isPositive: false }}
          />
        </div>

        {/* Secondary Stats Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardInfoCard
            title="Avg Order Value"
            value="$31.65"
            icon={CreditCard}
            variant="info"
          />

          <DashboardInfoCard
            title="Conversion Rate"
            value="3.24%"
            icon={TrendUp}
            variant="success"
          />

          <DashboardInfoCard
            title="Total Products"
            value="2,456"
            icon={Tag}
            variant="primary"
          />

          <DashboardInfoCard
            title="Your Role"
            value={userRole?.name || "N/A"}
            icon={ShieldCheck}
            variant="tertiary"
          />
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
