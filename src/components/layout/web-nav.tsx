"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";


interface WebNavProps {
  navConfig: NavConfigType;
}

const WebNav = ({ navConfig }: WebNavProps) => {
  const { theme } = useTheme();
  const fillLogoSvg = theme === "dark" ? "#ffffff" : "#000000";
  
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo
          fill={fillLogoSvg}
          className="h-8 w-8"
          aria-hidden="true"
        />
        <span className={`hidden self-end text-xl lg:inline-block ${navConfig.headingFont.className}`}>
          {navConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {navConfig.NavItems.map((navItem) => (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {navItem.items.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default WebNav;
