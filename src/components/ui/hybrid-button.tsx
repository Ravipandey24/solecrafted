'use client'

import Link from "next/link";
import { Button, ButtonProps } from "./button";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/navigation";


type HybridButtonProps = ButtonProps & {
  href: string
}  

const HybridButton = ({ href, children, ...props }: HybridButtonProps) => {
  const router = useRouter()
  if (href == "#") {
    return <Button {...props}>{children}</Button>;
  }
  return (
    <Button onClick={() => router.push(href)} {...props}>{children}</Button>
  );
};

export default HybridButton;
