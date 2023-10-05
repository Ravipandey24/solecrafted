import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { env } from "../env.mjs";
import axios, { AxiosError } from "axios";
import { signInFormSchema } from "../validations/client-vals";
import { getProfileByEmail } from "../api/profiles/queries";
import { validatePassword } from "../hash";
import { exists } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail@123" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        const { email, password } = signInFormSchema.parse(credentials);
        const { profile } = await getProfileByEmail(email);
        if (profile) {
          const isPasswordCorrect = await validatePassword(password, profile.password);
          if (isPasswordCorrect) {
            return profile 
          }
          throw new Error('incorrect password!');
        }
        throw new Error("user doesn't exists!");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      //@ts-ignore
      if(user){
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
};
