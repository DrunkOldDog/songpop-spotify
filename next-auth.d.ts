import type { DefaultSession } from "next-auth";

interface IJWT {
  accessToken: string;
  refreshToken: string;
  /**
   * Access token expiration time
   */
  exp: number;
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
