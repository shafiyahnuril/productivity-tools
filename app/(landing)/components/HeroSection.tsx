"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FileText,
  Calendar,
  CheckSquare,
  BarChart2,
  ChevronDown,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

/* Feature pills shown below the CTAs */
const featurePills = [
  {
    icon: Calendar,
    label: "Calendar",
    color: "#3B7EC2",
    bg: "rgba(59,126,194,0.1)",
    delay: 0,
  },
  {
    icon: FileText,
    label: "Notes",
    color: "#D97706",
    bg: "rgba(217,119,6,0.1)",
    delay: 0.06,
  },
  {
    icon: CheckSquare,
    label: "To-Do",
    color: "#5A8A6E",
    bg: "rgba(90,138,110,0.1)",
    delay: 0.12,
  },
  {
    icon: Clock,
    label: "Focus Timer",
    color: "#C4574A",
    bg: "rgba(196,87,74,0.1)",
    delay: 0.18,
  },
  {
    icon: BarChart2,
    label: "Analytics",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.1)",
    delay: 0.24,
  },
];

/* Decorative sticker chips */
const chips = [
  {
    text: "stay focused",
    top: "22%",
    left: "6%",
    rotate: "-8deg",
    bg: "#FEF3C7",
    color: "#92400E",
    delay: 0,
    duration: "5s",
    r: "-8deg",
  },
  {
    text: "reach your goals",
    top: "20%",
    right: "7%",
    rotate: "6deg",
    bg: "#EDE9FE",
    color: "#4C1D95",
    delay: "1s",
    duration: "6s",
    r: "6deg",
  },
  {
    text: "learn smarter",
    bottom: "22%",
    right: "8%",
    rotate: "-4deg",
    bg: "#D1FAE5",
    color: "#065F46",
    delay: "0.5s",
    duration: "7s",
    r: "-4deg",
  },
  {
    text: "track progress",
    bottom: "30%",
    left: "5%",
    rotate: "5deg",
    bg: "#FCE7F3",
    color: "#9D174D",
    delay: "2s",
    duration: "5.5s",
    r: "5deg",
  },
];

