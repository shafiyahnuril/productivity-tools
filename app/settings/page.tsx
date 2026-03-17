"use client";

import Image from "next/image";
import { useState } from "react";
import { Heading1, Heading2, Text, Caption } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Elements";
import { Sun, Moon, Trash2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { useTheme } from "../components/ThemeProvider";

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="space-y-0.5 min-w-0">
        <Text className="font-medium">{label}</Text>
        {description && (
          <Caption className="text-foreground-secondary normal-case! tracking-normal! font-normal!">
            {description}
          </Caption>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function NumberStepper({
  value,
  onChange,
  min = 1,
  max = 120,
  unit = "min",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-lg bg-surface-elevated border border-border text-foreground-secondary hover:text-foreground hover:border-primary transition-colors flex items-center justify-center text-base font-bold"
      >
        −
      </button>
      <span className="w-14 text-center text-sm font-semibold tabular-nums">
        {value} {unit}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 rounded-lg bg-surface-elevated border border-border text-foreground-secondary hover:text-foreground hover:border-primary transition-colors flex items-center justify-center text-base font-bold"
      >
        +
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const {
    timerState,
    updateTimerConfig,
    clearAllTodos,
    clearAllNotes,
    clearAllCalendarEvents,
    resetTimerHistory,
    todos,
    notes,
    calendarEvents,
  } = useStore();
  const { theme, toggleTheme } = useTheme();

  const [confirmClear, setConfirmClear] = useState<string | null>(null);

  const handleClear = (target: string) => {
    if (confirmClear === target) {
      if (target === "todos") clearAllTodos();
      else if (target === "notes") clearAllNotes();
      else if (target === "events") clearAllCalendarEvents();
      else if (target === "history") resetTimerHistory();
      setConfirmClear(null);
    } else {
      setConfirmClear(target);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0">
          <Image
            src="https://i.pravatar.cc/150?img=47"
            alt="Profile"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <Heading1>Settings</Heading1>
          <Text className="text-foreground-secondary">
            Customize your app experience.
          </Text>
        </div>
      </header>

      {/* Divider */}
      <div
        className="hidden md:block h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Appearance */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                Appearance
              </Heading2>
            </div>
            <Card className="divide-y divide-border">
              <SettingRow
                label="Theme"
                description={`Currently using ${theme} mode`}
              >
                <button
                  onClick={toggleTheme}
                  className="w-14 h-7 rounded-full border border-border bg-surface-elevated relative transition-colors flex items-center px-1"
                  style={{
                    background:
                      theme === "dark"
                        ? "var(--primary)"
                        : "var(--surface-elevated)",
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full bg-white shadow-sm transition-transform flex items-center justify-center"
                    style={{
                      transform:
                        theme === "dark" ? "translateX(28px)" : "translateX(0)",
                    }}
                  >
                    {theme === "dark" ? (
                      <Moon className="w-3 h-3 text-primary" />
                    ) : (
                      <Sun className="w-3 h-3 text-warning" />
                    )}
                  </span>
                </button>
              </SettingRow>
            </Card>
          </section>

          {/* Timer Settings */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                Timer
              </Heading2>
            </div>
            <Card className="divide-y divide-border">
              <SettingRow
                label="Focus Duration"
                description="Length of each focus session"
              >
                <NumberStepper
                  value={timerState.config.focus}
                  onChange={(v) => updateTimerConfig({ focus: v })}
                  min={5}
                  max={90}
                />
              </SettingRow>
              <SettingRow
                label="Short Break"
                description="Break between focus sessions"
              >
                <NumberStepper
                  value={timerState.config.shortBreak}
                  onChange={(v) => updateTimerConfig({ shortBreak: v })}
                  min={1}
                  max={30}
                />
              </SettingRow>
              <SettingRow
                label="Long Break"
                description="Break after completing all cycles"
              >
                <NumberStepper
                  value={timerState.config.longBreak}
                  onChange={(v) => updateTimerConfig({ longBreak: v })}
                  min={5}
                  max={60}
                />
              </SettingRow>
              <SettingRow
                label="Cycles"
                description="Focus sessions before a long break"
              >
                <NumberStepper
                  value={timerState.config.cycles}
                  onChange={(v) => updateTimerConfig({ cycles: v })}
                  min={2}
                  max={8}
                  unit="×"
                />
              </SettingRow>
            </Card>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Data Overview */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                Your Data
              </Heading2>
            </div>
            <Card className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Tasks",
                    count: todos.length,
                    color: "text-primary",
                  },
                  { label: "Notes", count: notes.length, color: "text-info" },
                  {
                    label: "Events",
                    count: calendarEvents.length,
                    color: "text-success",
                  },
                  {
                    label: "Timer Sessions",
                    count: timerState.history.length,
                    color: "text-warning",
                  },
                ].map(({ label, count, color }) => (
                  <div
                    key={label}
                    className="bg-surface-elevated rounded-2xl p-3 flex flex-col gap-1"
                  >
                    <Heading2 className={`text-xl! ${color}`}>{count}</Heading2>
                    <Caption className="text-foreground-secondary normal-case! tracking-normal! font-normal!">
                      {label}
                    </Caption>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Danger Zone */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 rounded-full bg-danger/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest! text-danger">
                Danger Zone
              </Heading2>
            </div>
            <Card className="divide-y divide-border">
              {[
                { key: "todos", label: "Clear all tasks", count: todos.length },
                { key: "notes", label: "Clear all notes", count: notes.length },
                {
                  key: "events",
                  label: "Clear all calendar events",
                  count: calendarEvents.length,
                },
                {
                  key: "history",
                  label: "Reset timer history",
                  count: timerState.history.length,
                },
              ].map(({ key, label, count }) => (
                <div
                  key={key}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 min-w-0">
                    <Text className="font-medium">{label}</Text>
                    <Caption className="text-foreground-secondary normal-case! tracking-normal! font-normal!">
                      {count}{" "}
                      {key === "history"
                        ? "sessions"
                        : key === "events"
                          ? "events"
                          : key}{" "}
                      stored
                    </Caption>
                  </div>
                  {confirmClear === key ? (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setConfirmClear(null)}
                        className="px-2 py-1 rounded-lg text-xs bg-surface-elevated border border-border text-foreground-secondary hover:text-foreground transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleClear(key)}
                        className="px-2 py-1 rounded-lg text-xs bg-danger/15 border border-danger/30 text-danger hover:bg-danger/25 transition-colors font-semibold"
                      >
                        Confirm
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleClear(key)}
                      disabled={count === 0}
                      className="shrink-0 w-8 h-8 rounded-xl bg-danger/10 text-danger flex items-center justify-center hover:bg-danger/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </Card>
          </section>

          {/* App info */}
          <Card className="flex items-center justify-between">
            <div>
              <Text className="font-medium">Paper.OS</Text>
              <Caption className="text-foreground-secondary normal-case! tracking-normal! font-normal!">
                Productivity App • v1.0.0
              </Caption>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center">
              <span className="text-sm font-black text-primary">PA</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
