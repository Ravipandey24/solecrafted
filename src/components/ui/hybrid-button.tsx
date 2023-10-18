'use client'

import Link from "next/link";
import { Button, ButtonProps } from "./button";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/navigation";


type HybridButtonProps = ButtonProps & {
  href: Url
}  

const HybridButton = ({ href, children, ...props }: HybridButtonProps) => {
  if (href == "#") {
    return <Button {...props}>{children}</Button>;
  }
  return (
    <Link href={href} prefetch={false}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default HybridButton;