/* Floating mini stat cards */
const miniStats = [
  {
    label: "Tasks done today",
    value: "12",
    icon: CheckSquare,
    color: "#5A8A6E",
    top: "40%",
    left: "2%",
    delay: "0.8s",
    duration: "8s",
  },
  {
    label: "Focus streak",
    value: "5d",
    icon: Zap,
    color: "#D97706",
    top: "55%",
    right: "2%",
    delay: "1.8s",
    duration: "9s",
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const animFrameRef = useRef<number | null>(null);

  /* Throttled mouse spotlight */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlightPos({ x, y });
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-5"
      style={{ paddingTop: "5rem", paddingBottom: "4rem" }}
    >
      {/* ── Mouse-following spotlight ── */}
      <div
        ref={spotlightRef}
        className="absolute pointer-events-none"
        style={{
          left: `${spotlightPos.x}%`,
          top: `${spotlightPos.y}%`,
          width: "520px",
          height: "520px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 70%)",
          transition: "left 0.08s linear, top 0.08s linear",
          zIndex: 0,
        }}
      />

      {/* ── Animated background blobs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-60px",
          left: "-80px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(217,119,6,0.14) 0%, transparent 70%)",
          animation: "blob-drift 9s ease-in-out infinite",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-40px",
          right: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.11) 0%, transparent 70%)",
          animation: "blob-drift 11s ease-in-out infinite reverse",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "60px",
          left: "10%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(90,138,110,0.10) 0%, transparent 70%)",
          animation: "blob-drift 13s ease-in-out infinite",
          animationDelay: "2s",
          filter: "blur(2px)",
        }}
      />
      {/* Extra blob — bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20px",
          right: "8%",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,87,74,0.08) 0%, transparent 70%)",
          animation: "blob-drift 10s ease-in-out infinite reverse",
          animationDelay: "3s",
          filter: "blur(2px)",
        }}
      />

      {/* ── Subtle dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Floating sticker chips ── */}
      {chips.map((chip, i) => (
        <div
          key={i}
          className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-md text-sm font-medium pointer-events-none select-none"
          style={
            {
              top: chip.top,
              left: chip.left,
              right: chip.right,
              bottom: chip.bottom,
              background: chip.bg,
              color: chip.color,
              fontFamily: "var(--font-hand)",
              fontSize: "1rem",
              transform: `rotate(${chip.rotate})`,
              boxShadow: "2px 4px 14px rgba(0,0,0,0.10)",
              animation: `float ${chip.duration} ease-in-out infinite`,
              animationDelay: chip.delay,
              "--r": chip.r,
            } as React.CSSProperties
          }
        >
          {chip.text}
        </div>
      ))}

      {/* ── Floating mini stat cards ── */}
      {miniStats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="absolute hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl pointer-events-none select-none"
            style={
              {
                top: stat.top,
                left: stat.left,
                right: stat.right,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                animation: `float ${stat.duration} ease-in-out infinite`,
                animationDelay: stat.delay,
              } as React.CSSProperties
            }
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${stat.color}18` }}
            >
              <Icon size={14} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-[10px] text-foreground-tertiary leading-none">
                {stat.label}
              </p>
              <p className="text-sm font-bold text-foreground leading-tight">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge pill with sparkle */}
        <motion.div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-8 cursor-default relative overflow-hidden"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--border)",
            color: "var(--foreground-secondary)",
            boxShadow: "0 2px 12px rgba(217,119,6,0.10)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 4px 20px rgba(217,119,6,0.2)",
          }}
        >
          {/* Shine sweep on hover (CSS class btn-shine) */}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.12) 50%, transparent 100%)",
              transform: "translateX(-100%)",
              transition: "transform 0.5s ease",
            }}
          />
          <Sparkles size={14} style={{ color: "var(--primary)" }} />
          <span>Boost Your Learning Productivity</span>
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "var(--primary)",
              animation: "nav-dot-pulse 2s ease-in-out infinite",
            }}
          />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="mb-6 leading-[1.1]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Turn Chaos into Clarity <br className="hidden sm:block" />
          with Your{" "}
          <span
            style={{
              color: "var(--primary)",
              fontStyle: "italic",
              position: "relative",
              display: "inline-block",
            }}
          >
            Second Brain
            {/* Animated wavy SVG underline */}
            <svg
              viewBox="0 0 220 12"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                bottom: "-6px",
                left: 0,
                width: "100%",
                height: "10px",
                overflow: "visible",
              }}
            >
              <path
                d="M2 6 Q27 2, 55 6 Q82 10, 110 6 Q138 2, 165 6 Q192 10, 218 6"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                opacity="0.75"
                style={{
                  animation: "draw 1.2s ease forwards",
                  animationDelay: "0.7s",
                }}
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: "1.1rem", color: "var(--foreground-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A beautiful, distraction-free workspace, designed for the way you
          learn.
          <br className="hidden md:block" />
          <span
            style={{ color: "var(--foreground-tertiary)", fontSize: "0.95rem" }}
          >
            Calendar, notes, tasks, focus timer, and analytics — all in one
            elegant place.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/dashboard">
            <motion.button
              className="btn-shine relative flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-lg overflow-hidden group"
              style={{
                background: "var(--primary)",
                color: "#fff",
                boxShadow: "0 4px 14px rgba(217,119,6,0.4)",
              }}
              whileHover={{
                scale: 1.04,
                y: -2,
                boxShadow: "0 8px 24px rgba(217,119,6,0.55)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Get Started Free
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={18} />
              </motion.span>
              {/* Pulse ring behind button */}
              <span
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  border: "2px solid rgba(217,119,6,0.6)",
                  animation: "pulse-ring 2s ease-out infinite",
                }}
              />
            </motion.button>
          </Link>

          <motion.button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-lg"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            whileHover={{
              scale: 1.03,
              background: "var(--surface-elevated)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <Target size={17} className="icon-wag" />
            Explore Features
          </motion.button>
        </motion.div>

        {/* Feature pills row */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {featurePills.map((pill) => {
            const Icon = pill.icon;
            return (
              <motion.div
                key={pill.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-default"
                style={{
                  background: pill.bg,
                  border: "1px solid var(--border)",
                  color: pill.color,
                  boxShadow: "var(--shadow-xs)",
                }}
                whileHover={{
                  y: -4,
                  scale: 1.06,
                  boxShadow: `0 8px 22px rgba(0,0,0,0.10)`,
                  borderColor: pill.color + "55",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                  delay: pill.delay,
                }}
              >
                <motion.span
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={15} strokeWidth={1.8} />
                </motion.span>
                {pill.label}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center gap-1 cursor-pointer select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onClick={() =>
            document
              .getElementById("features")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-xs text-foreground-tertiary tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown
              size={20}
              style={{ color: "var(--foreground-tertiary)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
