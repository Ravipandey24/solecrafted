import { env } from "@/lib/env.mjs";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'


const runMigrate = async () => {
  if (!env.DATABASE_URI) {
    throw new Error("DATABASE_URL is not defined");
  }

  
  const client = postgres(env.DATABASE_URI as string)
  const db = drizzle(client);


  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: 'src/lib/db/migrations' });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});