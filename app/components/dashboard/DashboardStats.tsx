"use client";

import { useStore } from "../../store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Clock,
  FileText,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

/* ---- Animated number counter ---- */
function AnimatedNumber({ value }: { value: number | string }) {
  return (
    <motion.span
      key={String(value)}
      initial={{ opacity: 0, y: -12, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {value}
    </motion.span>
  );
}

/* ---- Flip card wrapper ---- */
function FlipCard({
  index,
  mounted,
  front,
  back,
  accentColor,
  glowColor,
}: {
  index: number;
  mounted: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  accentColor: string;
  glowColor: string;
}) {
  const [flipped, setFlipped] = useState(false);

  const cardStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "1.5rem" /* rounded-3xl equivalent */,
    padding: "1rem 1.25rem",
    boxShadow: "var(--shadow-sm)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        type: "spring",
        stiffness: 220,
        damping: 22,
      }}
      style={{ perspective: 1000, cursor: "pointer" }}
      className="rounded-3xl"
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onTap={() => setFlipped((f) => !f)}
      whileHover={{ y: -3 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 130,
          damping: 18,
          mass: 0.9,
        }}
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          minHeight: "120px",
        }}
      >
        {/* ─ Front ─ */}
        <div style={cardStyle}>{front}</div>

        {/* ─ Back ─ */}
        <div
          style={{
            ...cardStyle,
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, var(--surface) 0%, ${glowColor} 100%)`,
            borderColor: `${accentColor}30`,
          }}
        >
          {back}
        </div>
      </motion.div>

      {/* Flip hint — tiny icon shown on hover before first flip */}
      <AnimatePresence>
        {!flipped && (
          <motion.div
            style={{
              position: "absolute",
              bottom: 8,
              right: 10,
              opacity: 0,
              pointerEvents: "none",
            }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <RotateCcw size={11} color={accentColor} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---- Main component ---- */
export function DashboardStats() {
  const { todos, notes, timerState } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
  const totalTasks = todos.length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const upcomingDeadlines = todos.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    const due = new Date(t.dueDate);
    const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return due >= now && due <= inThreeDays;
  });

  const nextDeadline = todos
    .filter((t) => t.dueDate && !t.completed && new Date(t.dueDate) >= now)
    .sort(
      (a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
    )[0];

  const mostRecentNote = notes.length > 0 ? notes[notes.length - 1] : null;

  /* Accent bar animation helper */
  const AccentBar = ({ color, i }: { color: string; i: number }) => (
    <motion.div
      className="h-1 rounded-full mb-3"
      style={{ background: color, width: 24 }}
      initial={{ width: 0 }}
      animate={mounted ? { width: 24 } : {}}
      transition={{ delay: i * 0.08 + 0.2, duration: 0.35 }}
    />
  );

  const labelStyle: React.CSSProperties = {
    fontSize: "9px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--foreground-secondary)",
    marginTop: "8px",
  };

  const subStyle: React.CSSProperties = {
    fontSize: "9px",
    color: "var(--foreground-tertiary)",
  };

  const backLabelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 600,
    color: "var(--foreground-tertiary)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "4px",
  };

  const backValueStyle = (color: string): React.CSSProperties => ({
    fontSize: "1rem",
    fontWeight: 700,
    color,
    lineHeight: 1.3,
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* ── Focus Time ── */}
      <div style={{ position: "relative", minHeight: 120 }}>
        <FlipCard
          index={0}
          mounted={mounted}
          accentColor="#d97706"
          glowColor="rgba(217,119,6,0.06)"
          front={
            <>
              <AccentBar color="#d97706" i={0} />
              <div className="text-3xl font-bold tabular-nums leading-none text-primary">
                <AnimatedNumber value={focusValue} />
              </div>
              <div style={labelStyle}>Focus Time</div>
              <div style={subStyle}>This week</div>
              <Clock
                size={28}
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 14,
                  color: "#d97706",
                  opacity: 0.1,
                }}
              />
            </>
          }
          back={
            <>
              <div style={backLabelStyle}>All-time total</div>
              <div style={backValueStyle("#d97706")}>
                {allTimeFocusMinutes >= 60
                  ? `${Math.round(allTimeFocusMinutes / 60)}h`
                  : `${allTimeFocusMinutes}m`}
              </div>
              <div style={{ ...subStyle, marginTop: 8 }}>
                {
                  timerState.history.filter(
                    (l) => l.type === "focus" && l.completed,
                  ).length
                }{" "}
                sessions completed
              </div>
              <TrendingUp
                size={26}
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 14,
                  color: "#d97706",
                  opacity: 0.15,
                }}
              />
            </>
          }
        />
      </div>

      {/* ── Notes Created ── */}
      <div style={{ position: "relative", minHeight: 120 }}>
        <FlipCard
          index={1}
          mounted={mounted}
          accentColor="#60a5fa"
          glowColor="rgba(96,165,250,0.06)"
          front={
            <>
              <AccentBar color="#60a5fa" i={1} />
              <div
                className="text-3xl font-bold tabular-nums leading-none"
                style={{ color: "#60a5fa" }}
              >
                <AnimatedNumber value={notes.length} />
              </div>
              <div style={labelStyle}>Notes Created</div>
              <FileText
                size={28}
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 14,
                  color: "#60a5fa",
                  opacity: 0.1,
                }}
              />
            </>
          }
          back={
            <>
              <div style={backLabelStyle}>Latest note</div>
              <div
                style={{
                  ...backValueStyle("#60a5fa"),
                  fontSize: "0.8rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {mostRecentNote ? mostRecentNote.title : "No notes yet"}
              </div>
              {mostRecentNote && (
                <div style={{ ...subStyle, marginTop: 6 }}>
                  {mostRecentNote.categories.join(", ") || "Uncategorized"}
                </div>
              )}
              <FileText
                size={26}
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 14,
                  color: "#60a5fa",
                  opacity: 0.12,
                }}
              />
            </>
          }
        />
      </div>

      {/* ── Tasks Completed ── */}
      <div style={{ position: "relative", minHeight: 120 }}>
        <FlipCard
          index={2}
          mounted={mounted}
          accentColor="#5a8a6e"
          glowColor="rgba(90,138,110,0.06)"
          front={
            <>
              <AccentBar color="#5a8a6e" i={2} />
              <div className="text-3xl font-bold tabular-nums leading-none text-success">
                <AnimatedNumber value={completedTasks} />
              </div>
              <div style={labelStyle}>Tasks Completed</div>
              <CheckSquare
                size={28}
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 14,
                  color: "#5a8a6e",
                  opacity: 0.1,
                }}
              />
            </>
          }
          back={
            <>
              <div style={backLabelStyle}>Completion rate</div>
              <div style={backValueStyle("#5a8a6e")}>
                {completionRate}
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>%</span>
              </div>
              {/* Progress bar */}
              <div
                style={{
                  height: 5,
                  background: "var(--border)",
                  borderRadius: 99,
                  overflow: "hidden",
                  marginTop: 8,
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: "#5a8a6e",
                    borderRadius: 99,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div style={{ ...subStyle, marginTop: 4 }}>
                {completedTasks} of {totalTasks} tasks
              </div>
            </>
          }
        />
      </div>

      {/* ── Deadlines ── */}
      <div style={{ position: "relative", minHeight: 120 }}>
        <FlipCard
          index={3}
          mounted={mounted}
          accentColor="#b59030"
          glowColor="rgba(181,144,48,0.06)"
          front={
            <>
              <AccentBar color="#b59030" i={3} />
              <div className="text-3xl font-bold tabular-nums leading-none text-warning">
                <AnimatedNumber value={upcomingDeadlines.length} />
              </div>
              <div style={labelStyle}>Deadlines</div>
              <div style={subStyle}>Next 3 days</div>
              <AlertCircle
                size={28}
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 14,
                  color: "#b59030",
                  opacity: 0.1,
                }}
              />
            </>
          }
          back={
            <>
              <div style={backLabelStyle}>Next due</div>
              <div
                style={{
                  ...backValueStyle("#b59030"),
                  fontSize: "0.8rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {nextDeadline ? nextDeadline.title : "No upcoming deadlines"}
              </div>
              {nextDeadline?.dueDate && (
                <div style={{ ...subStyle, marginTop: 6 }}>
                  {new Date(nextDeadline.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              )}
              <AlertCircle
                size={26}
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 14,
                  color: "#b59030",
                  opacity: 0.12,
                }}
              />
            </>
          }
        />
      </div>
    </div>
  );
}
