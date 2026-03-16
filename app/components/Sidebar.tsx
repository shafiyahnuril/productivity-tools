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
  User,
  Settings,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Notes", href: "/notes", icon: FileText },
    { name: "Focus Timer", href: "/timer", icon: Clock },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "To-Do", href: "/todo", icon: CheckSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
  ];

  const bottomItems = [
    { name: "Account", href: "/account", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const NavLink = ({
    item,
  }: {
    item: { href: string; name: string; icon: React.ElementType };
  }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={`flex flex-col items-center justify-center w-16 h-16 mb-2 rounded-[12px] transition-colors ${
          isActive
            ? "bg-paper-accent/10 text-paper-accent"
            : "text-paper-fg3 hover:bg-paper-bg2 hover:text-paper-fg"
        }`}
      >
        <item.icon className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
      </Link>
    );
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 md:w-24 bg-paper-bg border-r border-paper-bd flex-col items-center py-6 overflow-y-auto z-40">
      <div className="w-10 h-10 bg-paper-accent/20 text-paper-accent rounded-full flex items-center justify-center mb-8 font-black text-xl tracking-tighter">
        T
      </div>

      <nav className="flex-1 flex flex-col items-center w-full space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center w-full pt-4 border-t border-paper-bd space-y-2">
        <ThemeToggle />
        {bottomItems.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
      </div>
    </aside>
  );
}
