"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Clock, FileText, Calendar, CheckSquare, BarChart2 } from "lucide-react";

/* Feature pills shown below the CTAs */
const featurePills = [
  { icon: Calendar,    label: "Kalender",     color: "#3B7EC2", bg: "rgba(59,126,194,0.1)" },
  { icon: FileText,    label: "Catatan",      color: "#D97706", bg: "rgba(217,119,6,0.1)" },
  { icon: CheckSquare, label: "To-Do",        color: "#5A8A6E", bg: "rgba(90,138,110,0.1)" },
  { icon: Clock,       label: "Timer Fokus",  color: "#C4574A", bg: "rgba(196,87,74,0.1)" },
  { icon: BarChart2,   label: "Analitik",     color: "#7C3AED", bg: "rgba(124,58,237,0.1)" },
];

export function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-5"
      style={{ paddingTop: "5rem", paddingBottom: "4rem" }}
    >
      {/* ── Animated background blobs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-60px", left: "-80px", width: "340px", height: "340px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,119,6,0.13) 0%, transparent 70%)",
          animation: "blob-drift 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-40px", right: "-60px", width: "300px", height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          animation: "blob-drift 11s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "60px", left: "10%", width: "260px", height: "260px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,138,110,0.1) 0%, transparent 70%)",
          animation: "blob-drift 13s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />

      {/* ── Floating sticker chips ── */}
      {/* Chip 1 */}
      <div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-md text-sm font-medium pointer-events-none select-none"
        style={{
          top: "22%", left: "6%",
          background: "#FEF3C7", color: "#92400E",
          fontFamily: "var(--font-hand)",
          fontSize: "1rem",
          transform: "rotate(-8deg)",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
          animation: "float 5s ease-in-out infinite",
          "--r": "-8deg",
        } as React.CSSProperties}
      >
        ✏️ tetap fokus
      </div>

      {/* Chip 2 */}
      <div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-md text-sm font-medium pointer-events-none select-none"
        style={{
          top: "20%", right: "7%",
          background: "#EDE9FE", color: "#4C1D95",
          fontFamily: "var(--font-hand)",
          fontSize: "1rem",
          transform: "rotate(6deg)",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "1s",
          "--r": "6deg",
        } as React.CSSProperties}
      >
        🎯 capai tujuanmu
      </div>

      {/* Chip 3 */}
      <div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl shadow-md text-sm font-medium pointer-events-none select-none"
        style={{
          bottom: "22%", right: "8%",
          background: "#D1FAE5", color: "#065F46",
          fontFamily: "var(--font-hand)",
          fontSize: "1rem",
          transform: "rotate(-4deg)",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
          animation: "float 7s ease-in-out infinite",
          animationDelay: "0.5s",
          "--r": "-4deg",
        } as React.CSSProperties}
      >
        📚 belajar lebih pintar
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Badge pill */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--border)",
            color: "var(--foreground-secondary)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Zap size={13} style={{ color: "var(--primary)" }} />
          <span>Inovasi Produktivitas Belajar</span>
          <Zap size={13} style={{ color: "var(--primary)" }} />
        </motion.div>

        {/* Main Headline in Playfair Display */}
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
          Workspace produktif{" "}
          <br className="hidden sm:block" />
          untuk{" "}
          <span
            style={{ color: "var(--primary)", fontStyle: "italic", position: "relative", display: "inline-block" }}
          >
            pelajar modern
            {/* Wavy SVG underline */}
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
                opacity="0.7"
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
          Ruang kerja yang indah dan bebas distraksi, dirancang sesuai cara belajar kamu.
          <br className="hidden md:block" />
          <span style={{ color: "var(--foreground-tertiary)", fontSize: "0.95rem" }}>
            Calendar, notes, tasks, focus timer, and analytics — all in one elegant place.
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
            <button
              className="flex items-center gap-2 px-8 py-3 rounded-[10px] font-semibold text-lg transition-all duration-200 active:scale-95"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
                boxShadow: "var(--shadow-sm)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              Mulai Gratis
              <ArrowRight size={18} />
            </button>
          </Link>

          <button
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-[10px] font-semibold text-lg transition-all duration-200 active:scale-95"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--surface-elevated)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            Lihat Fitur
          </button>
        </motion.div>

        {/* Feature pills row */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {featurePills.map((pill) => {
            const Icon = pill.icon;
            return (
              <div
                key={pill.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium cursor-default transition-all duration-200"
                style={{
                  background: pill.bg,
                  border: "1px solid var(--border)",
                  color: pill.color,
                  boxShadow: "var(--shadow-xs)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "var(--shadow-xs)";
                }}
              >
                <Icon size={15} strokeWidth={1.8} />
                {pill.label}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
