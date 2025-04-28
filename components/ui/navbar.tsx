"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DynamicWidget } from "@/lib/dynamic";
import { Menu, X } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, label, isActive }: NavItemProps) => (
  <Link
    href={href}
    className={cn(
      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
      isActive
        ? "bg-primary text-primary-foreground"
        : "hover:bg-accent hover:text-accent-foreground"
    )}
  >
    {label}
  </Link>
);

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/contract-generator", label: "Smart Contract Generator" },
    { href: "/documentation", label: "Documentation" },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#ff9103] via-blue-500 to-[#ff70e1] bg-clip-text text-transparent">
              RootWrite
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={pathname === item.href}
              />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DynamicWidget variant="modal" />

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden py-4 px-4 border-t">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
