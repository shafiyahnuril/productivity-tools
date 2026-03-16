"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Clock, Calendar, BarChart2, Sun, Moon } from "lucide-react";
import { useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function BottomNavigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/notes", label: "Notes", icon: FileText },
    { href: "/timer", label: "Focus", icon: Clock },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/analytics", label: "Stats", icon: BarChart2 },
  ];

  return (
    <nav
      ref={navRef}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-background-secondary/95 backdrop-blur-md border-t border-border z-50 pb-safe"
    >
      <div className="flex justify-around items-center h-16">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? "text-primary" : "text-foreground-tertiary"
              }`}
            >
              <Icon size={20} />
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {link.label}
              </span>
            </Link>
          );
        })}

        {/* Theme toggle as last nav item */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center w-full h-full gap-1 text-foreground-tertiary transition-colors hover:text-foreground"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          <span className="text-[9px] font-bold uppercase tracking-widest">
            Theme
          </span>
        </button>
      </div>
    </nav>
  );
}
