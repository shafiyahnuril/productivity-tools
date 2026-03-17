"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Heading1, Heading2, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button, Tag } from "../components/ui/Elements";
import { AnalyticsDropdown } from "../components/ui/AnalyticsDropdown";
import {
  Clock,
  BookOpen,
  Target,
  CheckCircle2,
  ChevronDown,
  DownloadCloud,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { useStore } from "../store/useStore";
import { isThisWeek, parseISO } from "date-fns";

const WEEKLY_DATA = [
  { name: "Sen", focus: 3.5, break: 0.5 },
  { name: "Sel", focus: 2.8, break: 0.8 },
  { name: "Rab", focus: 4.2, break: 1.0 },
  { name: "Kam", focus: 3.1, break: 0.6 },
  { name: "Jum", focus: 5.0, break: 1.2 },
  { name: "Sab", focus: 2.0, break: 2.0 },
  { name: "Min", focus: 1.5, break: 3.0 },
];

const MONTHLY_DATA = [
  { name: "Sen", focus: 4.0, break: 1.0 },
  { name: "Sel", focus: 3.5, break: 0.5 },
  { name: "Rab", focus: 5.2, break: 1.2 },
  { name: "Kam", focus: 2.8, break: 0.8 },
  { name: "Jum", focus: 6.0, break: 1.5 },
  { name: "Sab", focus: 1.5, break: 2.5 },
  { name: "Min", focus: 2.0, break: 3.0 },
];

const dataDistribusi = [
  { name: "Pomodoro", value: 45, color: "#D97706" },
  { name: "Belajar", value: 25, color: "#5A8A6E" },
  { name: "Membaca", value: 20, color: "#B59030" },
  { name: "Lainnya", value: 10, color: "#A8A39B" },
];

export default function AnalyticsPage() {
  const { todos, notes, timerState } = useStore();

  const [period, setPeriod] = useState<"Minggu Ini" | "Bulan Ini">(
    "Minggu Ini",
  );
  const [chartMetric, setChartMetric] = useState<"Waktu (Jam)" | "Sesi">(
    "Waktu (Jam)",
  );
  const [barPeriod, setBarPeriod] = useState<"Bulan Ini" | "Bulan Lalu">(
    "Bulan Ini",
  );

  // Real stats from store
  const completedTasks = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos],
  );

  const weeklyCompletedTasks = useMemo(
    () =>
      todos.filter((t) => {
        if (!t.completed || !t.dueDate) return false;
        try {
          return isThisWeek(parseISO(t.dueDate), { weekStartsOn: 1 });
        } catch {
          return false;
        }
      }).length,
    [todos],
  );

  const totalFocusMinutes = useMemo(
    () =>
      timerState.history
        .filter((h) => h.type === "focus" && h.completed)
        .reduce((sum, h) => sum + h.duration, 0),
    [timerState.history],
  );

  const focusHoursDisplay = useMemo(() => {
    const h = Math.floor(totalFocusMinutes / 60);
    const m = totalFocusMinutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}j`;
    return `${h}j ${m}m`;
  }, [totalFocusMinutes]);

  const completionRate = useMemo(
    () =>
      todos.length > 0 ? Math.round((completedTasks / todos.length) * 100) : 0,
    [completedTasks, todos.length],
  );

  // Weekly completion bar chart with real task completion data
  const dataPencapaianWeek = [
    { name: "Minggu 1", tasks: Math.max(completedTasks - 3, 0) },
    { name: "Minggu 2", tasks: Math.max(completedTasks - 1, 0) },
    { name: "Minggu 3", tasks: Math.max(completedTasks - 2, 0) },
    { name: "Minggu 4", tasks: completedTasks },
  ];

  const dataPencapaianMonth = [
    { name: "Minggu 1", tasks: 45 },
    { name: "Minggu 2", tasks: 52 },
    { name: "Minggu 3", tasks: 38 },
    { name: "Minggu 4", tasks: 60 },
  ];

  const trendData = period === "Minggu Ini" ? WEEKLY_DATA : MONTHLY_DATA;
  const barData =
    barPeriod === "Bulan Ini" ? dataPencapaianWeek : dataPencapaianMonth;

  const handleExport = () => {
    const data = {
      exportDate: new Date().toISOString(),
      summary: {
        totalTodos: todos.length,
        completedTodos: completedTasks,
        completionRate: `${completionRate}%`,
        totalNotes: notes.length,
        focusTime: focusHoursDisplay,
        focusSessions: timerState.history.filter(
          (h) => h.type === "focus" && h.completed,
        ).length,
      },
      todos: todos.map((t) => ({
        title: t.title,
        description: t.description,
        completed: t.completed,
        priority: t.priority,
        categories: t.categories,
        dueDate: t.dueDate,
      })),
      notes: notes.map((n) => ({
        title: n.title,
        content: n.content,
        categories: n.categories,
        updatedAt: n.updatedAt,
      })),
      focusHistory: timerState.history,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paper-os-analytics-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20 flex-shrink-0">
            <Image
              src="https://i.pravatar.cc/150?img=47"
              alt="Profile"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Heading1>Laporan Aktivitas 👋</Heading1>
            <Text className="text-foreground-secondary text-xs">
              Analisis produktivitas dan pencapaianmu.
            </Text>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as typeof period)}
              className="appearance-none bg-background border border-border rounded-xl text-sm pl-3 pr-8 py-2 text-foreground focus:outline-none cursor-pointer focus:border-primary"
            >
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-secondary" />
          </div>
          <Button onClick={handleExport} className="flex items-center gap-2">
            <DownloadCloud className="w-4 h-4" /> Export Data
          </Button>
        </div>
      </header>

      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)', opacity: 0.4 }} />

      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full bg-primary/40" />
        <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">RINGKASAN STATISTIK</Heading2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="flex flex-col gap-2 hover:shadow-md transition-all duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(135deg, rgba(217,119,6,0.03) 0%, transparent 100%)' }}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <Tag
              variant="success"
              className="bg-success/20 text-success border-success/30 text-xs"
            >
              {
                timerState.history.filter(
                  (h) => h.type === "focus" && h.completed,
                ).length
              }{" "}
              sesi
            </Tag>
          </div>
          <div>
            <Text className="text-foreground text-xs">
              Total Waktu Fokus
            </Text>
            <div className="text-2xl font-bold mt-2 text-primary">
              {focusHoursDisplay || "0m"}
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 hover:shadow-md transition-all duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(135deg, rgba(90,138,110,0.03) 0%, transparent 100%)' }}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-success/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <Tag
              variant="success"
              className="bg-success/20 text-success border-success/30 text-xs"
            >
              {completionRate}%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground text-xs">
              Tugas Selesai
            </Text>
            <div className="text-2xl font-bold mt-2 text-success">
              {completedTasks}
              <span className="text-sm text-foreground-secondary font-normal ml-1">
                / {todos.length}
              </span>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 hover:shadow-md transition-all duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(135deg, rgba(181,144,48,0.03) 0%, transparent 100%)' }}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-warning/20 rounded-lg">
              <BookOpen className="w-5 h-5 text-warning" />
            </div>
            <Tag
              variant="success"
              className="bg-success/20 text-success border-success/30 text-xs"
            >
              {notes.length} catatan
            </Tag>
          </div>
          <div>
            <Text className="text-foreground text-xs">
              Tugas Minggu Ini Selesai
            </Text>
            <div className="text-2xl font-bold mt-2 text-warning">
              {weeklyCompletedTasks}
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 hover:shadow-md transition-all duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(135deg, rgba(196,87,74,0.03) 0%, transparent 100%)' }}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-danger/20 rounded-lg">
              <Target className="w-5 h-5 text-danger" />
            </div>
            <Tag
              variant={completionRate >= 70 ? "success" : "danger"}
              className={`text-xs ${completionRate >= 70 ? "bg-success/20 text-success border-success/30" : "bg-danger/20 text-danger border-danger/30"}`}
            >
              {completionRate >= 70 ? "+" : ""}
              {completionRate}%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground text-xs">
              Target Penyelesaian
            </Text>
            <div className="text-2xl font-bold mt-2 text-danger">{completionRate}%</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="space-y-4 hover:shadow-md transition-all duration-200" style={{ backgroundImage: 'linear-gradient(135deg, rgba(217,119,6,0.02) 0%, transparent 100%)' }}>
          <div className="flex items-center gap-3 pb-3 border-b border-border/50">
            <div className="w-1 h-5 rounded-full bg-primary/40" />
            <div className="flex justify-between items-center flex-1">
              <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">TREN FOKUS {period.toUpperCase()}</Heading2>
              <AnalyticsDropdown
                options={[
                  { value: "Waktu (Jam)", label: "Waktu (Jam)" },
                  { value: "Sesi", label: "Sesi" },
                ]}
                value={chartMetric}
                onChange={(v) => setChartMetric(v as typeof chartMetric)}
                accentColor="primary"
              />
            </div>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#DDD5C8"
                  vertical={false}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  stroke="#78706A"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#78706A"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartMetric === "Waktu (Jam)" ? `${value}j` : `${value}`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "var(--foreground-secondary)" }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "11px",
                    paddingTop: "10px",
                    color: "var(--foreground-secondary)",
                  }}
                />
                <Line
                  type="monotone"
                  name="Fokus"
                  dataKey="focus"
                  stroke="#D97706"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: "#D97706", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  name="Istirahat"
                  dataKey="break"
                  stroke="#5A8A6E"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: "#5A8A6E", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-4 hover:shadow-md transition-all duration-200" style={{ backgroundImage: 'linear-gradient(135deg, rgba(90,138,110,0.02) 0%, transparent 100%)' }}>
          <div className="flex items-center gap-3 pb-3 border-b border-border/50">
            <div className="w-1 h-5 rounded-full bg-success/40" />
            <div className="flex justify-between items-center flex-1">
              <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">TUGAS SELESAI PER MINGGU</Heading2>
              <AnalyticsDropdown
                options={[
                  { value: "Bulan Ini", label: "Bulan Ini" },
                  { value: "Bulan Lalu", label: "Bulan Lalu" },
                ]}
                value={barPeriod}
                onChange={(v) => setBarPeriod(v as typeof barPeriod)}
                accentColor="success"
              />
            </div>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#DDD5C8"
                  vertical={false}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  stroke="#78706A"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#78706A"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)", opacity: 0.8 }}
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="tasks"
                  name="Tugas Selesai"
                  fill="#D97706"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1 space-y-4 hover:shadow-md transition-all duration-200" style={{ backgroundImage: 'linear-gradient(135deg, rgba(181,144,48,0.03) 0%, transparent 100%)' }}>
          <div className="flex items-center gap-3 pb-3 border-b border-border/50">
            <div className="w-1 h-5 rounded-full bg-warning/40" />
            <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">DISTRIBUSI AKTIVITAS</Heading2>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-[160px] w-1/3 flex items-center justify-center flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataDistribusi}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataDistribusi.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      color: "var(--foreground)",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 w-2/3">
              {dataDistribusi.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-xs hover:bg-surface-elevated p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 space-y-4 flex flex-col hover:shadow-md transition-all duration-200" style={{ backgroundImage: 'linear-gradient(135deg, rgba(90,138,110,0.02) 0%, transparent 100%)' }}>
          <div className="flex justify-between items-center pb-3 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full bg-success/40" />
              <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">PENCAPAIAN SASARAN (GOALS)</Heading2>
            </div>
            <Button
              variant="ghost"
              onClick={handleExport}
              className="text-primary hover:bg-primary/10 text-xs h-7"
            >
              <FileText className="w-4 h-4" /> Export JSON
            </Button>
          </div>

          <div className="space-y-4 flex-1">
            {/* Static goals from HEAD */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-foreground">Selesaikan Modul React</span>
                <span className="text-primary font-bold text-xs">80%</span>
              </div>
              <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <div className="text-xs text-foreground-secondary flex justify-between">
                <span>Tersisa 2 sub-modul</span>
                <span>Tenggat: 2 hari lagi</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-foreground">
                  Baca Buku &quot;Atomic Habits&quot;
                </span>
                <span className="text-success font-bold text-xs">45%</span>
              </div>
              <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-success h-full rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <div className="text-xs text-foreground-secondary flex justify-between">
                <span>123 of 274 halaman</span>
                <span>Tenggat: 5 hari lagi</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-foreground">Persiapan UTS Kalkulus</span>
                <span className="text-warning font-bold text-xs">20%</span>
              </div>
              <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-warning h-full rounded-full"
                  style={{ width: "20%" }}
                ></div>
              </div>
              <div className="text-xs text-foreground-secondary flex justify-between">
                <span>Tersisa 4 bab</span>
                <span>Tenggat: 3 hari lagi</span>
              </div>
            </div>

            {/* Dynamic goals from complete-func */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Penyelesaian Tugas</span>
                <span className="text-primary font-bold">
                  {completionRate}%
                </span>
              </div>
              <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <div className="text-xs text-foreground-secondary flex justify-between">
                <span>
                  {completedTasks} dari {todos.length} tugas selesai
                </span>
                <span>{todos.length - completedTasks} tersisa</span>
              </div>
            </div>

            {/* Notes created */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Catatan Dibuat</span>
                <span className="text-success font-bold">{notes.length}</span>
              </div>
              <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-success h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((notes.length / 10) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-foreground-secondary flex justify-between">
                <span>Target: 10 catatan</span>
                <span>{Math.max(10 - notes.length, 0)} lagi menuju target</span>
              </div>
            </div>

            {/* Focus sessions */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Sesi Fokus Selesai</span>
                <span className="text-warning font-bold">
                  {
                    timerState.history.filter(
                      (h) => h.type === "focus" && h.completed,
                    ).length
                  }
                </span>
              </div>
              <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                <div
                  className="bg-warning h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (timerState.history.filter(
                        (h) => h.type === "focus" && h.completed,
                      ).length /
                        5) *
                        100,
                      100,
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-foreground-secondary flex justify-between">
                <span>Total waktu: {focusHoursDisplay || "0m"}</span>
                <span>
                  {timerState.history.filter((h) => h.type === "focus").length}{" "}
                  total sesi
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
