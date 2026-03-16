"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Clock, Calendar, BarChart2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ThemeToggler from "./ThemeToggler";

export default function BottomNavigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/notes", label: "Notes", icon: FileText },
    { href: "/timer", label: "Focus", icon: Clock },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
  ];

  return (
    <nav
      ref={navRef}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-white/5 z-50 pb-safe"
    >
      <div className="flex justify-around items-center h-16">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-primary" : "text-textDisabled"
              }`}
            >
              <Icon size={20} className={isActive ? "text-primary" : ""} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {link.label}
              </span>
            </Link>
          );
        })}
        <div className="flex flex-col items-center justify-center w-full h-full">
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}
