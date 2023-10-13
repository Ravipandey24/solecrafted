import z from "zod";

export const updateCartItemSchema = z.object({
    quantity: z.number().min(0).default(1),
})
// export const cartItemSchema = z.object({
//     productId: z.number(),
//     size: z.number(),
//     quantity: z.number().min(0),
// })
// export const localCartSchema = z.array(cartItemSchema)

// export type CartItemType = z.infer<typeof cartItemSchema>
export type UpdateCartItemType = z.infer<typeof updateCartItemSchema>
