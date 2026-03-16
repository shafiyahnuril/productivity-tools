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

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Notes", href: "/notes", icon: FileText },
    { name: "Focus", href: "/timer", icon: Clock },
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
        className={`flex flex-col items-center justify-center w-16 h-16 mb-1 rounded-2xl transition-all duration-200 active:scale-95 ${
          isActive
            ? "bg-primary/15 text-primary"
            : "text-foreground-secondary hover:bg-surface-tertiary hover:text-foreground"
        }`}
      >
        <item.icon className="w-5 h-5 mb-1" />
        <span className="text-[9px] font-bold uppercase tracking-widest">
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 md:w-24 bg-background-secondary border-r border-border flex-col items-center py-6 overflow-y-auto z-40">
      {/* Logo badge */}
      <div className="w-10 h-10 bg-primary/15 text-primary rounded-2xl flex items-center justify-center mb-8 font-black text-sm tracking-tighter select-none">
        PA
      </div>

      <nav className="flex-1 flex flex-col items-center w-full">
        {navItems.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center w-full pt-4 border-t border-border gap-0.5">
        {bottomItems.map((item) => (
          <NavLink key={item.name} item={item} />
        ))}
      </div>
    </aside>
  );
}
