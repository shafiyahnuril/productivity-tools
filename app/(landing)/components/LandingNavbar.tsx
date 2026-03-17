"use client";

import { useTheme } from "./useTheme";
import { Menu, X, Moon, Sun, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../../store/useStore";
import { useRef } from "react";
import gsap from "gsap";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

export function LandingNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const router = useRouter();
  const setLandingTransition = useStore((s) => s.setLandingTransition);
  const themeBtnRef = useRef<HTMLButtonElement>(null);

  const handleToggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = themeBtnRef.current;
    if (!btn) {
      toggleTheme();
      return;
    }

    const rect = btn.getBoundingClientRect();
    const originX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const originY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

    const overlay = document.createElement("div");
    const newBg = theme === "light" ? "#141312" : "#faf7f2";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9998;
      pointer-events: none;
      background: ${newBg};
      clip-path: circle(0% at ${originX}% ${originY}%);
      will-change: clip-path;
    `;
    document.body.appendChild(overlay);

    gsap.to(overlay, {
      clipPath: `circle(155% at ${originX}% ${originY}%)`,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        document.documentElement.classList.add("no-transition");
        toggleTheme();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.documentElement.classList.remove("no-transition");
            gsap.to(overlay, {
              clipPath: `circle(0% at ${originX}% ${originY}%)`,
              duration: 0.4,
              ease: "power3.inOut",
              onComplete: () => overlay.remove(),
            });
          });
        });
      },
    });
  };

  const handleOpenApp = (e: React.MouseEvent) => {
    e.preventDefault();
    setLandingTransition(true);
    setTimeout(() => router.push("/dashboard"), 700);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 20);
      setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);

      // Determine active section
      const sections = ["hero", "features", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
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
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--primary), #7C3AED)",
            opacity: scrolled ? 1 : 0,
          }}
        />

        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: "var(--primary)", color: "#fff" }}
              whileHover={{
                scale: 1.12,
                rotate: -8,
                boxShadow: "0 4px 16px rgba(217,119,6,0.45)",
              }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <BookOpen size={17} strokeWidth={2} />
            </motion.div>
            <motion.span
              className="hidden sm:block text-[15px] font-bold leading-none"
              style={{ fontFamily: "var(--font-display)" }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              Productivity
              <span style={{ color: "var(--primary)", fontStyle: "italic" }}>
                {" "}
                Tools
              </span>
            </motion.span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200"
                  style={{
                    color: isActive
                      ? "var(--primary)"
                      : "var(--foreground-secondary)",
                  }}
                  whileHover={{
                    background: "var(--surface-elevated)",
                    color: "var(--foreground)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-1.5 left-1/2"
                      style={{
                        transform: "translateX(-50%)",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "var(--primary)",
                        display: "block",
                      }}
                      layoutId="nav-dot"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              ref={themeBtnRef}
              onClick={handleToggleTheme}
              title={theme === "light" ? "Dark Mode" : "Light Mode"}
              className="w-[38px] h-[38px] rounded-xl border flex items-center justify-center"
              style={{
                background: "var(--surface-elevated)",
                borderColor: "var(--border)",
                color: "var(--foreground-secondary)",
              }}
              whileHover={{
                scale: 1.08,
                color: "var(--foreground)",
                borderColor: "var(--primary)",
              }}
              whileTap={{ scale: 0.92, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
              </motion.span>
            </motion.button>

            {/* Open App CTA */}
            <a
              href="/dashboard"
              onClick={handleOpenApp}
              className="hidden sm:block"
            >
              <motion.button
                className="btn-shine relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold overflow-hidden"
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  boxShadow: "0 2px 10px rgba(217,119,6,0.35)",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -1,
                  boxShadow: "0 5px 20px rgba(217,119,6,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                Open App
              </motion.button>
            </a>

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-[38px] h-[38px] rounded-xl border flex items-center justify-center"
              style={{
                background: "var(--surface-elevated)",
                borderColor: "var(--border)",
                color: "var(--foreground-secondary)",
              }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.1 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden border-t overflow-hidden"
              style={{
                background: "var(--background)",
                borderColor: "var(--border)",
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="flex flex-col p-4 gap-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{ color: "var(--foreground-secondary)" }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{
                      background: "var(--surface-elevated)",
                      color: "var(--foreground)",
                      x: 4,
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div
                  className="mt-3 pt-3"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <a href="/dashboard" onClick={handleOpenApp}>
                    <motion.button
                      className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5"
                      style={{
                        background: "var(--primary)",
                        color: "#fff",
                        boxShadow: "var(--shadow-sm)",
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Open App
                    </motion.button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Navbar spacer */}
      <div className="h-16" />
    </>
  );
}
