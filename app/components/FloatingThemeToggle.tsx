"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useStore } from "../store/useStore";

export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const fabMenuOpen = useStore((s) => s.fabMenuOpen);

  return (
    <button
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      className={`fixed right-4 md:bottom-8 md:right-8 w-14 h-14 bg-background-secondary/90 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 z-50 ${
        fabMenuOpen ? "bottom-85" : "bottom-44"
      }`}
    >
      {theme === "light" ? <Moon size={28} /> : <Sun size={28} />}
    </button>
  );
}
