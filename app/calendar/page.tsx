"use client";

import Image from "next/image";

import { Heading1, Heading2, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Elements";
import {
  Search,
  Plus,
  MoreHorizontal,
  Clock,
  BookOpen,
  Briefcase,
} from "lucide-react";

export default function CalendarPage() {
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
          <Button className="!hidden md:!inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              type="text"
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
              placeholder="Search calendar events, notes..."
              className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full"
            />
          </div>
        </div>
      </header>

      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full bg-primary/40" />
        <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">CALENDAR DETAIL</Heading2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Calendar Area - 2/3 width */}
        <div className="md:col-span-2">
          <Card className="p-0 overflow-hidden h-full flex flex-col">
            <div className="overflow-x-auto flex-1 flex flex-col">
              <div className="min-w-[800px] flex-1 flex flex-col">
                <div className="grid grid-cols-8 border-b border-border bg-surface-elevated text-center">
                  <div className="p-3"></div>
                  <div className="p-3 border-l border-border">
                    <div className="font-semibold text-sm text-primary">
                      Monday
                    </div>
                    <div className="text-xs text-primary">Sen 16 Mar</div>
                    <div className="w-8 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
                  </div>
                  <div className="p-3 border-l border-border">
                    <div className="font-semibold text-sm">Tuesday</div>
                    <div className="text-xs text-foreground-secondary">
                      Sel 17 Mar
                    </div>
                  </div>
                  <div className="p-3 border-l border-border">
                    <div className="font-semibold text-sm">Wednesday</div>
                    <div className="text-xs text-foreground-secondary">
                      Rab 18 Mar
                    </div>
                  </div>
                  <div className="p-3 border-l border-border">
                    <div className="font-semibold text-sm">Thursday</div>
                    <div className="text-xs text-foreground-secondary">
                      Kam 19 Mar
                    </div>
                  </div>
                  <div className="p-3 border-l border-border">
                    <div className="font-semibold text-sm">Friday</div>
                    <div className="text-xs text-foreground-secondary">
                      Jum 20 Mar
                    </div>
                  </div>
                  <div className="p-3 border-l border-border">
                    <div className="font-semibold text-sm">Saturday</div>
                    <div className="text-xs text-foreground-secondary">
                      Sab 21 Mar
                    </div>
                  </div>
                  <div className="p-3 border-l border-border">
                    <div className="font-semibold text-sm text-danger">
                      Sunday
                    </div>
                    <div className="text-xs text-danger/70">Min 22 Mar</div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-surface relative min-h-125" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.02) 14.28%, transparent 14.28%, transparent 100%)', backgroundSize: '100% 100%' }}>
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
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`border-r border-border relative ${i === 0 ? "bg-primary/5" : ""}`}
                      >
                        {[...Array(15)].map((_, j) => (
                          <div
                            key={j}
                            className="h-11.5 border-b border-border/50 w-full"
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Events (Positioned absolutely) */}
                  <div className="absolute ml-[12.5%] inset-0">
                    {/* Monday */}
                    <div className="absolute top-23 left-[0%] w-[14.28%] px-1">
                      <div className="bg-primary/90 text-white p-2 rounded-lg text-xs leading-tight min-h-15 shadow-sm">
                        <div className="font-semibold mb-0.5">
                          10:00 - 11:30
                        </div>
                        <div>
                          Sesi Fokus
                          <br />
                          Pomodoro
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-69 left-[0%] w-[14.28%] px-1">
                      <div className="bg-warning/90 text-white p-2 rounded-lg text-xs leading-tight min-h-11.5 shadow-sm">
                        <div className="font-semibold mb-0.5">
                          14:00 - 15:00
                        </div>
                        <div>Rapat Tim</div>
                      </div>
                    </div>
                    <div className="absolute top-126.5 left-[0%] w-[14.28%] px-1">
                      <div className="bg-success/90 text-white p-2 rounded-lg text-xs leading-tight min-h-23 shadow-sm">
                        <div className="font-semibold mb-0.5">
                          19:00 - 21:00
                        </div>
                        <div>Belajar Biologi</div>
                      </div>
                    </div>

                    {/* Tuesday */}
                    <div className="absolute top-11.5 left-[14.28%] w-[14.28%] px-1">
                      <div className="bg-primary/70 text-white p-2 rounded-lg text-xs leading-tight min-h-11.5 shadow-sm">
                        <div className="font-semibold mb-0.5">
                          09:00 - 10:00
                        </div>
                        <div>Fokus Pagi</div>
                      </div>
                    </div>
                    <div className="absolute top-57.5 left-[14.28%] w-[14.28%] px-1">
                      <div className="bg-warning/90 text-white p-2 rounded-lg text-xs leading-tight min-h-11.5 shadow-sm">
                        <div className="font-semibold mb-0.5">
                          13:00 - 14:00
                        </div>
                        <div>Konsultasi Prof</div>
                      </div>
                    </div>

                    {/* Wednesday */}
                    <div className="absolute top-34.5 left-[28.56%] w-[14.28%] px-1">
                      <div className="bg-primary/80 text-white p-2 rounded-lg text-xs leading-tight min-h-11.5 shadow-sm">
                        <div className="font-semibold mb-0.5">
                          11:00 - 12:00
                        </div>
                        <div>Fokus</div>
                      </div>
                    </div>
                    <div className="absolute top-80.5 left-[28.56%] w-[14.28%] px-1">
                      <div className="bg-warning text-white p-2 rounded-lg text-xs leading-tight min-h-23 shadow-sm">
                        <div className="font-semibold mb-0.5">
                          15:00 - 17:00
                        </div>
                        <div>Rapat Proyek</div>
                      </div>
                    </div>
                  </div>

                  {/* Current time line */}
                  <div className="absolute left-0 right-0 top-50 z-20 flex items-center">
                    <div className="w-[12.5%] text-right pr-2 text-danger text-[10px] font-bold">
                      12:20
                    </div>
                    <div className="flex-1 border-t-2 border-danger relative">
                      <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-danger"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar right - 1/3 width */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <Card className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">AGENDA HARI INI - 16 MAR</Heading2>
              <MoreHorizontal className="w-5 h-5 text-foreground-secondary cursor-pointer" />
            </div>

            <div className="space-y-5">
              {/* Timeline item */}
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
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="text-xs font-semibold mb-4 text-center">
                Statistik Jadwal Minggu Ini
              </div>
              <div className="flex items-center gap-4 justify-center flex-wrap">
                <div className="w-20 h-20 rounded-full border-8 border-t-primary border-r-success border-b-warning border-l-border relative"></div>
                <div className="space-y-2 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>{" "}
                    Fokus{" "}
                    <span className="text-foreground-secondary ml-1">40%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success"></span>{" "}
                    Belajar{" "}
                    <span className="text-foreground-secondary ml-1">30%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-warning"></span>{" "}
                    Rapat{" "}
                    <span className="text-foreground-secondary ml-1">20%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-border"></span>{" "}
                    Lainnya{" "}
                    <span className="text-foreground-secondary ml-1">10%</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="flex flex-col min-h-[150px]">
              <div className="text-xs font-semibold mb-4 text-center">
                Jadwal vs. Selesai
              </div>
              <div className="flex-1 flex items-end justify-around gap-2 px-1 mt-auto h-full pt-4">
                {[
                  { day: "Sen", scheduled: 8, completed: 5 },
                  { day: "Sel", scheduled: 10, completed: 7 },
                  { day: "Rab", scheduled: 6, completed: 4 },
                ].map((item) => {
                  const max = 10;
                  const schedPct = (item.scheduled / max) * 100;
                  const compPct = (item.completed / max) * 100;
                  return (
                    <div
                      key={item.day}
                      className="flex flex-col items-center gap-1 w-full h-full justify-end"
                    >
                      <div className="w-full flex items-end gap-1 px-0.5 h-full relative group">
                        <div
                          className="flex-1 bg-surface-elevated rounded-t-sm relative flex justify-center group-hover:bg-surface-elevated/80 transition-colors"
                          style={{ height: `${schedPct}%` }}
                        >
                          <span className="absolute -top-3.5 text-[8px] sm:text-[10px] text-foreground-secondary font-medium">
                            {item.scheduled}
                          </span>
                        </div>
                        <div
                          className="flex-1 bg-primary rounded-t-sm relative flex justify-center group-hover:brightness-110 transition-all"
                          style={{ height: `${compPct}%` }}
                        >
                          <span className="absolute -top-3.5 text-[8px] sm:text-[10px] text-primary font-bold">
                            {item.completed}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-foreground-secondary font-medium">
                        {item.day}
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
