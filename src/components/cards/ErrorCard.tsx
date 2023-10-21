import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import Link from "next/link";

type ErrorCardProps = {
  heading: string;
  description: string;
  href?: string;
  variant?: "default" | "custom";
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ErrorCard: FC<ErrorCardProps> = ({
  heading,
  description,
  href,
  variant,
  children,
}) => {
  return (
    <div className="w-full flex justify-center">
      <Card className="border-none">
        <CardContent className="space-y-2">
          <CardTitle className="text-2xl text-center">{heading}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="flex justify-center">
            {variant === "custom" ? (
              children
            ) : (
              <Link href={href || "/"}>
                <Button className="p-2" variant="ghost">
                  <Icons.chevronLeft className="w-4 h-5 transition-all fade-in-5 hover:-translate-x-1"></Icons.chevronLeft>
                  Go Home
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorCard;
