import { AllSizeVariants } from "@/config/product";

export type ShoeSizeType = {
    metric: typeof AllSizeVariants[number]['metric']
    size: typeof AllSizeVariants[number]['size']
}

export type InventoryType = {
    metric: typeof AllSizeVariants[number]['metric']
    size: typeof AllSizeVariants[number]['size']
    available: number
}