"use server";

import { Cart, CartId, CartItem, NewCart, ProductId, ProfileId } from "../db/schema/schema";
import { ShoeSizeType } from "@/types/db";
import { getUserAuth } from "../auth/utils";
import { getCartByProfileId, getCartItemsByCartId } from "../api/cart/queries";
import { createCart, createCartItem, updateCartItem } from "../api/cart/mutations";
import { isEqual } from "lodash";
import { redirect } from 'next/navigation'



export const addToCartAction = async (
  productId: ProductId,
  size: ShoeSizeType
) => {
  try {
    await new Promise(resolve => setTimeout(()=> {console.log('nigga'); resolve('');}, 500))
    console.log('--------')
    // const { session } = await getUserAuth();
    // if (!session) {
    //   return redirect('/login');
    // }

    // const profileId = session?.user.id;
    // const { cart } = await getOrCreateCart(profileId!);
    // await insertOrUpdateCartItem(productId, cart.id, size);
    return { success: true };
  } catch (error) {
    console.log(error)  
    return { success: false };
  }
};

export const getOrCreateCart = async (profileId: ProfileId) => {
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

export const insertOrUpdateCartItem = async ( productId: ProductId, cartId: CartId, size: ShoeSizeType ) => {
    const { cartItems } = await getCartItemsByCartId(cartId)
    const [item] = cartItems.filter((item) => item.productId === productId && isEqual(item.size, size));
    if(item) {
        // updating cart item quantity by 1
        await updateCartItem(item.id, {...item, quantity: item.quantity + 1})
    } else {
        await createCartItem({ productId, cartId, size })
    }
}