import { getUserAuth } from "@/lib/auth/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icons } from "../icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "../auth/SignOutForm";

const UserCard = async ({}) => {
  const { session } = await getUserAuth();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-1">
            <Icons.user className="h-5 w-6"></Icons.user>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-sm font-normal text-muted-foreground">
            {session.user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem> Account</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" flex text-sm font-normal items-center gap-2 hover:cursor-pointer" asChild>
            <SignOutButton variant='ghost' className="flex w-full justify-start">
              <Icons.logout className="h-4 w-4"></Icons.logout>Logout
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <Link href="/login">
      <Button variant="outline" className="h-9">
        Sign In
      </Button>
    </Link>
  );
};

export default UserCard;
