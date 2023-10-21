'use client'

import { FC, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import EditItemQuantityForm from "./edit-item-quantity";
import { ShoeSizeType } from "@/types/db";
import { AllSizeVariants } from "@/config/product";
import { deleteCartItemAction } from "@/lib/action/cart";
import { CartItemId } from "@/lib/db/schema/schema";

interface ModifyCartItemProps {
  selectedSize: ShoeSizeType;
  cartItemId: CartItemId;
  selectedQuantity: number;
}

export const ModifyCartItem: FC<ModifyCartItemProps> = ({ selectedSize, cartItemId, selectedQuantity }) => {
  return (
    <div className="flex justify-start">
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-sm p-1 gap-3 border-b">
              {selectedSize.metric + " " + selectedSize.size}
              <Icons.arrowDown className="h-4 w-4"></Icons.arrowDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {AllSizeVariants.map((variant, key) => (
              <DropdownMenuItem key={key} >
                {variant.metric + " " + variant.size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <EditItemQuantityForm cartItemId={cartItemId} selectedQuantity={selectedQuantity} ></EditItemQuantityForm>
      </div>
    </div>
  );
};

interface DeleteCartItemProps {
  cartItemId: CartItemId
}

export const DeleteCartItem: FC<DeleteCartItemProps> = ({cartItemId}) => {
  const [isPending, startTransition] = useTransition()
  const deleteItem = () => {
    startTransition(async () => {
      await deleteCartItemAction(cartItemId)
    });
  }
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-5 w-5 text-muted-foreground"
      disabled={isPending}
      onClick={deleteItem}
    >
      <Icons.trash></Icons.trash>
    </Button>
  );
};
