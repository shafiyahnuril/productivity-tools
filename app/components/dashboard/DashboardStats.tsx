"use client";

import { Card } from "../ui/Card";
import { useStore } from "../../store/useStore";

export function DashboardStats() {
  const { todos, notes, timerState } = useStore();

  // Total focus time this week (minutes)
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekFocusMinutes = timerState.history
    .filter(
      (l) =>
        l.type === "focus" &&
        l.completed &&
        new Date(l.timestamp) >= weekAgo
    )
    .reduce((sum, l) => sum + l.duration, 0);
  const focusLabel =
    weekFocusMinutes >= 60
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
      label: "Focus Time This Week",
      value: weekFocusMinutes === 0 && timerState.history.length > 0
        ? `${timerState.history.filter(l => l.type === "focus" && l.completed).reduce((s,l) => s+l.duration, 0)}m`
        : focusLabel,
      sub: "Focus Time This Week",
      accent: null,
    },
    {
      label: "Notes Created",
      value: notes.length,
      sub: "Notes Created",
      accent: "bg-primary",
    },
    {
      label: "Completed Tasks",
      value: completedTasks,
      sub: "Completed Tasks",
      accent: "bg-success",
    },
    {
      label: "Upcoming Deadlines",
      value: upcomingDeadlines,
      sub: "Next 3 Days",
      accent: "bg-warning",
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-card">
      {stats.map((stat) => (
        <Card key={stat.label} className="flex flex-col justify-center">
          {stat.accent ? (
            <div className={`w-6 h-1 rounded-full ${stat.accent} mb-3`} />
          ) : (
            <div className="text-xs text-foreground-secondary mb-2">{stat.label}</div>
          )}
          <div className="text-3xl font-bold">{stat.value}</div>
          <div className="text-[10px] text-foreground-secondary mt-1">{stat.sub}</div>
        </Card>
      ))}
    </div>
  );
}
