import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import { ProfileId } from "@/lib/db/schema/schema";
import { getUserAuth } from "@/lib/auth/utils";
import ErrorCard from "../cards/ErrorCard";
import Link from "next/link";
import { getCartItemData } from "@/lib/action/cart";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import CartItemCard from "../cards/CartItemCard";

const SideCart = async ({}) => {
  const { session } = await getUserAuth();
  const profileId = session?.user.id;
  const cartItemCount = profileId
    ? (await getCartItemData(profileId!)).cartItemCount
    : 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="relative h-9 p-2"
          aria-label="Open cart"
          variant="outline"
          size="icon"
        >
          {cartItemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5 font-medium"
            >
              {cartItemCount}
            </Badge>
          )}
          <Icons.cart className="h-4 w-4"></Icons.cart>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl">
        {session ? (
          <CartContent profileId={profileId!}></CartContent>
        ) : (
          <div className="h-full flex items-center">
            <ErrorCard
              heading="Not Signed In!"
              description="sign in to use cart features."
              variant="custom"
            >
              <SheetTrigger asChild>
                <Link href="/login">
                  <Button className="p-3" variant="ghost">
                    Sign In
                  </Button>
                </Link>
              </SheetTrigger>
            </ErrorCard>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

const CartContent = async ({ profileId }: { profileId: ProfileId }) => {
  const { cartItems, cartItemCount } = await getCartItemData(profileId);
  return (
    <>
      <SheetHeader>
        <h1>Cart ({cartItemCount})</h1>
      </SheetHeader>
      <ScrollArea className="my-8 h-[calc(100vh-12rem)] ">
        <div className="flex w-full flex-col gap-4 pr-6">
          {cartItems.map((item) => (
            <CartItemCard key={item.id} cartItem={item}></CartItemCard>
          ))}
        </div>
      </ScrollArea>
      <SheetFooter></SheetFooter>
    </>
  );
};

export default SideCart;
