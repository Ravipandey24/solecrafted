import Image from "next/image";
import { FC } from "react";
import { Icons } from "../icons";
import { Separator } from "../ui/separator";
import { CartItemType } from "@/types/db";
import { capitalize } from "@/lib/utils";
import { DeleteCartItem, ModifyCartItem } from "../features/edit-cart-item";
import Link from "next/link";

interface CartItemCardProps {
  cartItem: CartItemType;
}

const CartItemCard: FC<CartItemCardProps> = ({ cartItem }) => {
  return (
    <div key={cartItem.id} className="space-y-4">
      <div className="flex items-start justify-between gap-4 xs:flex-row">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-20 w-20 min-w-fit overflow-hidden rounded">
            {cartItem?.image ? (
              <Image
                src={cartItem.image ?? "/images/product-placeholder.webp"}
                alt={cartItem.image ?? cartItem.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="absolute object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <Icons.placeholder
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-1 self-start">
            <Link href={"/product/" + cartItem.slug}>
              <span className="line-clamp-1 text-base font-medium hover:underline">
                {cartItem.name}
              </span>
            </Link>
            <span className="line-clamp-1 text-sm capitalize text-muted-foreground">
              {`${cartItem.gender} ${
                cartItem.category ? `/ ${capitalize(cartItem.category)}` : ""
              }`}
            </span>
            <ModifyCartItem selectedSize={cartItem.size} selectedQuantity={cartItem.quantity} cartItemId={cartItem.id}></ModifyCartItem>
          </div>
        </div>
        <div className="flex relative flex-col h-full justify-between space-y-1 self-start">
          <span className="line-clamp-1 text-sm text-muted-foreground">
            {"$"}
            {cartItem.price} x {cartItem.quantity} ={" $"}
            {(Number(cartItem.price) * Number(cartItem.quantity)).toFixed(2)}
          </span>
          <div className="flex w-full justify-end absolute top-16">
            <DeleteCartItem cartItemId={cartItem.id}></DeleteCartItem>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default CartItemCard;
