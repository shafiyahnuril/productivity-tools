"use client";

import { useEffect, useRef } from "react";
import { Card } from "../ui/Card";
import { Heading2 } from "../ui/Typography";
import { useStore } from "../../store/useStore";
import { RotateCcw } from "lucide-react";

const MODE_LABELS = {
  focus: "Pomodoro",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const SVG_SIZE = 160;
const RADIUS = 66;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function FocusTimerWidget() {
  const { timerState, setTimerState } = useStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown interval
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
        useStore.getState().addSessionLog({
          type: s.mode,
          duration: s.config[s.mode],
          completed: true,
          timestamp: new Date().toISOString(),
          cycle: s.mode === "focus" ? s.currentCycle : undefined,
        });
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

  function advancePhase(
    mode: "focus" | "shortBreak" | "longBreak",
    currentCycle: number,
    config: typeof timerState.config
  ) {
    if (mode === "focus") {
      useStore.getState().setTimerState(
        currentCycle >= config.cycles
          ? { isRunning: false, mode: "longBreak", timeLeft: config.longBreak * 60, currentCycle: 1 }
          : { isRunning: false, mode: "shortBreak", timeLeft: config.shortBreak * 60, currentCycle: currentCycle + 1 }
      );
    } else {
      useStore.getState().setTimerState({
        isRunning: false,
        mode: "focus",
        timeLeft: config.focus * 60,
      });
    }
  }

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const toggle = () => setTimerState({ isRunning: !timerState.isRunning });
  const reset = () =>
    setTimerState({ isRunning: false, timeLeft: timerState.config[timerState.mode] * 60 });

  const switchMode = (mode: "focus" | "shortBreak" | "longBreak") =>
    setTimerState({ isRunning: false, mode, timeLeft: timerState.config[mode] * 60 });

  const total = timerState.config[timerState.mode] * 60;
  const progress = total > 0 ? (total - timerState.timeLeft) / total : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const MODE_STROKE = {
    focus: "var(--color-primary)",
    shortBreak: "var(--color-success)",
    longBreak: "#60a5fa",
  };

  const modeButtons = [
    { label: String(timerState.config.focus), mode: "focus" as const },
    { label: String(timerState.config.shortBreak), mode: "shortBreak" as const },
    { label: String(timerState.config.longBreak), mode: "longBreak" as const },
  ];

  const recentLogs = timerState.history.slice(0, 2);

  return (
    <Card className="stagger-card flex-1 flex md:flex-col flex-row items-center justify-between md:justify-center p-4 md:p-6 w-full gap-4">
      {/* Desktop circular ring */}
      <div className="hidden md:flex flex-col items-center mb-6">
        <div className="relative" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
          <svg
            width={SVG_SIZE}
            height={SVG_SIZE}
            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            className="-rotate-90"
          >
            <circle
              cx={SVG_SIZE / 2}
              cy={SVG_SIZE / 2}
              r={RADIUS}
              stroke="var(--color-border)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx={SVG_SIZE / 2}
              cy={SVG_SIZE / 2}
              r={RADIUS}
              stroke={MODE_STROKE[timerState.mode]}
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{
                transition: timerState.isRunning
                  ? "stroke-dashoffset 1s linear"
                  : "stroke-dashoffset 0.3s ease",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <div className="text-[9px] font-bold uppercase tracking-widest text-foreground-tertiary">
              {MODE_LABELS[timerState.mode]}
            </div>
            <div
              data-no-transition
              className="text-4xl font-bold tracking-tight tabular-nums"
            >
              {fmt(timerState.timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: inline time display */}
      <div className="flex flex-col md:hidden shrink-0">
        <Heading2 className="mb-1">Focus Timer</Heading2>
        <div className="text-sm text-foreground-secondary mb-1">
          {MODE_LABELS[timerState.mode]}
        </div>
        <div className="text-4xl font-bold tracking-tight tabular-nums" data-no-transition>
          {fmt(timerState.timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 md:gap-4 md:mb-6 items-center">
        {/* Play/Pause */}
        <button
          onClick={toggle}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors shrink-0 active:scale-95"
        >
          {timerState.isRunning ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Reset */}
        <button
          onClick={reset}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-elevated text-foreground flex items-center justify-center hover:bg-border transition-colors shrink-0 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Mode selector (desktop) */}
      <div className="hidden md:flex gap-2 w-full justify-center pb-2 mt-auto">
        {modeButtons.map(({ label, mode }) => (
          <button
            key={mode}
            onClick={() => switchMode(mode)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors active:scale-95 ${
              timerState.mode === mode
                ? "bg-primary text-white"
                : "bg-surface-elevated text-foreground hover:bg-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Session log */}
      <div className="w-full pt-4 text-left border-t border-border">
        <div className="text-sm font-medium mb-3">Session log</div>
        {recentLogs.length === 0 ? (
          <div className="text-xs text-foreground-tertiary">No sessions yet.</div>
        ) : (
          <div className="space-y-2">
            {recentLogs.map((log, i) => (
              <div key={i} className="flex justify-between text-xs items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      log.type === "focus" ? "bg-primary" : "bg-foreground-secondary"
                    }`}
                  />
                  {MODE_LABELS[log.type]}
                </div>
                <span className="text-foreground-secondary">{log.duration} min</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
