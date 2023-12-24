"use client";

import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect, type ReactNode } from "react";

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      // have to run each on app initialization to call jwt callback and validate refreshToken
      await getSession();
    })();
  }, []);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.error("RefreshAccessTokenError: Forcing sign in...");
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return children;
};
