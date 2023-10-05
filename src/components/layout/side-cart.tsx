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


const SideCart = ({}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-9 p-2" variant="outline"><Icons.cart className="h-4 w-4"></Icons.cart></Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
        </SheetHeader>
        <div>
            This is the cart!
        </div>
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideCart;
