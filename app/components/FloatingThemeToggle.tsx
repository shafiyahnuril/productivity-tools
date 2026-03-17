"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import gsap from "gsap";
import { useTheme } from "./ThemeProvider";
import { useStore } from "../store/useStore";

/* ── Animated Moon icon with twinkling stars ── */
function MoonWithStars() {
  return (
    <motion.div
      initial={{ rotate: -70, scale: 0.3, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      exit={{ rotate: 70, scale: 0.3, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Moon size={23} strokeWidth={1.8} />

      {/* Star 1 — top-right */}
      <motion.span
        style={{
          position: "absolute",
          top: -7,
          right: -7,
          fontSize: "9px",
          lineHeight: 1,
          color: "var(--primary)",
          pointerEvents: "none",
        }}
        animate={{
          scale: [0.8, 1.4, 0.8],
          opacity: [0.5, 1, 0.5],
          rotate: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        ★
      </motion.span>

      {/* Star 2 — bottom-right */}
      <motion.span
        style={{
          position: "absolute",
          bottom: -4,
          right: -9,
          fontSize: "6px",
          lineHeight: 1,
          color: "var(--foreground-secondary)",
          pointerEvents: "none",
        }}
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0.8, 0.3],
          rotate: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.7,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        ★
      </motion.span>

      {/* Star 3 — top-left (smaller) */}
      <motion.span
        style={{
          position: "absolute",
          top: 0,
          left: -10,
          fontSize: "5px",
          lineHeight: 1,
          color: "var(--foreground-tertiary)",
          pointerEvents: "none",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: "easeInOut",
          delay: 1.1,
        }}
      >
        ✦
      </motion.span>
    </motion.div>
  );
}

/* ── Animated Sun icon with rotating rays ── */
function SunWithRays() {
  return (
    <motion.div
      initial={{ rotate: 90, scale: 0.3, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      exit={{ rotate: -90, scale: 0.3, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Rotating ray ring behind the sun */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{
          position: "absolute",
          inset: -8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 2,
              height: 6,
              borderRadius: 2,
              background: "var(--primary)",
              opacity: 0.55,
              transform: `rotate(${i * 45}deg) translateY(-16px)`,
            }}
          />
        ))}
      </motion.div>

      <Sun size={23} strokeWidth={1.8} />
    </motion.div>
  );
}

/* ── Main component ── */
export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const fabMenuOpen = useStore((s) => s.fabMenuOpen);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track desktop vs. mobile for position calculation
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 950);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── GSAP ripple theme transition ── */
  const handleToggle = () => {
    const btn = buttonRef.current;
    if (!btn) {
      toggleTheme();
      return;
    }

    const rect = btn.getBoundingClientRect();
    const originX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const originY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

    // Create a full-screen overlay with the new theme's background colour
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

    // Expand circle to cover screen
    gsap.to(overlay, {
      clipPath: `circle(155% at ${originX}% ${originY}%)`,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        // Momentarily suppress CSS transitions so the theme swap is instant
        document.documentElement.classList.add("no-transition");
        toggleTheme();

        // Re-enable transitions on the next two animation frames
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.documentElement.classList.remove("no-transition");

            // Retract circle to reveal new theme
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

  /* ── Animated position — spring from old to new bottom value ── */
  const mobileBottom = fabMenuOpen ? 340 : 176;

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleToggle}
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      className="fixed w-14 h-14 bg-background-secondary/90 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center rounded-full shadow-lg z-50"
      animate={
        isDesktop
          ? { bottom: 32, right: 32 }
          : { bottom: mobileBottom, right: 16 }
      }
      transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.9 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: "fixed",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <MoonWithStars key="moon" />
        ) : (
          <SunWithRays key="sun" />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
