"use client";

import { FC, useTransition } from "react";
import { Button } from "../ui/button";
import { addToCartAction } from "@/lib/action/cart";
import { useToast } from "../ui/use-toast";
import { ShoeSizeType } from "@/types/db";

interface AddToCartButtonProps {
  productId: number;
  selectedSize: ShoeSizeType;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId, selectedSize }) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const addToCart = () => {
    startTransition(async () => {
        const res = await addToCartAction(
          productId,
          selectedSize,
        );
        if (res?.success)
          toast({
            title: "Added to Cart!",
        });
        else{
            toast({
                title: "Something went wrong!",
            });
        }
    });
  };
  return (
    <Button
      disabled={isPending || !selectedSize.size}
      className="rounded-full w-full"
      onClick={addToCart}
    >
      <span>Add to Cart</span>
    </Button>
  );
};

export default AddToCartButton;
