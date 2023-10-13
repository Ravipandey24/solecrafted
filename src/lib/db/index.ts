import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "@/lib/env.mjs";
import * as authSchema from './schema/auth'
import * as dbSchema from './schema/schema'


const schema = { ...authSchema, ...dbSchema}
// create the connection
const connection = connect({
  url: env.DATABASE_URL
});
 
export const db = drizzle(connection, { schema });
