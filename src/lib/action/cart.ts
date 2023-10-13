"use server";

import { Session } from "@auth/core/types";
import { Cart, CartId, CartItem, NewCart, ProductId, ProfileId } from "../db/schema/schema";
import { redirect } from "next/navigation";
import { ShoeSizeType } from "@/types/db";
import { getUserAuth } from "../auth/utils";
import { getCartByProfileId, getCartItemsByCartId } from "../api/cart/queries";
import { createCart, createCartItem } from "../api/cart/mutations";
import { isEqual } from "lodash";


export const addToCartAction = async (
  productId: ProductId,
  size: ShoeSizeType
) => {
  try {
    const { session } = await getUserAuth();
    if (!session) {
      redirect("/login");
    }

    const profileId = session?.user.id;
    const { cart } = await getOrCreateCart(profileId);
    await insertOrUpdateCartItem(productId, cart.id, size);
    return { success: true };
  } catch (error) {
    console.log(error)
    return { success: false };
  }
};

const getOrCreateCart = async (profileId: ProfileId) => {
    const { cart } = await getCartByProfileId(profileId);
    if(cart){ 
        return { cart }
    }else{
        // creating new cart for profileId if doesn't exists
        await createCart({ profileId });
        const { cart } = await getCartByProfileId(profileId);
        return { cart }
    }
}

const insertOrUpdateCartItem = async ( productId: ProductId, cartId: CartId, size: ShoeSizeType ) => {
    const { cartItems } = await getCartItemsByCartId(cartId)
    const [item] = cartItems.filter((item) => item.productId === productId && isEqual(item.size, size));
    if(item) {
        console.log('already there', item)
    } else {
        console.log('creating new one')
        await createCartItem({ productId, cartId, size })
    }
}