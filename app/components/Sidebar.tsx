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
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
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

function NavLink({
  item,
  isActive,
}: {
  item: { href: string; name: string; icon: React.ElementType };
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="relative flex flex-col items-center justify-center w-16 h-16 mb-1 rounded-2xl group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Active glow ring */}
      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "rgba(217,119,6,0.12)",
            border: "1.5px solid rgba(217,119,6,0.25)",
          }}
          layoutId="sidebar-active-bg"
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        />
      )}

      {/* Active left-border indicator */}
      {isActive && (
        <motion.span
          className="absolute -left-[3px] top-3 bottom-3 rounded-full"
          style={{ width: "3px", background: "var(--primary)" }}
          layoutId="sidebar-indicator"
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        />
      )}

      {/* Hover background */}
      {!isActive && hovered && (
        <motion.span
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: "var(--surface-tertiary)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
        />
      )}

      <motion.span
        className="relative flex flex-col items-center justify-center gap-1"
        style={{ color: isActive ? "#f97316" : "var(--foreground-secondary)" }}
        animate={
          isActive
            ? { color: "#f97316" }
            : { color: "var(--foreground-secondary)" }
        }
        whileHover={{ color: "var(--foreground)" }}
        whileTap={{ scale: 0.88 }}
        transition={{ duration: 0.15 }}
      >
        <motion.span
          whileHover={{ scale: 1.2, rotate: isActive ? 0 : 8 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} />
        </motion.span>
        <span className="text-[9px] font-bold uppercase tracking-widest">
          {item.name}
        </span>
      </motion.span>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && !isActive && (
          <motion.div
            className="absolute left-full ml-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap pointer-events-none z-50"
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            }}
            initial={{ opacity: 0, x: -6, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.92 }}
            transition={{ duration: 0.15 }}
          >
            {item.name}
            {/* Arrow */}
            <span
              className="absolute right-full top-1/2 -translate-y-1/2"
              style={{
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
                borderRight: "5px solid var(--foreground)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const isItemActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 md:w-24 bg-background-secondary border-r border-border flex-col items-center py-6 overflow-y-auto z-40">
      {/* Logo badge */}
      <Link href="/" title="Back to Home">
        <motion.div
          className="w-10 h-10 bg-primary/15 text-primary rounded-2xl flex items-center justify-center mb-8 font-black text-sm tracking-tighter select-none"
          whileHover={{
            scale: 1.12,
            background: "rgba(217,119,6,0.25)",
            boxShadow: "0 4px 16px rgba(217,119,6,0.35)",
            rotate: -8,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          PA
        </motion.div>
      </Link>

      <nav className="flex-1 flex flex-col items-center w-full">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            item={item}
            isActive={isItemActive(item.href)}
          />
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center w-full pt-4 border-t border-border gap-0.5">
        {bottomItems.map((item) => (
          <NavLink
            key={item.name}
            item={item}
            isActive={isItemActive(item.href)}
          />
        ))}
      </div>
    </aside>
  );
}
