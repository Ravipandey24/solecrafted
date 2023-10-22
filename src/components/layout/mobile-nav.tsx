"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "../icons";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ScrollArea } from "../ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { List, ListItem } from "../ui/list";

interface MobileNavProps {
  navConfig: NavConfigType;
}

const MobileNav: FC<MobileNavProps> = ({ navConfig }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const fillLogoSvg = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.logo
              fill={fillLogoSvg}
              className="h-8 w-8 mr-2"
              aria-hidden="true"
            />
            <span className={`${navConfig.headingFont.className}`}>{navConfig.name}</span>
            <span className="sr-only">Home</span>
          </Link>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-5">
          <div className="pr-5">
            <Accordion type="multiple" className="w-full">
              {navConfig.NavItems.map((category) => (
                <AccordionItem key={category.title} value={category.title}>
                  <AccordionTrigger>{category.title}</AccordionTrigger>
                  <AccordionContent><List>{category.items.map((item, idx) => 
                    <ListItem key={idx} href={item.href}><span className="text-sm">{item.title}</span></ListItem>
                  )}</List></AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
        <SheetFooter>
          <div className="flex justify-center">
          <span className="flex gap-2 text-xs text-muted-foreground">
            Made by Ravi{" "}
            <Link href="https://github.com/Ravipandey24" rel="noopener noreferrer" target="_blank">
              <Icons.gitHub className="w-3 h-3 text-foreground"></Icons.gitHub>
            </Link>
          </span>
          </div>
          {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
