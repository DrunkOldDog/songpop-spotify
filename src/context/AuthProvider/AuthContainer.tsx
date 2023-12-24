'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

interface AuthContainerProps {
  children?: ReactNode;
}

const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
};

export default AuthContainer;
