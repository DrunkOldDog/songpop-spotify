/* eslint-disable unused-imports/no-unused-vars */
import type { DefaultSession } from 'next-auth';

type JWTError = 'RefreshAccessTokenError';

interface CustomJWT {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  /**
   * Access token expiration time
   */
  expiresAt: number | undefined;
  error?: JWTError;
}

declare module 'next-auth' {
  interface User {
    userId: string;
  }

  interface Session extends DefaultSession {
    user?: User;
    error?: JWTError;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends CustomJWT {}
}
