"use client";

import { Clock, FileText, Calendar, CheckSquare, BarChart2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const tools = [
  {
    icon: Clock,
    titleEn: "Focus Timer",
    titleId: "Timer Fokus",
    desc: "Tingkatkan konsentrasi dengan metode Pomodoro. Atur sesi fokus dan istirahat untuk produktivitas maksimal.",
    features: ["Pomodoro technique", "Custom session durations", "Focus session history"],
    color: "#C4574A",
    bg: "rgba(196,87,74,0.1)",
    tape: "rgba(196,87,74,0.35)",
    path: "/dashboard",
  },
  {
    icon: FileText,
    titleEn: "Smart Notes",
    titleId: "Catatan Pintar",
    desc: "Simpan ide dan catatan penting dengan cepat. Akses kapan saja dalam satu tempat yang bersih.",
    features: ["Quick capture", "Tag & categorize notes", "Search across all notes"],
    color: "#D97706",
    bg: "rgba(217,119,6,0.1)",
    tape: "rgba(253,224,71,0.55)",
    path: "/dashboard",
  },
  {
    icon: Calendar,
    titleEn: "Calendar",
    titleId: "Kalender",
    desc: "Rencanakan jadwal mingguan dan bulanan Anda. Jangan pernah melewatkan tanggal penting lagi.",
    features: ["Weekly & monthly views", "Event management", "Schedule at a glance"],
    color: "#3B7EC2",
    bg: "rgba(59,126,194,0.1)",
    tape: "rgba(59,126,194,0.32)",
    path: "/dashboard",
  },
  {
    icon: CheckSquare,
    titleEn: "To-Do List",
    titleId: "Daftar Tugas",
    desc: "Kelola tugas harian dengan mudah. Tetapkan prioritas dan pantau progress penyelesaian tugas Anda.",
    features: ["Priority levels", "Due date reminders", "Progress tracking"],
    color: "#5A8A6E",
    bg: "rgba(90,138,110,0.1)",
    tape: "rgba(90,138,110,0.4)",
    path: "/dashboard",
  },
  {
    icon: BarChart2,
    titleEn: "Analytics",
    titleId: "Analitik",
    desc: "Lihat tren produktivitas Anda secara visual. Pahami kebiasaan kerja dan raih target lebih cepat.",
    features: ["Visual charts", "Weekly summaries", "Goal completion rate"],
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.1)",
    tape: "rgba(167,139,250,0.45)",
    path: "/dashboard",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function FeatureSection() {
  return (
    <section id="features" className="py-16 md:py-24 px-4" style={{ background: "var(--background-secondary)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Caveat label */}
          <div className="inline-block mb-4">
            <span
              className="text-xl"
              style={{
                fontFamily: "var(--font-hand)",
                color: "var(--primary)",
                borderBottom: "2px dashed var(--primary)",
                paddingBottom: "2px",
              }}
            >
              ✦ fitur unggulan
            </span>
          </div>

          {/* Playfair Display heading */}
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--foreground)",
              lineHeight: 1.2,
            }}
          >
            Semua yang Anda Butuhkan,{" "}
            <br className="hidden sm:block" />
            <em style={{ color: "var(--primary)" }}>semua dalam satu tempat.</em>
          </h2>

          <p className="text-base text-foreground-secondary max-w-xl mx-auto">
            Everything you need to stay focused, organized, and on track — built for the modern student.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.titleEn}
                variants={cardVariants}
                data-feature-card
                className="relative flex flex-col"
                style={{ paddingTop: "12px" }}
              >
                {/* Tape strip */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%) rotate(-1.5deg)",
                    width: "60px",
                    height: "22px",
                    background: tool.tape,
                    borderRadius: "3px",
                    zIndex: 10,
                  }}
                />

                {/* Card */}
                <div
                  className="flex flex-col flex-1 rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    boxShadow: "2px 4px 18px rgba(0,0,0,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "4px 10px 32px rgba(0,0,0,0.12)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "2px 4px 18px rgba(0,0,0,0.07)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: tool.bg }}
                    >
                      <Icon size={26} strokeWidth={1.8} style={{ color: tool.color }} />
                    </div>

                    {/* Titles */}
                    <div>
                      <h3
                        className="font-semibold text-foreground text-lg leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {tool.titleEn}
                      </h3>
                      <p className="text-[11px] font-bold uppercase tracking-widest mt-0.5" style={{ color: tool.color }}>
                        {tool.titleId}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {tool.desc}
                    </p>

                    {/* Key features */}
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-tertiary mb-2">
                        Key Features
                      </p>
                      <ul className="space-y-1.5">
                        {tool.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground-secondary">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: tool.color }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card footer CTA */}
                  <div className="px-6 pb-6">
                    <Link href={tool.path} className="block">
                      <button
                        className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                        style={{ background: "var(--foreground)", color: "var(--background)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                      >
                        Buka Tool
                        <ArrowRight size={15} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick stats bar */}
        <div
          className="mt-16 relative overflow-hidden rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Dot pattern bg */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative flex items-center gap-3">
            <span className="text-lg">✨</span>
            <div>
              <span
                className="font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Productivity Tools
              </span>
              <p className="text-xs text-foreground-tertiary mt-0.5">
                All data saved locally in your browser
              </p>
            </div>
          </div>
          <div className="relative flex flex-wrap justify-center gap-2">
            {[
              { emoji: "📅", label: "Kalender" },
              { emoji: "📝", label: "Catatan" },
              { emoji: "✅", label: "Tugas" },
              { emoji: "⏱️", label: "Focus" },
              { emoji: "📊", label: "Analitik" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground-secondary)",
                }}
              >
                {chip.emoji} {chip.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
