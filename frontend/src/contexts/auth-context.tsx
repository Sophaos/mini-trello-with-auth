// src/features/auth/auth-provider.tsx
import { LOGIN_MUTATION, SIGN_UP_MUTATION } from "@/graphql/auth/auth-mutations";
import { ME_QUERY } from "@/graphql/auth/auth-queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./auth-provider";
import { setAccessToken } from "@/apollo/links";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { loading, refetch } = useQuery<{ me: User }>(ME_QUERY, {
    onCompleted: (data) => setUser(data.me),
    onError: () => setUser(null),
  });

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signUpMutation] = useMutation(SIGN_UP_MUTATION);

  useEffect(() => {
    refetch(); // ME_QUERY — triggers refresh if needed
  }, [refetch]);

  const signIn = async (email: string, password: string) => {
    const { data } = await loginMutation({
      variables: { data: { email, password } },
    });
    if (data?.login) {
      setAccessToken(data.login.accessToken);
      setUser(data.login.user);
    }
  };

  const signUp = async (email: string, password: string) => {
    const { data } = await signUpMutation({
      variables: { data: { email, password } },
    });
    if (data?.signUp) {
      await signIn(email, password);
    }
  };

  const logout = async () => {
    await fetch("/graphql", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: `mutation { logout }` }),
    });
    setAccessToken(null);
    setUser(null);
    await refetch();
  };

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, logout, refetch }}>{children}</AuthContext.Provider>;
};
