"use server";

import {
  Cart,
  CartId,
  CartItem,
  CartItemId,
  NewCart,
  ProductId,
  ProfileId,
} from "../db/schema/schema";
import { CartItemType, ShoeSizeType } from "@/types/db";
import {
  getCartByProfileId,
  getCartItemsByCartId,
  getProductByCartItemId,
} from "../api/cart/queries";
import {
  createCart,
  createCartItem,
  deleteCartItem,
  updateCartItem,
  updateCartItemQuantity,
} from "../api/cart/mutations";
import { isEqual } from "lodash";
import { revalidatePath } from "next/cache";


export const getCartItemData = async (profileId: ProfileId) => {
  const { cart } = await getOrCreateCart(profileId);
  const { cartItems } = await getCartItemsByCartId(cart.id);
  const fetchCartItemValues = async (item: CartItem) => {
    const { product } = await getProductByCartItemId(item.id);
    return {
      id: item.id,
      name: product.name,
      slug: product.slug,
      size: item.size,
      quantity: item.quantity,
      image: product.imageUrl,
      gender: product.gender,
      category: product.category,
      price: product.price,
    } as CartItemType;
  }

  const cartItemData = await Promise.all(cartItems.map(item => fetchCartItemValues(item)));
  return { cartItems: cartItemData, cartItemCount: cartItems.length }
};

export const getOrCreateCart = async (profileId: ProfileId) => {
  const { cart } = await getCartByProfileId(profileId);
  if (cart) {
    return { cart };
  } else {
    // creating new cart for profileId if doesn't exists
    await createCart({ profileId });
    const { cart } = await getCartByProfileId(profileId);
    return { cart };
  }
};

export const insertOrUpdateCartItem = async (
  productId: ProductId,
  cartId: CartId,
  size: ShoeSizeType
) => {
  const { cartItems } = await getCartItemsByCartId(cartId);
  const [item] = cartItems.filter(
    (item) => item.productId === productId && isEqual(item.size, size)
  );
  if (item) {
    // updating cart item quantity by 1
    await updateCartItem(item.id, { ...item, quantity: item.quantity + 1 });
  } else {
    await createCartItem({ productId, cartId, size });
  }
};

export const editCartItemQuantity = async (itemId: CartItemId, quantity: number) => {
  await updateCartItemQuantity(itemId, quantity)
  revalidatePath('/')
}

export const deleteCartItemAction = async (itemId: CartItemId) => {
  await deleteCartItem(itemId);
  revalidatePath('/')
};

