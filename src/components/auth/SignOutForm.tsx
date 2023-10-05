"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { signOut } from "next-auth/react";


const SignOutForm = ({}) => {
  const [isSendingRequest, setSendingRequest] = useState<boolean>(false);

  return (
    <div className="grid grid-flow-row grid-rows-3 h-full">
      <div className="row-span-2 flex justify-center items-center">
        Already Logged In!
      </div>
      <div className="row-span-1 flex items-end gap-2">
        <Button className="w-full" onClick={() => signOut()} >Sign Out</Button>
        <Link href='/' className="w-full">
          <Button disabled={isSendingRequest} variant='outline' className="w-full" >Go Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default SignOutForm;
