"use client";

import Link from "next/link";
import { Button, ButtonProps } from "../ui/button";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, useState } from "react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const SignOutForm = ({}) => {
  return (
    <div className="grid grid-flow-row grid-rows-3 h-full">
      <div className="row-span-2 flex justify-center items-center">
        Already Logged In!
      </div>
      <div className="row-span-1 flex items-end gap-2">
        <SignOutButton className="w-full">
          Sign Out
        </SignOutButton>
        <Link href="/" className="w-full">
          <Button
            variant="outline"
            className="w-full"
          >
            Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const SignOutButton: FC<ButtonProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, children, variant }) => {
  return <Button className={cn(className)} variant={variant} onClick={() => signOut()}>{children}</Button>;
};

export default SignOutForm;
