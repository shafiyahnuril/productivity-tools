"use client";

import { Card } from "../ui/Card";
import { useStore } from "../../store/useStore";

export function DashboardStats() {
  const { todos, notes, timerState } = useStore();

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekFocusMinutes = timerState.history
    .filter(
      (l) => l.type === "focus" && l.completed && new Date(l.timestamp) >= weekAgo
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
    },
    {
      label: "Notes Created",
      value: notes.length,
      sub: null as string | null,
      accent: "bg-[#60a5fa]",
      color: "text-[#60a5fa]",
    },
    {
      label: "Tasks Completed",
      value: completedTasks,
      sub: null as string | null,
      accent: "bg-success",
      color: "text-success",
    },
    {
      label: "Deadlines",
      value: upcomingDeadlines,
      sub: "Next 3 days",
      accent: "bg-warning",
      color: "text-warning",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-card">
      {stats.map((stat) => (
        <Card key={stat.label} className="flex flex-col">
          <div className={`w-6 h-1 rounded-full ${stat.accent} mb-3`} />
          <div className={`text-3xl font-bold tabular-nums leading-none ${stat.color}`}>
            {stat.value}
          </div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-foreground-secondary mt-2">
            {stat.label}
          </div>
          {stat.sub && (
            <div className="text-[9px] text-foreground-tertiary">{stat.sub}</div>
          )}
        </Card>
      ))}
    </div>
  );
}
