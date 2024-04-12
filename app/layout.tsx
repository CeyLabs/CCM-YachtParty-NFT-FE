import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Exo } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

const exo = Exo({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Ceylon Crypto Meetup",
  description: "Ceylon Crypto Meetup - Halving Yacht Party",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
