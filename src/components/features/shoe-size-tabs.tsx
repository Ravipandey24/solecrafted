import { AllSizeVariants } from "@/config/product";
import { Button } from "../ui/button";
import Link from "next/link";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { getProductInventory } from "@/lib/api/products/queries";
import { ShoeSizeType } from "@/types/db";
import HybridButton from "../ui/hybrid-button";

interface ShoeSizeTabProps {
  selectedSize: ShoeSizeType;
  productId: number;
}

const ShoeSizeTabs: FC<ShoeSizeTabProps> = async ({
  selectedSize,
  productId,
}) => {
  const { inventory } = await getProductInventory(productId);
  const isButtonDisabled = (variant: ShoeSizeType) =>
    !inventory.some(
      (inv) => inv.size === variant.size && inv.metric === variant.metric
    );
  const selectedTabClass =
    "hover:bg-accent-foreground hover:text-accent-background text-background bg-foreground";
  const isSelectedTab = (variant: ShoeSizeType) =>
    variant.size === selectedSize.size &&
    variant.metric === selectedSize.metric;

  return (
    <div>
      <div className="grid gap-1 grid-cols-3">
        {AllSizeVariants.map((variant) => (
          <HybridButton
            key={variant.size}
            href={
              !isButtonDisabled(variant)
                ? `?metric=${variant.metric}&size=${variant.size}`
                : "#"
            }
            className={cn("w-24", isSelectedTab(variant) && selectedTabClass)}
            variant="outline"
            aria-label="Toggle"
            disabled={isButtonDisabled(variant)}
          >
            {variant.metric + " " + variant.size}
          </HybridButton>
        ))}
      </div>
    </div>
  );
};

export default ShoeSizeTabs;
