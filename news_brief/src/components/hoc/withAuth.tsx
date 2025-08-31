import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) router.replace("/auth/login");
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null; 
    return <Component {...props} />;
  };
};

export default withAuth;
