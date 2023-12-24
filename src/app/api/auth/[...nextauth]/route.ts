import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { refreshToken } from "./refreshToken";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      if (session) {
        session.user!.userId = token.sub ?? "";
      }

      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          ...token,
          expiresAt: account.expires_at,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
      }

      if (Math.floor(Date.now() / 1000) < (token.expiresAt as number)) {
        // If the access token has not expired yet, return it
        return token;
      }

      console.log("refreshing token...");
      const { access_token, expires_in } = await refreshToken(
        token.refreshToken as string
      );
      console.log("token refreshed:", access_token);

      return {
        ...token,
        accessToken: access_token,
        expiresAt: Math.floor(Date.now() / 1000) + expires_in,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
