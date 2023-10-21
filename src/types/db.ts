import { AllSizeVariants } from "@/config/product";
import { CartItemId, Product } from "@/lib/db/schema/schema";

export type ShoeSizeType = {
    metric: typeof AllSizeVariants[number]['metric']
    size: typeof AllSizeVariants[number]['size']
}

export type InventoryType = {
    metric: typeof AllSizeVariants[number]['metric']
    size: typeof AllSizeVariants[number]['size']
    available: number
}

export type CartItemType = {
    id: CartItemId,
    size: ShoeSizeType,
    quantity: number,
    name: Product['name'],
    slug: Product['slug'],
    image: Product['imageUrl'],
    gender: Product['gender'],
    category: Product['category'],
    price: Product['price']
}