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
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/timer", label: "Focus", icon: Clock },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/todo", label: "To-Do", icon: CheckSquare },
  { href: "/analytics", label: "Stats", icon: BarChart2 },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-6 left-4 right-4 bg-background-secondary/95 backdrop-blur-md border border-border/50 shadow-2xl z-50 rounded-full overflow-hidden">
      {/* Subtle top highlight line */}
      <div
        className="absolute top-0 left-6 right-6 h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div className="flex justify-around items-center h-16 px-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full"
            >
              {/* Active background pill */}
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(249,115,22,0.12)" }}
                  layoutId="bottom-nav-active"
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
              )}

              {/* Icon + active dot */}
              <motion.div
                className="relative flex items-center justify-center"
                style={{
                  color: isActive ? "#f97316" : "var(--foreground-secondary)",
                }}
                whileTap={{ scale: 0.78 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <motion.span
                  animate={isActive ? { scale: 1, y: -1 } : { scale: 1, y: 0 }}
                  whileHover={{ scale: 1.18 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Icon
                    size={20}
                    style={{
                      strokeWidth: isActive ? 2.5 : 1.8,
                      filter: isActive
                        ? "drop-shadow(0 0 5px rgba(249,115,22,0.5))"
                        : "none",
                    }}
                  />
                </motion.span>
              </motion.div>

              {/* Active indicator dot below icon */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    className="absolute bottom-1 rounded-full"
                    style={{
                      width: "4px",
                      height: "4px",
                      background: "#f97316",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </AnimatePresence>

              {/* Label pop on active */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    className="absolute -bottom-5 text-[8px] font-bold uppercase tracking-widest whitespace-nowrap"
                    style={{ color: "#f97316" }}
                    initial={{ opacity: 0, y: -4, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
