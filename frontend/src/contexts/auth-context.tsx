import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./auth-provider";
import { setAccessToken } from "@/apollo/links";
import { useLoginMutation, useLogoutMutation, useMeQuery, useSignUpMutation } from "@/gql/graphql";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { loading, refetch } = useMeQuery({
    onCompleted: (data) => setUser(data.me),
    onError: () => setUser(null),
  });

  const [loginMutation] = useLoginMutation();
  const [signUpMutation] = useSignUpMutation(); // { data, loading: signUpLoading, error }
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    refetch();
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
    await logoutMutation();
    setAccessToken(null);
    setUser(null);
    await refetch();
  };

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, logout, refetch }}>{children}</AuthContext.Provider>;
};
