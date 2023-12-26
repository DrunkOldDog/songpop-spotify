"use client";

import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect, type ReactNode, useRef } from "react";

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const flag = useRef(false);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      // added to prevent multiple calls on fast refresh and react strict
      if (flag.current) {
        return;
      }

      flag.current = true;

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
