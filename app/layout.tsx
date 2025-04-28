import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/lib/providers";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RootWrite | Smart Contract Generator for Rootstock",
  description: "Create, customize, and deploy smart contracts on the Rootstock blockchain using AI",
  keywords: ["Rootstock", "smart contracts", "blockchain", "AI", "RBTC", "Web3"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col ">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
