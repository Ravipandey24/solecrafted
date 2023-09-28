import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  text,
  serial,
  json,
  mysqlEnum,
  decimal,
  boolean,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";


export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  imageUrl: varchar('image_url', { length: 256 }).notNull(),
  category: mysqlEnum("category", [
    "men",
    "women",
    "kids"
  ])
    .notNull()
    .default("men"),
  subcategory: varchar("subcategory", { length: 191 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: int("inventory").notNull().default(0),
  rating: int("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  storeId: int("storeId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const profiles = mysqlTable("profile", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  isEmailVerified: boolean("is_email_verified").default(false),
  image: varchar("image", { length: 255 }).default(''),
  phone: varchar("phone_number", { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export const ProductIdSchema = selectProductSchema.pick({ id: true });
export const updateProductSchema = selectProductSchema;

export type Product = z.infer<typeof selectProductSchema>;
export type NewProduct = z.infer<typeof insertProductSchema>;
export type ProductId = z.infer<typeof ProductIdSchema>["id"];

// profile controllers
export const insertProfileSchema = createInsertSchema(profiles);
export const selectProfileSchema = createSelectSchema(profiles);
export const profileIdSchema = selectProfileSchema.pick({ id: true });
export const updateProfileSchema = selectProfileSchema;

export type Profile = z.infer<typeof selectProfileSchema>;
export type NewProfile = z.infer<typeof insertProfileSchema>;
export type ProfileId = z.infer<typeof profileIdSchema>["id"]