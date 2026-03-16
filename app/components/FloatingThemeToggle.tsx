"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      className="fixed bottom-[6.5rem] right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-background-secondary/90 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 z-50"
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}
