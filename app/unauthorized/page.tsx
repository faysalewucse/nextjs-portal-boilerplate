"use client";

import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAuthStore } from "@/stores/authStore";
import { ShieldX, ArrowLeft, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-destructive/5 via-background to-muted/10 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <ShieldX className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Access Denied</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          You don't have permission to access this portal.
        </p>

        <div className="mt-8 rounded-xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Your account does not have the required{" "}
            <span className="font-semibold text-foreground">
              portal access
            </span>{" "}
            permission. Please contact your administrator if you believe this is
            an error.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <PrimaryButton
            variant="outline"
            onClick={() => router.back()}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Go Back
          </PrimaryButton>
          <PrimaryButton
            variant="destructive"
            onClick={handleLogout}
            leftIcon={<LogOut className="h-4 w-4" />}
          >
            Logout
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
