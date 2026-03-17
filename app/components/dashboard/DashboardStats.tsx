"use client";

import { Card } from "../ui/Card";
import { useStore } from "../../store/useStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* Animated number counter */
function AnimatedNumber({ value }: { value: number | string }) {
  const numValue = typeof value === "string" ? value : value;
  return (
    <motion.span
      key={String(numValue)}
      initial={{ opacity: 0, y: -12, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {numValue}
    </motion.span>
  );
}

export function DashboardStats() {
  const { todos, notes, timerState } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to trigger entry animations
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekFocusMinutes = timerState.history
    .filter(
      (l) =>
        l.type === "focus" && l.completed && new Date(l.timestamp) >= weekAgo,
    )
    .reduce((sum, l) => sum + l.duration, 0);

  const allTimeFocusMinutes = timerState.history
    .filter((l) => l.type === "focus" && l.completed)
    .reduce((s, l) => s + l.duration, 0);

  const focusValue =
    weekFocusMinutes === 0 && timerState.history.length > 0
      ? `${allTimeFocusMinutes}m`
      : weekFocusMinutes >= 60
        ? `${Math.round(weekFocusMinutes / 60)}h`
        : `${weekFocusMinutes}m`;

  const completedTasks = todos.filter((t) => t.completed).length;
  const upcomingDeadlines = todos.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    const due = new Date(t.dueDate);
    const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return due >= now && due <= inThreeDays;
  }).length;

  const stats = [
    {
      label: "Focus Time",
      value: focusValue,
      sub: "This week",
      accent: "bg-primary",
      color: "text-primary",
      glow: "rgba(217,119,6,0.15)",
    },
    {
      label: "Notes Created",
      value: notes.length,
      sub: null as string | null,
      accent: "bg-[#60a5fa]",
      color: "text-[#60a5fa]",
      glow: "rgba(96,165,250,0.12)",
    },
    {
      label: "Tasks Completed",
      value: completedTasks,
      sub: null as string | null,
      accent: "bg-success",
      color: "text-success",
      glow: "rgba(90,138,110,0.12)",
    },
    {
      label: "Deadlines",
      value: upcomingDeadlines,
      sub: "Next 3 days",
      accent: "bg-warning",
      color: "text-warning",
      glow: "rgba(181,144,48,0.12)",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            delay: i * 0.08,
            duration: 0.4,
            type: "spring",
            stiffness: 220,
            damping: 22,
          }}
          whileHover={{
            y: -3,
            boxShadow: `0 8px 24px ${stat.glow}`,
            transition: { duration: 0.2 },
          }}
          className="rounded-2xl overflow-hidden"
        >
          <Card className="flex flex-col h-full cursor-default">
            {/* Accent bar */}
            <motion.div
              className={`w-6 h-1 rounded-full ${stat.accent} mb-3`}
              initial={{ width: 0 }}
              animate={mounted ? { width: 24 } : {}}
              transition={{ delay: i * 0.08 + 0.2, duration: 0.35 }}
            />

            {/* Value */}
            <div
              className={`text-3xl font-bold tabular-nums leading-none ${stat.color}`}
            >
              <AnimatedNumber value={stat.value} />
            </div>

            <div className="text-[9px] font-bold uppercase tracking-widest text-foreground-secondary mt-2">
              {stat.label}
            </div>
            {stat.sub && (
              <div className="text-[9px] text-foreground-tertiary">
                {stat.sub}
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
