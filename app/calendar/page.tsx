"use client";

import Image from "next/image";

import { useState, useEffect } from "react";
import { Heading1, Heading2, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Elements";
import {
  Search,
  Plus,
  MoreHorizontal,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trash2,
  BookOpen,
  Briefcase,
} from "lucide-react";
import {
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  format,
  isToday,
  parseISO,
  isSameDay,
} from "date-fns";
import { useStore, CalendarEvent } from "../store/useStore";

const HOUR_HEIGHT = 46; // px per hour (h-11.5 ≈ 46px)
const DAY_START_HOUR = 8; // 08:00
const DAY_END_HOUR = 22; // 22:00

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

function getEventStyle(
  event: CalendarEvent,
  dayIndex: number,
): React.CSSProperties {
  const startMin = timeToMinutes(event.startTime);
  const endMin = timeToMinutes(event.endTime);
  const startOffset = startMin - DAY_START_HOUR * 60;
  const durationMin = Math.max(endMin - startMin, 30); // at least 30 min tall

  const top = (startOffset / 60) * HOUR_HEIGHT;
  const height = (durationMin / 60) * HOUR_HEIGHT;
  const left = `${(dayIndex / 7) * 100}%`;

  return {
    position: "absolute",
    top: `${top}px`,
    left,
    width: "14.28%",
    height: `${height}px`,
    padding: "0 4px",
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  focus: "bg-primary/90",
  meeting: "bg-warning/90",
  study: "bg-success/90",
  other: "bg-info/90",
};

const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DAY_ABBR_ID = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function CalendarPage() {
  const { calendarEvents, deleteCalendarEvent, setActiveModal } = useStore();

  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Current time indicator position
  const currentHour = currentTime.getHours();
  const currentMin = currentTime.getMinutes();
  const currentTimeTop =
    currentHour >= DAY_START_HOUR && currentHour < DAY_END_HOUR
      ? (currentHour - DAY_START_HOUR + currentMin / 60) * HOUR_HEIGHT
      : null;

  const currentTimeLabel = `${String(currentHour).padStart(2, "0")}:${String(currentMin).padStart(2, "0")}`;

  // Filter events for the current week view
  const weekEvents = calendarEvents.filter((ev) => {
    try {
      const d = parseISO(ev.date);
      return weekDays.some((wd) => isSameDay(d, wd));
    } catch {
      return false;
    }
  });

  // Filter events for today's agenda (right sidebar)
  const todayEvents = calendarEvents
    .filter((ev) => {
      try {
        return isSameDay(parseISO(ev.date), selectedDay);
      } catch {
        return false;
      }
    })
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  // Filter by search
  const filteredWeekEvents = weekEvents.filter((ev) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ev.title.toLowerCase().includes(q) ||
      ev.description?.toLowerCase().includes(q) ||
      ev.category.toLowerCase().includes(q)
    );
  });

  const goToPrevWeek = () => setWeekStart((w) => subWeeks(w, 1));
  const goToNextWeek = () => setWeekStart((w) => addWeeks(w, 1));
  const goToCurrentWeek = () =>
    setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const isCurrentWeek = isSameDay(
    weekStart,
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
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
            <Heading1>Hi, Sarah! 👋</Heading1>
            <Text className="text-foreground-secondary">
              Welcome! Let&apos;s make today awesome.
            </Text>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={() => setActiveModal("agenda")}
            className="hidden! md:inline-flex! items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calendar events, notes..."
              className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full md:w-70"
            />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-3 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search calendar events, notes..."
              className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full"
            />
          </div>
        </div>
      </header>

      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-primary/40" />
          <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
            CALENDAR DETAIL
          </Heading2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevWeek}
            className="p-2 hover:bg-surface-elevated rounded-lg text-foreground-secondary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium min-w-30 text-center">
            {format(weekStart, "d MMM")} –{" "}
            {format(addDays(weekStart, 6), "d MMM yyyy")}
          </span>
          <button
            onClick={goToNextWeek}
            className="p-2 hover:bg-surface-elevated rounded-lg text-foreground-secondary transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {!isCurrentWeek && (
            <button
              onClick={goToCurrentWeek}
              className="px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Hari Ini
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Calendar Area - 2/3 width */}
        <div className="md:col-span-2">
          <Card className="p-0 overflow-hidden h-full flex flex-col">
            <div className="overflow-x-auto flex-1 flex flex-col">
              <div className="min-w-200 flex-1 flex flex-col">
                {/* Day headers */}
                <div className="grid grid-cols-8 border-b border-border bg-surface-elevated text-center">
                  <div className="p-3"></div>
                  {weekDays.map((day, i) => {
                    const todayDay = isToday(day);
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDay(day)}
                        className={`p-3 border-l border-border transition-colors hover:bg-surface ${isSameDay(day, selectedDay) ? "bg-primary/5" : ""}`}
                      >
                        <div
                          className={`font-semibold text-sm ${todayDay ? "text-primary" : i === 6 ? "text-danger" : ""}`}
                        >
                          {DAY_NAMES[i]}
                        </div>
                        <div
                          className={`text-xs ${todayDay ? "text-primary" : i === 6 ? "text-danger/70" : "text-foreground-secondary"}`}
                        >
                          {DAY_ABBR_ID[i]} {format(day, "d MMM")}
                        </div>
                        {todayDay && (
                          <div className="w-8 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div
                  className="flex-1 overflow-y-auto bg-surface relative min-h-125"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.02) 14.28%, transparent 14.28%, transparent 100%)",
                    backgroundSize: "100% 100%",
                  }}
                >
                  {/* Time labels */}
                  <div className="absolute left-0 top-0 bottom-0 w-[12.5%] border-r border-border text-xs text-foreground-secondary text-right pr-2 py-2 space-y-9.5 bg-surface z-10">
                    <div>08:00</div>
                    <div>09:00</div>
                    <div>10:00</div>
                    <div>11:00</div>
                    <div>12:00</div>
                    <div>13:00</div>
                    <div>14:00</div>
                    <div>15:00</div>
                    <div>16:00</div>
                    <div>17:00</div>
                    <div>18:00</div>
                    <div>19:00</div>
                    <div>20:00</div>
                    <div>21:00</div>
                    <div>22:00</div>
                  </div>

                  {/* Grid lines */}
                  <div className="absolute inset-0 ml-[12.5%] grid grid-cols-7">
                    {weekDays.map((day, i) => (
                      <div
                        key={i}
                        className={`border-r border-border relative ${isToday(day) ? "bg-primary/5" : ""}`}
                      >
                        {[...Array(14)].map((_, j) => (
                          <div
                            key={j}
                            className="border-b border-border/50 w-full"
                            style={{ height: `${HOUR_HEIGHT}px` }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Events from store */}
                  <div className="absolute ml-[12.5%] inset-0">
                    {filteredWeekEvents.map((event) => {
                      try {
                        const evDate = parseISO(event.date);
                        const dayIndex = weekDays.findIndex((d) =>
                          isSameDay(d, evDate),
                        );
                        if (dayIndex === -1) return null;
                        const style = getEventStyle(event, dayIndex);
                        const colorClass =
                          CATEGORY_COLORS[event.category] ?? "bg-info/70";
                        return (
                          <div key={event.id} style={style}>
                            <div
                              className={`${colorClass} text-white p-2 rounded-lg text-xs leading-tight h-full shadow-sm group relative overflow-hidden`}
                            >
                              <div className="font-semibold mb-0.5 line-clamp-1">
                                {event.startTime} - {event.endTime}
                              </div>
                              <div className="line-clamp-2">{event.title}</div>
                              <button
                                onClick={() => deleteCalendarEvent(event.id)}
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded p-0.5 hover:bg-black/40"
                                title="Hapus event"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      } catch {
                        return null;
                      }
                    })}
                  </div>

                  {/* Current time indicator */}
                  {currentTimeTop !== null && isCurrentWeek && (
                    <div
                      className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
                      style={{ top: `${currentTimeTop}px` }}
                    >
                      <div className="w-[12.5%] text-right pr-2 text-danger text-[10px] font-bold">
                        {currentTimeLabel}
                      </div>
                      <div className="flex-1 border-t-2 border-danger relative">
                        <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-danger"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar right - 1/3 width */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <Card className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                AGENDA — {format(selectedDay, "d MMM")}
              </Heading2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModal("agenda")}
                  className="p-1.5 hover:bg-surface-elevated rounded-lg text-foreground-secondary hover:text-primary transition-colors"
                  title="Tambah event"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <MoreHorizontal className="w-5 h-5 text-foreground-secondary cursor-pointer" />
              </div>
            </div>

            {/* Timeline Items (Agenda Tetap) */}
            <div className="space-y-5 mb-5 pb-5 border-b border-border/50">
              <div className="flex gap-4">
                <div className="w-12 text-xs text-foreground-secondary font-medium pt-1 text-right">
                  10:00
                </div>
                <div className="flex-1 bg-surface-elevated p-3 rounded-xl rounded-tl-none relative before:absolute before:w-1.5 before:-left-1.5 before:top-0 before:bottom-0 before:bg-primary before:rounded-l-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center text-sm font-semibold mb-1">
                      <Clock className="w-4 h-4 text-primary" /> Sesi Fokus
                      Pomodoro
                    </div>
                    <div className="w-2 h-2 rounded-full bg-primary mt-1"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 text-xs text-foreground-secondary font-medium pt-1 text-right">
                  11:30
                </div>
                <div className="flex-1 pl-3">
                  <div className="flex gap-2 items-center text-sm text-foreground-secondary mb-1">
                    <Clock className="w-4 h-4" /> Sesi Fokus Berakhir
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 text-xs text-foreground-secondary font-medium pt-1 text-right">
                  11:45
                </div>
                <div className="flex-1 bg-surface-elevated p-3 rounded-xl rounded-tl-none relative before:absolute before:w-1.5 before:-left-1.5 before:top-0 before:bottom-0 before:bg-success before:rounded-l-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center text-sm font-semibold mb-1 text-success">
                      Sesi Istirahat Pendek
                    </div>
                    <div className="w-2 h-2 rounded-full bg-success mt-1"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 text-xs text-foreground-secondary font-medium pt-1 text-right">
                  12:30
                </div>
                <div className="flex-1 bg-surface-elevated p-3 rounded-xl rounded-tl-none relative before:absolute before:w-1.5 before:-left-1.5 before:top-0 before:bottom-0 before:bg-success before:rounded-l-xl border border-success/30">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center text-sm font-semibold mb-1">
                      <BookOpen className="w-4 h-4 text-success" /> Belajar
                      Biologi
                    </div>
                    <div className="w-2 h-2 rounded-full bg-success mt-1"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 text-xs text-foreground-secondary font-medium pt-1 text-right">
                  14:00
                </div>
                <div className="flex-1 bg-surface-elevated p-3 rounded-xl rounded-tl-none relative before:absolute before:w-1.5 before:-left-1.5 before:top-0 before:bottom-0 before:bg-warning before:rounded-l-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2 items-center text-sm font-semibold mb-1">
                      <Briefcase className="w-4 h-4 text-warning" /> Rapat Tim
                    </div>
                    <div className="w-2 h-2 rounded-full bg-warning mt-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {todayEvents.length === 0 ? (
              <div className="text-center py-8 text-foreground-secondary">
                <Clock className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <div className="text-sm">Tidak ada agenda hari ini.</div>
                <button
                  onClick={() => setActiveModal("agenda")}
                  className="mt-4 text-xs text-primary hover:underline flex items-center gap-1 mx-auto"
                >
                  <Plus className="w-3 h-3" /> Tambah event
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {todayEvents.map((event) => {
                  const borderColors: Record<string, string> = {
                    focus: "before:bg-primary",
                    meeting: "before:bg-warning",
                    study: "before:bg-success",
                    other: "before:bg-info",
                  };
                  const iconColors: Record<string, string> = {
                    focus: "text-primary",
                    meeting: "text-warning",
                    study: "text-success",
                    other: "text-info",
                  };
                  return (
                    <div key={event.id} className="flex gap-4">
                      <div className="w-12 text-xs text-foreground-secondary font-medium pt-1 text-right shrink-0">
                        {event.startTime}
                      </div>
                      <div
                        className={`flex-1 bg-surface-elevated p-3 rounded-xl rounded-tl-none relative before:absolute before:w-1.5 before:-left-1.5 before:top-0 before:bottom-0 before:rounded-l-xl ${borderColors[event.category] ?? "before:bg-info"}`}
                      >
                        <div className="flex justify-between items-start">
                          <div
                            className={`flex gap-2 items-center text-sm font-semibold mb-1 ${iconColors[event.category] ?? "text-foreground"}`}
                          >
                            <Clock className="w-4 h-4" />
                            {event.title}
                          </div>
                          <button
                            onClick={() => deleteCalendarEvent(event.id)}
                            className="text-foreground-secondary hover:text-danger transition-colors p-0.5"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {event.description && (
                          <div className="text-xs text-foreground-secondary mt-1">
                            {event.description}
                          </div>
                        )}
                        <div className="text-xs text-foreground-secondary mt-1">
                          {event.startTime} – {event.endTime}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="text-xs font-semibold mb-4 text-center">
                Statistik Minggu Ini
              </div>
              <div className="space-y-2 text-xs">
                {(["focus", "meeting", "study", "other"] as const).map(
                  (cat) => {
                    const count = weekEvents.filter(
                      (e) => e.category === cat,
                    ).length;
                    const labels: Record<string, string> = {
                      focus: "Fokus",
                      meeting: "Rapat",
                      study: "Belajar",
                      other: "Lainnya",
                    };
                    const dotColors: Record<string, string> = {
                      focus: "bg-primary",
                      meeting: "bg-warning",
                      study: "bg-success",
                      other: "bg-info",
                    };
                    return (
                      <div
                        key={cat}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${dotColors[cat]}`}
                          ></span>
                          {labels[cat]}
                        </div>
                        <span className="text-foreground-secondary font-medium">
                          {count}
                        </span>
                      </div>
                    );
                  },
                )}
                <div className="pt-2 border-t border-border flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>{weekEvents.length}</span>
                </div>
              </div>
            </Card>
            <Card className="flex flex-col min-h-37.5">
              <div className="text-xs font-semibold mb-4 text-center">
                Jadwal vs. Selesai
              </div>
              <div className="flex-1 flex items-end justify-around gap-2 px-1 mt-auto h-full pt-4">
                {weekDays.slice(0, 3).map((day, i) => {
                  const dayEvCount = filteredWeekEvents.filter((e) => {
                    try {
                      return isSameDay(parseISO(e.date), day);
                    } catch {
                      return false;
                    }
                  }).length;
                  const max = Math.max(
                    ...weekDays.map(
                      (d) =>
                        filteredWeekEvents.filter((e) => {
                          try {
                            return isSameDay(parseISO(e.date), d);
                          } catch {
                            return false;
                          }
                        }).length,
                    ),
                    1,
                  );
                  const pct = (dayEvCount / max) * 100;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1 w-full h-full justify-end"
                    >
                      <div className="w-full flex items-end gap-1 px-0.5 h-full relative group">
                        <div
                          className="flex-1 bg-primary rounded-t-sm relative flex justify-center group-hover:brightness-110 transition-all"
                          style={{ height: `${Math.max(pct, 5)}%` }}
                        >
                          <span className="absolute -top-3.5 text-[8px] sm:text-[10px] text-primary font-bold">
                            {dayEvCount}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-foreground-secondary font-medium">
                        {DAY_ABBR_ID[i]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
