import { db } from "@/lib/db";
import {
  CartId,
  CartItemId,
  NewCart,
  NewCartItem,
  cartItemIdSchema,
  cartItems,
  carts,
  insertCartItemSchema,
  insertCartSchema,
} from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";

export const createCart = async (cart: NewCart) => {
  try {
    const newCart = insertCartSchema.parse(cart);
    await db.insert(carts).values(newCart);
  } catch (error: any) {
    if (
      (error as Error).message &&
      (error as Error).message.includes("AlreadyExists")
    ) {
      throw new Error("Cart already exists!");
    }
    console.error("new cart", error);
    throw new Error(error);
  }
};

export const createCartItem = async (cartItem: NewCartItem) => {
  try {
    const newCartItem = insertCartItemSchema.parse(cartItem);
    // @ts-ignore
    await db.insert(cartItems).values(newCartItem);
  } catch (error: any) {
    console.error("new cart", error);
    throw new Error(error);
  }
};

export const updateCartItem = async (id: CartItemId, cartItem: NewCartItem) => {
  const { id: cartItemId } = cartItemIdSchema.parse({ id });
  const newCartItem = insertCartItemSchema.parse(cartItem);
  try {
    await db
      .update(cartItems)
      // @ts-ignore
      .set(newCartItem)
      .where(eq(cartItems.id, cartItemId!));
  } catch (err: any) {
    console.error("update cart", err);
    throw new Error(err);
  }
};