// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const validEmail = process.env.DISPATCHER_EMAIL;
        const validPasswordHash = process.env.DISPATCHER_PASSWORD_HASH;

        console.log(
          "DEBUG hash from auth.ts:",
          JSON.stringify(validPasswordHash),
        );
        console.log("DEBUG hash length:", validPasswordHash?.length);

        const passwordMatch = validPasswordHash
          ? await bcrypt.compare(
              credentials.password as string,
              validPasswordHash,
            )
          : false;

        console.log("DEBUG passwordMatch:", passwordMatch);
        console.log("DEBUG emailMatch:", credentials.email === validEmail);

        if (credentials.email === validEmail && passwordMatch) {
          return { id: "1", name: "Dispatcher", email: validEmail };
        }
        return null;
      },
    }),
  ],
});
