import z from "zod";
import { ProductId } from "../db/schema/schema";
import { ShoeSizeType } from "@/types/db";

export const updateCartItemQuantitySchema = z.object({
    quantity: z.number().min(0).default(1),
})

export const addToCartSchema = z.object({
    productId: z.custom<ProductId>(),
    size: z.custom<ShoeSizeType>()
})
// export const cartItemSchema = z.object({
//     productId: z.number(),
//     size: z.number(),
//     quantity: z.number().min(0),
// })
// export const localCartSchema = z.array(cartItemSchema)

// export type CartItemType = z.infer<typeof cartItemSchema>
export type updateCartItemQuantityType = z.infer<typeof updateCartItemQuantitySchema>
