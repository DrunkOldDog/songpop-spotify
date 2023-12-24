import type { DefaultSession } from "next-auth";

interface IJWT {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  /**
   * Access token expiration time
   */
  expiresAt: number | undefined;
}

declare module "next-auth" {
  interface User {
    userId: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IJWT {}
}
