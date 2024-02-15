import { drizzle } from "drizzle-orm/postgres-js";
import { connect } from "@planetscale/database";
import { env } from "@/lib/env.mjs";
import postgres from 'postgres'
import * as authSchema from './schema/auth'
import * as dbSchema from './schema/schema'


const schema = { ...authSchema, ...dbSchema}
// create the connection
if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URL is missing");
}
const connectionString = process.env.DATABASE_URI as string

const client = postgres(connectionString, { max: 10})

export const db = drizzle(client, { schema });