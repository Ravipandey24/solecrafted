'use client'
// not using localstorage for now

// import { CheckboxItem } from "node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs"
// import { CartItemType, cartItemSchema, localCartSchema } from "../validations/cart-vals"

// export const getLocalCartItems = () => {
//     const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
//     const validatedCart = localCartSchema.safeParse(localCart)

//     if(!validatedCart.success){
//         localStorage.removeItem('cart')
//         return null
//     }
//     return validatedCart.data as CartItemType[]
// }

// export const setLocalCartItem = (cartItem: CartItemType) => {
//     const validatedCartItem = cartItemSchema.safeParse(cartItem);
//     if(!validatedCartItem.success){
//         throw new Error('invalid item!')
//     }
//     const allCartItems = getLocalCartItems();
//     if(!allCartItems){
//         localStorage.setItem('cart', JSON.stringify([validatedCartItem.data]))
//     }
//     localStorage.setItem('cart', JSON.stringify([...allCartItems! ,validatedCartItem.data]))
// }

// export const updateLocalCartItemQuantity = (updatedItem: CartItemType) => {
//     const allCartItems = getLocalCartItems();
//     const updatedCartItems = allCartItems?.map(item => {
//         if(item.productId === updatedItem.productId && item.size === updatedItem.size){
//             return { ...item, quantity: updatedItem.quantity }
//         }
//         return item
//     })    
//     localStorage.setItem('cart', JSON.stringify(updatedCartItems))
// }