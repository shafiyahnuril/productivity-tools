"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Heading1, Heading2, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Elements";
import {
  Search,
  Plus,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Bell,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../store/useStore";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const MODE_LABELS = {
  focus: "Fokus",
  shortBreak: "Istirahat Pendek",
  longBreak: "Istirahat Panjang",
};

const MODE_COLOR_CLASS = {
  focus: "text-primary",
  shortBreak: "text-success",
  longBreak: "text-info",
};

const MODE_STROKE = {
  focus: "var(--color-primary)",
  shortBreak: "var(--color-success)",
  longBreak: "var(--color-info)",
};

const MODE_DOT_CLASS = {
  focus: "bg-primary",
  shortBreak: "bg-success",
  longBreak: "bg-info",
};

const CYCLE_DOT_STATES = {
  current: "bg-primary border-primary text-white",
  done: "bg-primary/20 border-primary/50 text-primary",
  upcoming: "border-border text-primary/50",
};

const CIRCUMFERENCE = 2 * Math.PI * 112;

export default function TimerPage() {
  const { timerState, setTimerState, updateTimerConfig } = useStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ── Core timer interval ────────────────────────────────────────────
  useEffect(() => {
    if (!timerState.isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const { timerState: s } = useStore.getState();

      if (!s.isRunning) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        return;
      }

      if (s.timeLeft <= 1) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;

        // Log completed session
        useStore.getState().addSessionLog({
          type: s.mode,
          duration: s.config[s.mode],
          completed: true,
          timestamp: new Date().toISOString(),
          cycle: s.mode === "focus" ? s.currentCycle : undefined,
        });

        // Browser notification
        if (
          typeof window !== "undefined" &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification("PAPER.OS Timer", {
            body:
              s.mode === "focus"
                ? `Sesi fokus selesai! Waktunya istirahat.`
                : "Istirahat selesai! Waktunya fokus kembali.",
          });
        }

        // Advance to next phase
        useStore.getState().setTimerState({ timeLeft: 0 });
        advancePhase(s.mode, s.currentCycle, s.config);
        return;
      }

      useStore.getState().setTimerState({ timeLeft: s.timeLeft - 1 });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState.isRunning]);

  // ── Document title countdown ───────────────────────────────────────
  useEffect(() => {
    if (timerState.isRunning) {
      document.title = `${formatTime(timerState.timeLeft)} — ${MODE_LABELS[timerState.mode]}`;
    } else {
      document.title = "Focus Timer | Productivity";
    }
    return () => {
      document.title = "Student Productivity App";
    };
  }, [timerState.timeLeft, timerState.isRunning, timerState.mode]);

  // ── Helpers ────────────────────────────────────────────────────────
  function advancePhase(
    mode: "focus" | "shortBreak" | "longBreak",
    currentCycle: number,
    config: typeof timerState.config,
  ) {
    if (mode === "focus") {
      if (currentCycle >= config.cycles) {
        // All cycles done → long break, reset cycle
        useStore.getState().setTimerState({
          isRunning: false,
          mode: "longBreak",
          timeLeft: config.longBreak * 60,
          currentCycle: 1,
        });
      } else {
        // Partial cycles → short break, increment cycle
        useStore.getState().setTimerState({
          isRunning: false,
          mode: "shortBreak",
          timeLeft: config.shortBreak * 60,
          currentCycle: currentCycle + 1,
        });
      }
    } else {
      // After any break → back to focus
      useStore.getState().setTimerState({
        isRunning: false,
        mode: "focus",
        timeLeft: config.focus * 60,
      });
    }
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function getProgress() {
    const total = timerState.config[timerState.mode] * 60;
    if (total === 0) return 0;
    return ((total - timerState.timeLeft) / total) * 100;
  }

  // ── Actions ────────────────────────────────────────────────────────
  const toggleTimer = () => {
    if (
      !timerState.isRunning &&
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
    setTimerState({ isRunning: !timerState.isRunning });
  };

  const resetTimer = () =>
    setTimerState({
      isRunning: false,
      timeLeft: timerState.config[timerState.mode] * 60,
    });

  const switchMode = (mode: "focus" | "shortBreak" | "longBreak") =>
    setTimerState({
      isRunning: false,
      mode,
      timeLeft: timerState.config[mode] * 60,
    });

  const skipToNext = () =>
    advancePhase(timerState.mode, timerState.currentCycle, timerState.config);

  const skipBreak = () =>
    setTimerState({
      isRunning: false,
      mode: "focus",
      timeLeft: timerState.config.focus * 60,
    });

  const startLongBreak = () =>
    setTimerState({
      isRunning: false,
      mode: "longBreak",
      timeLeft: timerState.config.longBreak * 60,
      currentCycle: 1,
    });

  // ── Derived stats ──────────────────────────────────────────────────
  const today = new Date().toDateString();
  const todayFocusSessions = timerState.history.filter(
    (l) =>
      l.type === "focus" &&
      l.completed &&
      new Date(l.timestamp).toDateString() === today,
  );
  const todayMinutes = todayFocusSessions.reduce((a, l) => a + l.duration, 0);
  const strokeDashoffset = CIRCUMFERENCE * (1 - getProgress() / 100);

  const trendData = [
    { day: "Sen", focus: 45 },
    { day: "Sel", focus: 90 },
    { day: "Rab", focus: 60 },
    { day: "Kam", focus: 120 },
    { day: "Jum", focus: 30 },
    { day: "Sab", focus: 75 },
    { day: "Hari Ini", focus: Math.max(50, todayMinutes) },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0">
            <Image
              width={48}
              height={48}
              src="https://i.pravatar.cc/150?img=47"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Heading1>Hi, Sarah! 👋</Heading1>
            <Text className="text-foreground-secondary">
              Welcome! Let&apos;s make today awesome.
            </Text>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button className="!hidden md:!inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Search notes, tasks..."
              className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full md:w-70"
            />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-3 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Search notes, tasks..."
              className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full"
            />
          </div>
        </div>
      </header>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)', opacity: 0.4 }} />

      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full bg-primary/40" />
        <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">FOKUS TIMER</Heading2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Config column ── */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest mb-6">KONFIGURASI SIKLUS</Heading2>

            <div className="space-y-6">
              {/* Focus duration */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground-secondary">
                    Durasi Fokus
                  </span>
                  <span className="font-semibold text-primary">
                    {timerState.config.focus}m
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={timerState.config.focus}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateTimerConfig({ focus: val });
                    if (!timerState.isRunning && timerState.mode === "focus")
                      setTimerState({ timeLeft: val * 60 });
                  }}
                  className="w-full"
                />
              </div>

              {/* Short break */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground-secondary">
                    Istirahat Pendek
                  </span>
                  <span className="font-semibold text-success">
                    {timerState.config.shortBreak}m
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={timerState.config.shortBreak}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateTimerConfig({ shortBreak: val });
                    if (
                      !timerState.isRunning &&
                      timerState.mode === "shortBreak"
                    )
                      setTimerState({ timeLeft: val * 60 });
                  }}
                  className="w-full"
                />
              </div>

              {/* Long break */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground-secondary">
                    Istirahat Panjang
                  </span>
                  <span className="font-semibold text-info">
                    {timerState.config.longBreak}m
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  value={timerState.config.longBreak}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    updateTimerConfig({ longBreak: val });
                    if (
                      !timerState.isRunning &&
                      timerState.mode === "longBreak"
                    )
                      setTimerState({ timeLeft: val * 60 });
                  }}
                  className="w-full"
                />
              </div>

              {/* Cycles */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground-secondary">
                    Siklus → Istirahat Panjang
                  </span>
                  <span className="font-semibold">
                    {timerState.config.cycles}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={timerState.config.cycles}
                  onChange={(e) =>
                    updateTimerConfig({ cycles: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              {/* Cycle dot progress */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground-tertiary mb-3">
                  Progres Siklus
                </div>
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: timerState.config.cycles }).map(
                    (_, i) => {
                      const isDone = i < timerState.currentCycle - 1;
                      const isCurrent =
                        i === timerState.currentCycle - 1 &&
                        timerState.mode === "focus";
                      const state = isCurrent
                        ? "current"
                        : isDone
                          ? "done"
                          : "upcoming";
                      return (
                        <div
                          key={i}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-colors ${CYCLE_DOT_STATES[state]}`}
                        >
                          {i + 1}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Timer main column ── */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="flex flex-col items-center p-6">
            {/* Mode selector tabs */}
            <div className="flex w-full gap-1 p-1 bg-surface-elevated rounded-xl mb-6">
              {(["focus", "shortBreak", "longBreak"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all duration-200 active:scale-95 ${
                    timerState.mode === m
                      ? "bg-surface shadow-sm text-foreground border border-border"
                      : "text-foreground-tertiary hover:text-foreground-secondary"
                  }`}
                >
                  {m === "focus"
                    ? "Fokus"
                    : m === "shortBreak"
                      ? "Istirahat ↓"
                      : "Istirahat ↑"}
                </button>
              ))}
            </div>

            {/* Circular timer */}
            <div className="relative w-56 h-56 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 256 256">
                {/* Track */}
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-surface-tertiary"
                />
                {/* Progress */}
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke={MODE_STROKE[timerState.mode]}
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transition: timerState.isRunning
                      ? "stroke-dashoffset 1s linear"
                      : "stroke-dashoffset 0.3s ease",
                  }}
                />
              </svg>

              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest ${MODE_COLOR_CLASS[timerState.mode]}`}
                >
                  {MODE_LABELS[timerState.mode]}
                </span>
                <span
                  data-no-transition
                  className="text-5xl font-black tracking-tighter text-foreground tabular-nums"
                >
                  {formatTime(timerState.timeLeft)}
                </span>
                <span className="text-[10px] text-foreground-tertiary font-medium">
                  Siklus {timerState.currentCycle} / {timerState.config.cycles}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 items-center mb-5">
              <button
                onClick={resetTimer}
                title="Reset"
                className="w-11 h-11 rounded-full bg-surface-elevated text-foreground-secondary flex items-center justify-center hover:bg-surface-tertiary active:scale-95 transition-all duration-150"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleTimer}
                className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light active:scale-95 transition-all duration-150 shadow-lg shadow-primary/25"
              >
                {timerState.isRunning ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </button>

              <button
                onClick={skipToNext}
                title="Lewati ke fase berikutnya"
                className="w-11 h-11 rounded-full bg-surface-elevated text-foreground-secondary flex items-center justify-center hover:bg-surface-tertiary active:scale-95 transition-all duration-150"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary actions */}
            <div className="flex gap-3 w-full">
              <button
                onClick={skipBreak}
                className="flex-1 py-2.5 rounded-xl bg-surface-elevated text-foreground-secondary text-[11px] font-semibold hover:bg-surface-tertiary active:scale-95 transition-colors"
              >
                Lewati Istirahat
              </button>
              <button
                onClick={startLongBreak}
                className="flex-1 py-2.5 rounded-xl bg-info/10 text-info text-[11px] font-semibold hover:bg-info/20 active:scale-95 transition-colors"
              >
                Istirahat Panjang
              </button>
            </div>
          </Card>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="text-[10px] font-bold uppercase tracking-widest text-foreground-tertiary mb-3">
                Tren Fokus
              </div>
              <div className="h-32 -ml-4 -mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trendData}
                    margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--color-border)"
                      vertical={false}
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="day"
                      stroke="var(--color-foreground-tertiary)"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="var(--color-foreground-tertiary)"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      width={35}
                      tickFormatter={(value) => `${value}m`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-surface-elevated)",
                        borderColor: "var(--color-border)",
                        fontSize: "11px",
                        padding: "4px 8px",
                        borderRadius: "8px",
                      }}
                      itemStyle={{ color: "var(--color-foreground)" }}
                      labelStyle={{ display: "none" }}
                      formatter={(value: any) => [`${value}m`, "Fokus"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="focus"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      fill="var(--color-primary)"
                      fillOpacity={0.12}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid gap-4">
              <Card className="flex flex-col justify-center py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground-tertiary mb-1">
                  Sesi Hari Ini
                </div>
                <div className="text-3xl font-black tracking-tighter">
                  {todayFocusSessions.length}
                </div>
              </Card>
              <Card className="flex flex-col justify-center py-3">
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground-tertiary mb-1">
                  Total Menit
                </div>
                <div className="text-3xl font-black tracking-tighter">
                  {todayMinutes}m
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* ── History column ── */}
        <div className="lg:col-span-4">
          <Card className="h-fit flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">RIWAYAT SESI</Heading2>
              <button
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    "Notification" in window &&
                    Notification.permission === "default"
                  ) {
                    Notification.requestPermission();
                  }
                }}
                title="Aktifkan notifikasi saat sesi selesai"
                className="flex gap-1.5 items-center bg-surface-elevated px-3 py-1.5 rounded-lg text-[11px] font-semibold text-foreground-secondary hover:bg-surface-tertiary transition-colors"
              >
                <Bell className="w-3.5 h-3.5" /> Notifikasi
              </button>
            </div>

            {timerState.history.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-foreground-tertiary text-sm">
                Belum ada sesi tercatat.
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-1 space-y-4 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {timerState.history.map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 relative z-10 pl-5"
                  >
                    <div
                      className={`absolute left-0 w-3 h-3 rounded-full border-2 border-surface ${MODE_DOT_CLASS[log.type]}`}
                    />
                    <div className="text-xs text-foreground-tertiary w-10 shrink-0 tabular-nums">
                      {new Date(log.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="flex-1 text-sm">
                      {log.type === "focus"
                        ? `Fokus (Siklus ${log.cycle ?? 1}) — ${log.duration}m`
                        : log.type === "shortBreak"
                          ? `Istirahat Pendek — ${log.duration}m`
                          : `Istirahat Panjang — ${log.duration}m`}
                    </div>
                    <div className="shrink-0">
                      {log.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-danger" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
