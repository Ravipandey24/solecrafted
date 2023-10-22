import Link from "next/link";
import { Icons } from "../icons";

const Footer = ({}) => {
  return (
    <footer className="h-56 w-full border-t bg-background">
      <div className="container h-full p-4">
        <div className="flex flex-col h-full justify-end items-center">
          <div className="w-full grid gap-4 grid-cols-4">
            <div className="flex flex-col gap-2">
            </div>
          </div>
          <span className="flex gap-2 text-sm text-muted-foreground">
            Made by Ravi{" "}
            <Link href="https://github.com/Ravipandey24" rel="noopener noreferrer" target="_blank">
              <Icons.gitHub className="w-4 h-4 text-foreground"></Icons.gitHub>
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
