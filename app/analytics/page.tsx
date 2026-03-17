"use client";

import Image from "next/image";
import { useState } from "react";

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

const dataMingguan = [
  { name: "Sen", focus: 3.5, break: 0.5 },
  { name: "Sel", focus: 2.8, break: 0.8 },
  { name: "Rab", focus: 4.2, break: 1.0 },
  { name: "Kam", focus: 3.1, break: 0.6 },
  { name: "Jum", focus: 5.0, break: 1.2 },
  { name: "Sab", focus: 2.0, break: 2.0 },
  { name: "Min", focus: 1.5, break: 3.0 },
];

const dataDistribusi = [
  { name: "Pomodoro", value: 45, color: "#D97706" },
  { name: "Belajar", value: 25, color: "#5A8A6E" },
  { name: "Membaca", value: 20, color: "#B59030" },
  { name: "Lainnya", value: 10, color: "#A8A39B" },
];

const dataPencapaian = [
  { name: "Minggu 1", tasks: 45 },
  { name: "Minggu 2", tasks: 52 },
  { name: "Minggu 3", tasks: 38 },
  { name: "Minggu 4", tasks: 60 },
];

export default function AnalyticsPage() {
  const [trendFilter, setTrendFilter] = useState("waktu");
  const [achievementFilter, setAchievementFilter] = useState("bulan");

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
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            Minggu Ini <ChevronDown className="w-4 h-4" />
          </Button>
          <Button className="flex items-center gap-2 text-sm">
            <DownloadCloud className="w-4 h-4" /> Export Data
          </Button>
        </div>
      </header>

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
              +12%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground text-xs">
              Total Waktu Fokus
            </Text>
            <div className="text-2xl font-bold mt-2 text-primary">24j 15m</div>
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
              +5%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground text-xs">
              Tugas Selesai
            </Text>
            <div className="text-2xl font-bold mt-2 text-success">48</div>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 hover:shadow-md transition-all duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(135deg, rgba(181,144,48,0.03) 0%, transparent 100%)' }}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-warning/20 rounded-lg">
              <BookOpen className="w-5 h-5 text-warning" />
            </div>
            <Tag
              variant="danger"
              className="bg-danger/20 text-danger border-danger/30 text-xs"
            >
              -2%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground text-xs">
              Materi Dipelajari
            </Text>
            <div className="text-2xl font-bold mt-2 text-warning">12 Topik</div>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 hover:shadow-md transition-all duration-200 hover:scale-105" style={{ backgroundImage: 'linear-gradient(135deg, rgba(196,87,74,0.03) 0%, transparent 100%)' }}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-danger/20 rounded-lg">
              <Target className="w-5 h-5 text-danger" />
            </div>
            <Tag
              variant="success"
              className="bg-success/20 text-success border-success/30 text-xs"
            >
              +18%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground text-xs">
              Target Harian
            </Text>
            <div className="text-2xl font-bold mt-2 text-danger">85%</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="space-y-4 hover:shadow-md transition-all duration-200" style={{ backgroundImage: 'linear-gradient(135deg, rgba(217,119,6,0.02) 0%, transparent 100%)' }}>
          <div className="flex items-center gap-3 pb-3 border-b border-border/50">
            <div className="w-1 h-5 rounded-full bg-primary/40" />
            <div className="flex justify-between items-center flex-1">
              <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">TREN FOKUS MINGGUAN</Heading2>
              <AnalyticsDropdown
                options={[
                  { value: "waktu", label: "Waktu (Jam)" },
                  { value: "sesi", label: "Sesi" },
                ]}
                value={trendFilter}
                onChange={setTrendFilter}
                accentColor="primary"
              />
            </div>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dataMingguan}
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
                  tickFormatter={(value) => `${value}j`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    color: "var(--color-foreground)",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "var(--color-foreground-secondary)" }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "11px",
                    paddingTop: "10px",
                    color: "var(--color-foreground-secondary)",
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
                  { value: "bulan", label: "Bulan Ini" },
                  { value: "lalu", label: "Bulan Lalu" },
                ]}
                value={achievementFilter}
                onChange={setAchievementFilter}
                accentColor="success"
              />
            </div>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataPencapaian}
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
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    color: "var(--color-foreground)",
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
                      backgroundColor: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "12px",
                      color: "var(--color-foreground)",
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
              className="text-primary hover:bg-primary/10 text-xs h-7"
            >
              Lihat Semua
            </Button>
          </div>

          <div className="space-y-4 flex-1">
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
                <span>Bab 4 dari 10</span>
                <span>Tenggat: 1 minggu lagi</span>
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
                <span>Baru mulai latihan soal</span>
                <span>Tenggat: 3 minggu lagi</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
