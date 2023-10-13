
import Link from "next/link";
import { Button, ButtonProps } from "./button";
import { Url } from "next/dist/shared/lib/router/router";

type HybridButtonProps = ButtonProps & {
  href: Url
}  

const HybridButton = ({ href, children, ...props }: HybridButtonProps) => {
  if (href == "#") {
    return <Button {...props}>{children}</Button>;
  }
  return (
    <Link href={href} >
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default HybridButton;
