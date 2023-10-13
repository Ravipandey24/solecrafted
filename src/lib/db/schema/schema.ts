import { InventoryType, ShoeSizeType } from "@/types/db";
import { relations } from "drizzle-orm";
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
  gender: mysqlEnum("gender", [
    "men",
    "women",
    "kids"
  ])
    .notNull()
    .default("men"),
  category: varchar("category", { length: 191 }),
  brand: varchar("brand", { length: 191 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: json("inventory").$type<InventoryType[] | null>().default(null),
  rating: int("rating").notNull().default(0),
  slug: varchar("slug", { length: 191 }),
  tags: json("tags").$type<string[] | null>().default(null),
  storeId: int("storeId").notNull().default(-1),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const profiles = mysqlTable("profiles", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  isEmailVerified: boolean("is_email_verified").default(false),
  image: varchar("image", { length: 255 }).default(''),
  phone: varchar("phone_number", { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
});

export const carts = mysqlTable("shopping_carts", {
  id: serial("id").primaryKey(),
  profileId: int("profile_id").notNull(),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
})

export const cartItems = mysqlTable("shopping_cart_items", {
  id: serial("id").primaryKey(),
  productId: int("product_id").notNull(),
  cartId: int("cart_id").notNull(),
  size: json('size').$type<ShoeSizeType | null>().default(null),
  quantity: int("quantity").notNull().default(1),
  closed: boolean("closed").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
})

// table relationships
export const productsRelations = relations(products, ({many}) => ({
  cartItems: many(cartItems)
}))
export const profileRelations = relations(profiles, ({ one }) => ({
  cart: one(carts, {
    fields: [profiles.id],
    references: [carts.profileId]
  })
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [carts.profileId],
    references: [profiles.id]
  }),
  cartItems: many(cartItems)
}))

export const cartItemsRelations = relations(cartItems, ({one}) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id]
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id]
  })
}))

// product controllers
export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export const productIdSchema = selectProductSchema.pick({ id: true });
export const updateProductSchema = selectProductSchema;

export type Product = z.infer<typeof selectProductSchema>;
export type NewProduct = z.infer<typeof insertProductSchema>;
export type ProductId = z.infer<typeof productIdSchema>["id"];

// profile controllers
export const insertProfileSchema = createInsertSchema(profiles);
export const selectProfileSchema = createSelectSchema(profiles);
export const profileIdSchema = selectProfileSchema.pick({ id: true });
export const updateProfileSchema = selectProfileSchema;

export type Profile = z.infer<typeof selectProfileSchema>;
export type NewProfile = z.infer<typeof insertProfileSchema>;
export type ProfileId = z.infer<typeof profileIdSchema>["id"]

//cart controllers
export const insertCartSchema = createInsertSchema(carts);
export const selectCartSchema = createSelectSchema(carts);
export const cartIdSchema = selectCartSchema.pick({ id: true });
export const updateCartSchema = selectCartSchema;

export type Cart = z.infer<typeof selectCartSchema>;
export type NewCart = z.infer<typeof insertCartSchema>;
export type CartId = z.infer<typeof cartIdSchema>["id"]

//cart Item controllers
export const insertCartItemSchema = createInsertSchema(cartItems);
export const selectCartItemSchema = createSelectSchema(cartItems);
export const cartItemIdSchema = selectCartItemSchema.pick({ id: true });
export const updateCartItemSchema = selectCartItemSchema;

export type CartItem = z.infer<typeof selectCartItemSchema>;
export type NewCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItemId = z.infer<typeof cartItemIdSchema>["id"]