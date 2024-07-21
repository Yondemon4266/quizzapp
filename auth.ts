import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import google from "next-auth/providers/google";
import prisma from "./prisma/db";

const googleConfig = google({
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [googleConfig],
});
