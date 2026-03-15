"use client";

import Image from "next/image";

import { useEffect } from "react";
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
  Settings,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../store/useStore";

export default function TimerPage() {
  const { timerState, setTimerState, updateTimerConfig, addSessionLog } =
    useStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState({ timeLeft: timerState.timeLeft - 1 });
      }, 1000);
    } else if (timerState.timeLeft === 0 && timerState.isRunning) {
      // Session finished
      setTimerState({ isRunning: false });
      addSessionLog({
        type: timerState.mode,
        duration: timerState.config[timerState.mode],
        completed: true,
        timestamp: new Date().toISOString(),
      });
      // Logic for next phase could go here
    }
    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeLeft, timerState.mode, addSessionLog, setTimerState, timerState.config]);

  const toggleTimer = () => setTimerState({ isRunning: !timerState.isRunning });
  const resetTimer = () =>
    setTimerState({
      isRunning: false,
      timeLeft: timerState.config[timerState.mode] * 60,
    });

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    const total = timerState.config[timerState.mode] * 60;
    return ((total - timerState.timeLeft) / total) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header (Same as Dashboard) */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0">
            <Image width={48} height={48}
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
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Search notes, tasks..."
              className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full md:w-70"
            />
          </div>
        </div>
      </header>

      <Heading2>FOKUS TIMER</Heading2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings Column */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <Heading2 className="text-lg mb-6">Konfigurasi Siklus</Heading2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Durasi Fokus</span>
                  <span>{timerState.config.focus}m</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={timerState.config.focus}
                  onChange={(e) =>
                    updateTimerConfig({ focus: Number(e.target.value) })
                  }
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Istirahat Pendek</span>
                  <span>{timerState.config.shortBreak}m</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={timerState.config.shortBreak}
                  onChange={(e) =>
                    updateTimerConfig({ shortBreak: Number(e.target.value) })
                  }
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Istirahat Panjang</span>
                  <span>{timerState.config.longBreak}m</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={timerState.config.longBreak}
                  onChange={(e) =>
                    updateTimerConfig({ longBreak: Number(e.target.value) })
                  }
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Siklus per Istirahat Panjang</span>
                  <span>{timerState.config.cycles}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={timerState.config.cycles}
                  onChange={(e) =>
                    updateTimerConfig({ cycles: Number(e.target.value) })
                  }
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Timer Main Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="flex flex-col items-center justify-center p-10 relative">
            <div className="absolute top-4 right-4 text-foreground-secondary">
              <Settings className="w-5 h-5" />
            </div>

            {/* The circular timer */}
            <div className="relative w-64 h-64 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-surface-elevated"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={
                    2 * Math.PI * 120 * (1 - getProgress() / 100)
                  }
                  className="text-primary transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-sm text-foreground-secondary mb-1 flex items-center gap-2">
                  <span className="text-lg">⏰</span> Pomodoro
                </div>
                <div className="text-6xl font-bold tracking-tight">
                  {formatTime(timerState.timeLeft)}
                </div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={toggleTimer}
                className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
              >
                {timerState.isRunning ? (
                  <Pause className="w-6 h-6 ml-0" />
                ) : (
                  <Play className="w-6 h-6 ml-1" />
                )}
              </button>
              <button
                disabled
                className="w-14 h-14 rounded-full bg-surface-elevated text-foreground flex items-center justify-center opacity-50"
              >
                <Pause className="w-6 h-6" />
              </button>
              <button
                onClick={resetTimer}
                className="w-14 h-14 rounded-full bg-surface-elevated text-foreground flex items-center justify-center hover:bg-border transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-4 w-full px-6">
              <button className="flex-1 py-3 rounded-xl bg-surface-elevated text-foreground text-sm font-medium hover:bg-border flex items-center justify-center gap-2">
                ✕ Lewati Istirahat
              </button>
              <button className="flex-1 py-3 rounded-xl bg-surface-elevated text-foreground text-sm font-medium hover:bg-border flex items-center justify-center gap-2">
                <SkipForward className="w-4 h-4" /> Mulai Istirahat Panjang
              </button>
            </div>

            <div className="mt-6 text-sm text-foreground-secondary">
              Sesi Fokus Berjalan - Siklus ke {timerState.currentCycle}
            </div>
          </Card>

          {/* Mini analytics */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="text-xs text-foreground-secondary mb-2">
                Ringkasan Fokus Minggu Ini
              </div>
              <div className="text-[10px] text-foreground-secondary mb-1">
                Weekly focus hour trend
              </div>
              <div className="h-16 mt-2 relative">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 50"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,40 C20,20 30,50 50,20 C70,-10 80,40 100,10"
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,40 C20,20 30,50 50,20 C70,-10 80,40 100,10 L100,50 L0,50 Z"
                    fill="var(--color-primary-light)"
                    fillOpacity="0.2"
                  />
                </svg>
              </div>
            </Card>
            <div className="grid gap-4">
              <Card className="flex flex-col justify-center">
                <div className="text-xs text-foreground-secondary mb-1">
                  Total Waktu Fokus
                </div>
                <div className="text-3xl font-bold">22h</div>
              </Card>
              <Card className="flex flex-col justify-center">
                <div className="text-xs text-foreground-secondary mb-1">
                  Sesi Selesai Hari Ini
                </div>
                <div className="text-3xl font-bold">5</div>
              </Card>
            </div>
          </div>
        </div>

        {/* History Column */}
        <div className="lg:col-span-4">
          <Card className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Heading2 className="text-lg">Riwayat Sesi Lengkap</Heading2>
              <div className="flex gap-2 items-center bg-surface-elevated px-3 py-1.5 rounded-lg text-sm">
                <CalendarIcon className="w-4 h-4 text-foreground-secondary" />{" "}
                Date
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-border">
              {timerState.history.map((log, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-4 relative z-10 pl-5"
                >
                  <div
                    className={`absolute left-0 w-3 h-3 rounded-full border-2 border-surface ${log.type === "focus" ? "bg-primary" : "bg-surface-elevated"}`}
                  />
                  <div className="text-xs text-foreground-secondary w-10">
                    {new Date(log.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex-1 text-sm">
                    {log.type === "focus"
                      ? `Fokus (Siklus ${log.cycle || 1}) - ${log.duration} mnt`
                      : `Istirahat - ${log.duration} mnt`}
                  </div>
                  <div>
                    {log.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-danger" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
