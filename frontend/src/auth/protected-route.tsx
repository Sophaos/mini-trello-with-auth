import { getAccessToken } from "@/apollo/links";
import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setHasAccessToken(!!token);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!hasAccessToken) {
    return <Navigate to="/login" />;
  }

  return children;
};
