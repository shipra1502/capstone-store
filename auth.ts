// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const validEmail = process.env.DISPATCHER_EMAIL;
        const validPassword = process.env.DISPATCHER_PASSWORD;

        if (
          credentials.email === validEmail &&
          credentials.password === validPassword
        ) {
          return { id: "1", name: "Dispatcher", email: validEmail };
        }
        return null;
      },
    }),
  ],
});
