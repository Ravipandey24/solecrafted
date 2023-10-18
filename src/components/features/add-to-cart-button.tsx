"use client";

import { FC, useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { addToCartAction } from "@/lib/action/cart";
import { useToast } from "../ui/use-toast";
import { ShoeSizeType } from "@/types/db";
import { redirect, useRouter } from "next/navigation";
import { addTOCartSchema } from "@/lib/validations/cart-vals";
import axios, { AxiosError } from "axios";

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
  const router = useRouter();

  useEffect(() => {
    console.log("maybe");
  }, [selectedSize.metric, selectedSize.size]);

  const addToCart = () => {
    startTransition(async () => {
      try {
        const payload = addTOCartSchema.parse({ productId, size: selectedSize })
        const res = await axios.post('/api/cart/add', payload)
        if (res.data?.success)
          toast({
            title: "Added to Cart!",
          });
      } catch (error) {
        if (error instanceof AxiosError) {
          if(error.response?.status === 401){
            toast({
              title: "please, sign in to perform this action!",
            });
            return redirect('/login')
          }
          toast({
            title: error.response?.data.error,
          });
          return;
        }
        toast({
          title: "Something went wrong!!",
        });
      }
      // await new Promise(resolve => { setTimeout(()=>{resolve('nigga')}, 1000) })
      // const res = await new Promise(resolve => { setTimeout(()=>{resolve({ success: true })}, 1000) }) as any
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
