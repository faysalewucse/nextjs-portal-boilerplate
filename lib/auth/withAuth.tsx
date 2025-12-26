"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, hasPortalAccess } from "@/stores/authStore";

export interface WithAuthOptions {
  requirePortalAccess?: boolean;
  redirectTo?: string;
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { requirePortalAccess = true, redirectTo = "/login" } = options;

  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const { isAuthenticated, user, isLoading } = useAuthStore();

    useEffect(() => {
      if (isLoading) return;

      if (!isAuthenticated || !user) {
        router.replace(redirectTo);
        return;
      }

      if (requirePortalAccess && !hasPortalAccess(user)) {
        router.replace("/unauthorized");
        return;
      }
    }, [isAuthenticated, user, isLoading, router]);

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated || !user) {
      return null;
    }

    if (requirePortalAccess && !hasPortalAccess(user)) {
      return null;
    }

    return <Component {...props} />;
  };
}
