"use client";

import { useTheme } from "./useTheme";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function LandingNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Features", id: "features" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary/15 text-primary rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform duration-200">
              PA
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-bold text-foreground">Productivity</span>
              <span className="text-xs text-foreground-tertiary">Tools</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-foreground-secondary hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
              className="w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-foreground-secondary hover:text-foreground hover:bg-surface transition-all duration-200 active:scale-95"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-foreground-secondary hover:text-foreground transition-all duration-200 active:scale-95"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* CTA Button - Desktop */}
            <Link href="/dashboard" className="hidden sm:block">
              <button className="px-5 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:shadow-sm active:scale-95 transition-all duration-200">
                Enter
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-border/40">
            <div className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-foreground-secondary hover:text-foreground hover:bg-surface-elevated rounded-lg transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Link href="/dashboard" className="w-full">
                <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:shadow-sm active:scale-95 transition-all duration-200">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Navbar Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
