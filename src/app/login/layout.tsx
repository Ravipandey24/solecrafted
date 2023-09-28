import { Icons } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { NavConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/auth-layout.jpg"
          alt="A skateboarder doing a high drop"
          fill
          className="relative w-full inset-0 object-cover grayscale blur-sm"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
        <Link
          href="/"
          className="absolute left-8 top-6 z-20 flex items-center text-lg tracking-tight"
        >
          <Icons.logo className="mr-2 h-8 w-8" aria-hidden="true" />
          <span className={NavConfig.headingFont.className}>{NavConfig.name}</span>
        </Link>
        <main className="container z-10 absolute top-1/2 mx-auto md:left-8 col-span-1 flex -translate-y-1/2 items-center">
          {children}
        </main>
        {/* <div className="absolute bottom-6 left-1/2 z-20 text-base">
          Photo by{" "}
          <a
            href="https://unsplash.com/ja/@pixelperfektion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="hover:underline"
          >
            pixelperfektion
          </a>
          {" on "}
          <a
            href="https://unsplash.com/photos/OS2WODdxy1A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            className="hover:underline"
          >
            Unsplash
          </a>
        </div> */}
      </AspectRatio>
    </div>
  );
};

export default AuthLayout;
