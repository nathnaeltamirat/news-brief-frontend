import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, ComponentType } from "react";

export const withAuth = <P extends object>(
  Component: ComponentType<P>,
  adminOnly = false
) => {
  const AuthWrapper = (props: P) => {
    const { isAuthenticated, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) router.replace("/auth/login");
      else if (adminOnly && !isAdmin) router.replace("/unauthorized");
    }, [isAuthenticated, isAdmin, router]);

    if (!isAuthenticated || (adminOnly && !isAdmin)) return null;
    return <Component {...props} />;
  };

  AuthWrapper.displayName = `withAuth(${
    Component.displayName || Component.name || "Component"
  })`;
  return AuthWrapper;
};
