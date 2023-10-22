"use client";

import { FC, useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { ShoeSizeType } from "@/types/db";
import { redirect } from "next/navigation";
import { addToCartAction } from "@/lib/action/cart";

interface AddToCartButtonProps {
  productId: number;
  selectedSize: ShoeSizeType;
}

const AddToCartButton: FC<AddToCartButtonProps> = ({
  productId,
  selectedSize,
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const addToCart = () => {
    startTransition(async () => {
        const res = await addToCartAction(productId, selectedSize)
        if(res.success){
          toast({
            title: "Added to Cart!",
          });
        }else{
          if(res.message === 'unauthorized'){
            toast({
              title: "please, sign in to perform this action!",
            });
            return redirect("/login");
          }
          toast({
            title: "Something went wrong!!"
          });
        }
      // await new Promise(resolve => { setTimeout(()=>{resolve('nigga')}, 1000) })
      // const res = await new Promise(resolve => { setTimeout(()=>{resolve({ success: true })}, 1000) }) as any
    });
  };
  return (
    <Button
      disabled={isPending || !selectedSize.size}
      className="rounded-full w-[19rem]"
      onClick={addToCart}
    >
      <span>Add to Cart</span>
    </Button>
  );
};

export default AddToCartButton;
