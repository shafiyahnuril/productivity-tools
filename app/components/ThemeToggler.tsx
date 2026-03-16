"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-surface-elevated animate-pulse border border-border" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface hover:bg-surface-elevated border border-border transition-colors text-foreground-secondary hover:text-foreground hover:scale-95 active:scale-90"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 transition-all" />
      ) : (
        <Moon className="w-5 h-5 transition-all" />
      )}
    </button>
  );
}
