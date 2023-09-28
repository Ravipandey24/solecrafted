import { ThemeToggle } from "./theme-toggle";
import { NavConfig } from "@/config/site";
import dynamic from "next/dynamic";
import Link from "next/link";

// disabling ssr for nav component to handle the icon fill rendering issue.
const WebNav = dynamic(() => import("./web-nav"), { ssr: false });
const MobileNav = dynamic(() => import("./mobile-nav"), { ssr: false });

const Header = ({}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto container px-8 flex h-16 items-center">
        <WebNav navConfig={NavConfig}></WebNav>
        <MobileNav navConfig={NavConfig}></MobileNav>
        <Link href="/" className="lg:hidden items-center flex">
          <h3 className={`inline-block lg:hidden ${NavConfig.headingFont.className}`}>
            {NavConfig.name}
          </h3>
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle></ThemeToggle>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
