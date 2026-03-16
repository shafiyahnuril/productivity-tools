"use client";

import { useState } from "react";
import { Card } from "../ui/Card";
import { useStore } from "../../store/useStore";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function CalendarWidget() {
  const { todos } = useStore();
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState<Date>(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Build 42-cell grid (6 rows × 7 cols)
  type Cell = { day: number; date: Date; isCurrentMonth: boolean };
  const cells: Cell[] = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    cells.push({ day: d, date: new Date(year, month - 1, d), isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, date: new Date(year, month, d), isCurrentMonth: true });
  }
  while (cells.length < 42) {
    const d = cells.length - firstDayOfMonth - daysInMonth + 1;
    cells.push({ day: d, date: new Date(year, month + 1, d), isCurrentMonth: false });
  }

  // Days that have todos due (any todo with dueDate)
  const dueDates = new Set(
    todos
      .filter((t) => t.dueDate)
      .map((t) => {
        const d = new Date(t.dueDate!);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
  );

  const hasDue = (date: Date) =>
    dueDates.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

  // Events for the selected day
  const selectedDateStr = `${selectedDay.getFullYear()}-${selectedDay.getMonth()}-${selectedDay.getDate()}`;
  const selectedEvents = todos.filter((t) => {
    if (!t.dueDate) return false;
    const d = new Date(t.dueDate);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === selectedDateStr;
  });

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(today);
  };

  const isSelected = (date: Date) => isSameDay(date, selectedDay);
  const isToday = (date: Date) => isSameDay(date, today);

  const formatDueTime = (dueDate: string) => {
    const d = new Date(dueDate);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const TAG_COLORS: Record<string, string> = {
    Assignment: "bg-primary",
    Exam: "bg-warning",
    Study: "bg-success",
  };

  return (
    <Card className="stagger-card flex-1 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground-secondary hover:bg-surface-elevated hover:text-foreground transition-colors"
        >
          &lsaquo;
        </button>
        <button
          onClick={goToday}
          className="text-sm font-semibold hover:text-primary transition-colors"
        >
          {MONTHS[month]} {year}
        </button>
        <button
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground-secondary hover:bg-surface-elevated hover:text-foreground transition-colors"
        >
          &rsaquo;
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className={d === "Su" ? "text-foreground-secondary" : ""}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs mb-4">
        {cells.map(({ day, date, isCurrentMonth }, idx) => {
          const todayCell = isToday(date);
          const selectedCell = isSelected(date);
          const due = hasDue(date);

          return (
            <button
              key={idx}
              onClick={() => setSelectedDay(date)}
              className={`relative w-6 h-6 mx-auto rounded-full flex items-center justify-center transition-colors text-[11px] font-medium
                ${!isCurrentMonth ? "text-foreground-tertiary" : ""}
                ${selectedCell && !todayCell ? "bg-primary/20 text-primary" : ""}
                ${todayCell ? "bg-primary text-white font-bold" : ""}
                ${!selectedCell && !todayCell && isCurrentMonth ? "hover:bg-surface-elevated" : ""}
              `}
            >
              {day}
              {due && !todayCell && !selectedCell && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/60" />
              )}
            </button>
          );
        })}
      </div>

      {/* Events for selected day */}
      <div className="border-t border-border pt-4 mt-auto">
        <div className="text-sm font-semibold mb-3">
          {isToday(selectedDay) ? "Today's Events" : (
            selectedDay.toLocaleDateString([], { month: "short", day: "numeric" }) + " Events"
          )}
        </div>
        {selectedEvents.length === 0 ? (
          <div className="text-xs text-foreground-tertiary">No events this day.</div>
        ) : (
          <div className="space-y-3">
            {selectedEvents.map((todo) => {
              const color = TAG_COLORS[todo.categories[0]] ?? "bg-primary";
              return (
                <div key={todo.id} className="flex gap-3 relative pl-3">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${color}`} />
                  <div>
                    <div className={`text-xs font-semibold ${todo.completed ? "line-through text-foreground-tertiary" : ""}`}>
                      {todo.title}
                    </div>
                    <div className="text-[10px] text-foreground-secondary mt-0.5">
                      {todo.categories.join(", ")} · {formatDueTime(todo.dueDate!)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
