import NextAuth from "next-auth/next";
import { env } from "@/lib/env.mjs"
import { authOptions } from "@/lib/auth/auth-options";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
