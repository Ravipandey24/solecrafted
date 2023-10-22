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
import { ShoeSizeType } from "@/types/db";
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
  try {
    const { id: cartItemId } = cartItemIdSchema.parse({ id });
    const newCartItem = insertCartItemSchema.parse(cartItem);
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

export const updateCartItemQuantity = async (
  id: CartItemId,
  quantity: number
) => {
  try {
    const { id: cartItemId } = cartItemIdSchema.parse({ id });
    await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, cartItemId));
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw new Error(message);
  }
};

export const updateCartItemSize = async (
  id: CartItemId,
  size: ShoeSizeType
) => {
  try {
    const { id: cartItemId } = cartItemIdSchema.parse({ id });
    await db
      .update(cartItems)
      .set({ size })
      .where(eq(cartItems.id, cartItemId));
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw new Error(message);
  }
};

export const deleteCartItem = async (id: CartItemId) => {
  try {
    const { id: cartItemId } = cartItemIdSchema.parse({ id });
    await db.delete(cartItems).where(eq(cartItems.id, cartItemId!));
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw new Error(message);
  }
};
