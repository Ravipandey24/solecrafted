'use client'

import { FC, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import EditItemQuantityForm from "./edit-item-quantity";
import { ShoeSizeType } from "@/types/db";
import { AllSizeVariants } from "@/config/product";
import { deleteCartItemAction, editCartItemSize } from "@/lib/action/cart";
import { CartItemId } from "@/lib/db/schema/schema";
import { isEqual } from "lodash";

interface ModifyCartItemProps {
  selectedSize: ShoeSizeType;
  cartItemId: CartItemId;
  selectedQuantity: number;
}

export const ModifyCartItem: FC<ModifyCartItemProps> = ({ selectedSize, cartItemId, selectedQuantity }) => {
  const [isPending, startTransition] = useTransition()
  const updateSize = (newSize: ShoeSizeType) => {
    startTransition(async () => {
      await editCartItemSize(cartItemId, newSize)
    })
  }
  return (
    <div className="flex justify-start">
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" disabled={isPending} className="w-24 text-sm p-1 gap-2 border-b">
              {selectedSize.metric + " " + selectedSize.size}
              <Icons.chevronDown className="h-4 w-4"></Icons.chevronDown>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {AllSizeVariants.filter(variant => !isEqual(variant, selectedSize)).map((variant, key) => (
              <DropdownMenuItem key={key} className="border-b last:border-b-0 hover:cursor-pointer" onClick={() => { updateSize(variant) }}>
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
