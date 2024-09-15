import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [Google],
  callbacks:{
    session({session, token}) {
      session.user.id = token.sub as string
      return session
    },
  },
  session: { strategy: "jwt" },
});
