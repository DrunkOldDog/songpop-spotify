import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    userId: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}
