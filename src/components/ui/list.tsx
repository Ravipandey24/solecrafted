"use client";

import { cn } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}
const List = ({ children, className, ...props }: ListProps) => {
  return (
    <ol className={cn(className)} {...props}>
      {children}
    </ol>
  );
};

export type ListItemProps = {
  active?: boolean;
  noVerticalPadding?: boolean;
  href?: string;
} & React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;
const ListItem = ({
  active,
  noVerticalPadding,
  href,
  className,
  children,
  ...props
}: ListItemProps) => {
  const cls = cn(
    "flex items-center rounded-md pl-3 pr-2 text-[15px] hover:bg-gray-800/50",
    "w-full text-left hover:text-gray-100 active:text-white active:bg-gray-800/50",
    "focus-visible:ring-0 focus-visible:bg-gray-800/50 focus-visible:text-gray-100",
    noVerticalPadding ? "" : "py-2",
    active ? "text-gray-100 bg-gray-700/60" : "text-gray-400",
    className
  );

  return (
    <li className={cls} {...props}>
      {href ? (
        <Link href={href as Url}>{children}</Link>
      ) : (
        <div>{children}</div>
      )}
    </li>
  );
};

export { List, ListItem };
