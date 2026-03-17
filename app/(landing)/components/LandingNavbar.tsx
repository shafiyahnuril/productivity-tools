"use client";

import { useTheme } from "./useTheme";
import { Menu, X, Moon, Sun, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

export function LandingNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--background) 88%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              <BookOpen size={17} strokeWidth={2} />
            </div>
            <span
              className="hidden sm:block text-[15px] font-bold leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Productivity
              <span style={{ color: "var(--primary)", fontStyle: "italic" }}> Tools</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
                style={{ color: "var(--foreground-secondary)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--surface-elevated)";
                  el.style.color = "var(--foreground)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = "var(--foreground-secondary)";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
              className="w-[38px] h-[38px] rounded-xl border flex items-center justify-center transition-all duration-200 active:scale-95"
              style={{
                background: "var(--surface-elevated)",
                borderColor: "var(--border)",
                color: "var(--foreground-secondary)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--foreground-secondary)")}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Open App CTA */}
            <Link href="/dashboard" className="hidden sm:block">
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "var(--shadow-md)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "var(--shadow-sm)";
                  el.style.transform = "translateY(0)";
                }}
              >
                Open App
              </button>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-[38px] h-[38px] rounded-xl border flex items-center justify-center transition-all duration-200 active:scale-95"
              style={{
                background: "var(--surface-elevated)",
                borderColor: "var(--border)",
                color: "var(--foreground-secondary)",
              }}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div
            className="md:hidden border-t"
            style={{ background: "var(--background)", borderColor: "var(--border)" }}
          >
            <div className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { scrollToSection(item.id); setIsOpen(false); }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                  style={{ color: "var(--foreground-secondary)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--surface-elevated)";
                    el.style.color = "var(--foreground)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "transparent";
                    el.style.color = "var(--foreground-secondary)";
                  }}
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <Link href="/dashboard">
                  <button
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5"
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    Open App
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Navbar spacer */}
      <div className="h-16" />
    </>
  );
}
