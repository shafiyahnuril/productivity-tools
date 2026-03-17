"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/Card";

export function ClockWidget() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Date());
    updateTime(); // Set initial time strictly on the client
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 h-full min-h-[140px]">
        <div className="animate-pulse bg-surface-elevated h-8 w-32 rounded mb-2"></div>
        <div className="animate-pulse bg-surface-elevated h-4 w-24 rounded"></div>
      </Card>
    );
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  const dayName = days[time.getDay()];
  const dateStr = `${time.getDate()} ${
    months[time.getMonth()]
  } ${time.getFullYear()}`;

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <Card className="flex flex-col items-center justify-center p-6 h-full min-h-[140px] bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>

      <div
        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-1 tabular-nums z-10"
        data-no-transition
      >
        {hours}:{minutes}
        <span className="text-primary/70 text-2xl md:text-3xl">:{seconds}</span>
      </div>
      <div className="text-sm md:text-base text-foreground-secondary font-medium z-10 flex items-center gap-1.5">
        <span className="text-primary">{dayName}</span>
        <span>•</span>
        <span>{dateStr}</span>
      </div>
    </Card>
  );
}
