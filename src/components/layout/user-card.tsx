import { getUserAuth } from "@/lib/auth/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icons } from "../icons";

const UserCard = async ({}) => {
  const { session } = await getUserAuth();
  if (session) {
    <Icons.user></Icons.user>;
  }
  return (
    <Link href='/login'>
      <Button variant='outline' className="h-9">Sign In</Button>
    </Link>
  );
};

export default UserCard;
