"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { motion, AnimatePresence } from "framer-motion";

export function ClockWidget() {
  const [time, setTime] = useState<Date | null>(null);

  /* ── Tick every second ── */
  useEffect(() => {
    const tick = () => setTime(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Loading skeleton ── */
  if (!time) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 h-full min-h-[140px]">
        <div className="animate-pulse bg-surface-elevated h-8 w-32 rounded mb-2" />
        <div className="animate-pulse bg-surface-elevated h-4 w-24 rounded" />
      </Card>
    );
  }

  /* ── Formatting ── */
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayName = DAYS[time.getDay()];
  const dateStr = `${time.getDate()} ${MONTHS[time.getMonth()]} ${time.getFullYear()}`;
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <Card
      className="flex flex-col items-center justify-center p-6 min-h-[140px] relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(217,119,6,0.08) 0%, rgba(217,119,6,0.03) 100%)",
        borderColor: "rgba(217,119,6,0.2)",
      }}
    >
      {/* Ambient blobs */}
      <div className="absolute -right-6 -top-6  w-28 h-28 bg-primary/8 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-6  -bottom-6 w-28 h-28 bg-primary/8 rounded-full blur-2xl pointer-events-none" />

      {/* Time */}
      <div
        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-1 tabular-nums z-10 flex items-end"
        data-no-transition
      >
        <span>
          {hours}:{minutes}
        </span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={seconds}
            className="text-primary/70 text-2xl md:text-3xl ml-0.5 mb-0.5"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            :{seconds}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Day + Date */}
      <div className="text-sm md:text-base text-foreground-secondary font-medium z-10 flex items-center gap-1.5">
        <span className="text-primary">{dayName}</span>
        <span className="text-foreground-tertiary">•</span>
        <span>{dateStr}</span>
      </div>

      {/* Tick dot */}
      <motion.div
        className="mt-3 w-2 h-2 rounded-full bg-primary z-10"
        key={seconds}
        animate={{ scale: [1.4, 1], opacity: [1, 0.6] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </Card>
  );
}
