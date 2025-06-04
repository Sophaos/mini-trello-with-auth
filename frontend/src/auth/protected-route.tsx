import { getAccessToken, fetchNewAccessToken } from "@/apollo/links";
import { type ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [hasAccessToken, setHasAccessToken] = useState(false);

  useEffect(() => {
    const tryRestoreSession = async () => {
      let token = getAccessToken();
      if (!token) {
        token = await fetchNewAccessToken(); // refresh using cookie
      }
      setHasAccessToken(!!token);
      setLoading(false);
    };

    tryRestoreSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!hasAccessToken) {
    return <Navigate to="/login" />;
  }

  return children;
};
