"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Clock,
  Calendar,
  CheckSquare,
  BarChart2,
} from "lucide-react";
import { useRef } from "react";

export default function BottomNavigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const links = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/notes", label: "Notes", icon: FileText },
    { href: "/timer", label: "Focus", icon: Clock },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/todo", label: "To-Do", icon: CheckSquare },
    { href: "/analytics", label: "Stats", icon: BarChart2 },
  ];

  return (
    <nav
      ref={navRef}
      className="md:hidden fixed bottom-6 left-4 right-4 bg-background-secondary/95 backdrop-blur-md border border-border/50 shadow-2xl z-50 rounded-full"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-foreground-secondary hover:text-foreground hover:bg-surface-tertiary"
              }`}
            >
              <Icon
                size={20}
                className={isActive ? "stroke-[2.5]" : "stroke-2"}
              />
              {/* Note: Icon-only layout for floating navbar as requested/referenced */}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
