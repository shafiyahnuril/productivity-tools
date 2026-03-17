"use client";

import {
  Clock,
  FileText,
  Calendar,
  CheckSquare,
  BarChart2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

const tools = [
  {
    icon: Clock,
    titleEn: "Focus Timer",
    titleId: "Deep Work Mode",
    desc: "Boost concentration with the Pomodoro method. Set focus and break sessions for maximum productivity.",
    features: [
      "Pomodoro technique",
      "Custom session durations",
      "Focus session history",
    ],
    color: "#C4574A",
    bg: "rgba(196,87,74,0.1)",
    tape: "rgba(196,87,74,0.35)",
    glow: "rgba(196,87,74,0.2)",
    path: "/dashboard",
  },
  {
    icon: FileText,
    titleEn: "Smart Notes",
    titleId: "Capture Everything",
    desc: "Quickly save ideas and important notes. Access them anytime in one clean, organized place.",
    features: [
      "Quick capture",
      "Tag & categorize notes",
      "Search across all notes",
    ],
    color: "#D97706",
    bg: "rgba(217,119,6,0.1)",
    tape: "rgba(253,224,71,0.55)",
    glow: "rgba(217,119,6,0.2)",
    path: "/dashboard",
  },
  {
    icon: Calendar,
    titleEn: "Calendar",
    titleId: "Plan Your Week",
    desc: "Plan your weekly and monthly schedule. Never miss an important date or deadline again.",
    features: [
      "Weekly & monthly views",
      "Event management",
      "Schedule at a glance",
    ],
    color: "#3B7EC2",
    bg: "rgba(59,126,194,0.1)",
    tape: "rgba(59,126,194,0.32)",
    glow: "rgba(59,126,194,0.2)",
    path: "/dashboard",
  },
  {
    icon: CheckSquare,
    titleEn: "To-Do List",
    titleId: "Stay on Track",
    desc: "Manage daily tasks with ease. Set priorities and track your progress toward completion.",
    features: ["Priority levels", "Due date reminders", "Progress tracking"],
    color: "#5A8A6E",
    bg: "rgba(90,138,110,0.1)",
    tape: "rgba(90,138,110,0.4)",
    glow: "rgba(90,138,110,0.2)",
    path: "/dashboard",
  },
  {
    icon: BarChart2,
    titleEn: "Analytics",
    titleId: "Track Your Growth",
    desc: "Visualize your productivity trends. Understand your work habits and reach your goals faster.",
    features: ["Visual charts", "Weekly summaries", "Goal completion rate"],
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.1)",
    tape: "rgba(167,139,250,0.45)",
    glow: "rgba(124,58,237,0.2)",
    path: "/dashboard",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* 3D tilt card component */
function TiltCard({ tool, index }: { tool: (typeof tools)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 18 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18 });

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
  };

  const Icon = tool.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="relative flex flex-col"
      style={{ paddingTop: "12px", perspective: 800 }}
    >
      {/* Tape strip */}
      <motion.div
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
        animate={
          isHovered ? { scaleX: 1.15, rotate: 0 } : { scaleX: 1, rotate: -1.5 }
        }
        transition={{ duration: 0.25 }}
      />

      {/* 3D card */}
      <motion.div
        ref={ref}
        className="flex flex-col flex-1 rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: isHovered
            ? `6px 14px 40px ${tool.glow}, 0 4px 20px rgba(0,0,0,0.14)`
            : "2px 4px 18px rgba(0,0,0,0.07)",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        transition={{ duration: 0.2 }}
      >
        {/* Shine overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: isHovered
              ? "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 65%)"
              : "none",
            transition: "opacity 0.25s ease",
          }}
        />

        <div className="p-6 flex flex-col flex-1 gap-4">
          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: tool.bg }}
            whileHover={{ rotate: [0, -12, 12, -6, 6, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon size={26} strokeWidth={1.8} style={{ color: tool.color }} />
          </motion.div>

          {/* Titles */}
          <div>
            <h3
              className="font-semibold text-foreground text-lg leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tool.titleEn}
            </h3>
            <p
              className="text-[11px] font-bold uppercase tracking-widest mt-0.5"
              style={{ color: tool.color }}
            >
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
                <motion.li
                  key={i}
                  className="flex items-center gap-2 text-sm text-foreground-secondary"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05 + i * 0.08,
                    duration: 0.35,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: tool.color }}
                  />
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card footer CTA */}
        <div className="px-6 pb-6">
          <Link href={tool.path} className="block">
            <motion.button
              className="btn-shine w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden relative"
              style={{
                background: tool.color,
                color: "#fff",
                boxShadow: `0 3px 12px ${tool.glow}`,
              }}
              whileHover={{
                scale: 1.03,
                y: -1,
                boxShadow: `0 6px 22px ${tool.glow}`,
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Open Tool
              <motion.span
                animate={isHovered ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{
                  repeat: isHovered ? Infinity : 0,
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={15} />
              </motion.span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

const statItems = [
  { label: "100% Free", sublabel: "Forever", value: "∞" },
  { label: "Tools", sublabel: "All in one", value: "5+" },
  { label: "Privacy", sublabel: "Local data", value: "🔒" },
];

export function FeatureSection() {
  return (
    <section
      id="features"
      className="py-16 md:py-24 px-4 overflow-hidden"
      style={{ background: "var(--background-secondary)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span
              className="inline-flex items-center gap-2 text-xl"
              style={{
                fontFamily: "var(--font-hand)",
                color: "var(--primary)",
                borderBottom: "2px dashed var(--primary)",
                paddingBottom: "2px",
              }}
            >
              <Sparkles size={16} style={{ color: "var(--primary)" }} />
              key features
            </span>
          </motion.div>

          <motion.h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--foreground)",
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything You Need, <br className="hidden sm:block" />
            <em style={{ color: "var(--primary)" }}>all in one place.</em>
          </motion.h2>

          <motion.p
            className="text-base text-foreground-secondary max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Everything you need to stay focused, organized, and on track — built
            for the modern student.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {tools.map((tool, i) => (
            <TiltCard key={tool.titleEn} tool={tool} index={i} />
          ))}
        </motion.div>

        {/* Quick stats bar */}
        <motion.div
          className="mt-16 relative overflow-hidden rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: "0 8px 32px rgba(217,119,6,0.10)" }}
        >
          {/* Dot pattern bg */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--border) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* Left — brand */}
          <div className="relative flex items-center gap-3">
            <div>
              <span
                className="font-bold text-foreground text-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Productivity Tools
              </span>
              <p className="text-xs text-foreground-tertiary mt-0.5">
                All data saved locally in your browser
              </p>
            </div>
          </div>

          {/* Center — stats */}
          <div className="relative flex items-center gap-8">
            {statItems.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.08 }}
              >
                <p
                  className="text-2xl font-black text-foreground leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-tertiary mt-0.5">
                  {s.label}
                </p>
                <p className="text-[10px] text-foreground-tertiary">
                  {s.sublabel}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right — tool tags */}
          <div className="relative flex flex-wrap justify-center gap-2">
            {["Calendar", "Notes", "Tasks", "Focus", "Analytics"].map(
              (label, i) => (
                <motion.span
                  key={label}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground-secondary)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                  }}
                >
                  {label}
                </motion.span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
