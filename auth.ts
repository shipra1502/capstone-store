// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        if (
          credentials.email === "dispatcher@test.com" &&
          credentials.password === "1234"
        ) {
          return { id: "1", name: "Dispatcher", email: "dispatcher@test.com" };
        }
        return null;
      },
    }),
  ],
});
