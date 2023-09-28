import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextAuthProvider from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Poppins({ subsets: ['latin'], weight: '500'});

export const metadata: Metadata = {
  title: "SoleCrafted",
  description: "Get a new sole!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={inter.className} >
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
