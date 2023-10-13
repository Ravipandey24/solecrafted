import { Profile } from "@/lib/db/schema/schema";
import { DefaultSession } from "next-auth";
import NextAuth from 'next-auth';

declare module "next-auth" {
    interface Session {
      user: Pick<Profile, "id" | "name" | "email">
    } 
  }

  declare module "next-auth/jwt" {
    interface JWT {
      id: any
      name: any
      email: any
    }
    interface DefaultUser {
      id: number
      name: string
    }
  }
  