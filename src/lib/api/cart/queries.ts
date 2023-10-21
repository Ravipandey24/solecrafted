import { db } from "@/lib/db";
import { CartId, CartItemId, ProfileId, cartIdSchema, cartItemIdSchema, cartItems, carts, profileIdSchema } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";


export const getCart = async (id: CartId) => {
  const { id: cartId } = cartIdSchema.parse({ id });
  const [c] = await db.select().from(carts).where(eq(carts.id, cartId));
  return { cart: c };
};

export const getCartItem = async (id: CartItemId) => {
    const { id: cartItemId } = cartItemIdSchema.parse({ id });
    const [c] = await db.select().from(cartItems).where(eq(cartItems.id, cartItemId));
    return { cartItem: c };
};

export const getCartByProfileId = async (id: ProfileId) => {
    const { id: profileId } = profileIdSchema.parse({ id });
    const [c] = await db.query.profiles.findMany({
        where: (profiles, { eq }) => (eq(profiles.id, profileId)),
        with: {
            cart: true 
        },
    });
    return { cart: c.cart }
}

export const getCartItemsByCartId = async (id: CartId) => {
    const { id: cartId } = cartIdSchema.parse({ id });
    const [c] = await db.query.carts.findMany({
        where: (carts, { eq }) => (eq(carts.id, cartId)),
        with: {
            cartItems: true 
        },
    });
    return { cartItems: c.cartItems }
}

export const getProductByCartItemId = async (id: CartItemId) => {
    const { id: cartItemId } = cartItemIdSchema.parse({ id });
    const [c] = await db.query.cartItems.findMany({
        where: (cartItems, { eq }) => (eq(cartItems.id, cartItemId)),
        with: {
            product: true 
        },
    });
    return { product: c.product }
}
