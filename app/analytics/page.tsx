"use client";

import Image from "next/image";

import { Heading1, Heading2, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button, Tag } from "../components/ui/Elements";
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
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 flex-shrink-0">
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
            <Text className="text-foreground-secondary">
              Analisis produktivitas dan pencapaianmu.
            </Text>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            Minggu Ini <ChevronDown className="w-4 h-4" />
          </Button>
          <Button className="flex items-center gap-2">
            <DownloadCloud className="w-4 h-4" /> Export Data
          </Button>
        </div>
      </header>

      <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">RINGKASAN STATISTIK</Heading2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <Tag
              variant="success"
              className="bg-success/20 text-success border-success/30"
            >
              +12%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground-secondary text-sm">
              Total Waktu Fokus
            </Text>
            <div className="text-3xl font-bold mt-1">24j 15m</div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-success/20 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <Tag
              variant="success"
              className="bg-success/20 text-success border-success/30"
            >
              +5%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground-secondary text-sm">
              Tugas Selesai
            </Text>
            <div className="text-3xl font-bold mt-1">48</div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-warning/20 rounded-xl">
              <BookOpen className="w-6 h-6 text-warning" />
            </div>
            <Tag
              variant="danger"
              className="bg-danger/20 text-danger border-danger/30"
            >
              -2%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground-secondary text-sm">
              Materi Dipelajari
            </Text>
            <div className="text-3xl font-bold mt-1">12 Topik</div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-info/20 rounded-xl">
              <Target className="w-6 h-6 text-info" />
            </div>
            <Tag
              variant="success"
              className="bg-success/20 text-success border-success/30"
            >
              +18%
            </Tag>
          </div>
          <div>
            <Text className="text-foreground-secondary text-sm">
              Target Harian
            </Text>
            <div className="text-3xl font-bold mt-1">85%</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-6">
          <div className="flex justify-between items-center">
            <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">TREN FOKUS MINGGUAN</Heading2>
            <div className="relative">
              <select className="appearance-none bg-background border border-border rounded-lg text-sm pl-3 pr-8 py-1.5 text-foreground focus:outline-none cursor-pointer">
                <option>Waktu (Jam)</option>
                <option>Sesi</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-secondary" />
            </div>
          </div>
          <div className="h-[300px] w-full">
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

        <Card className="space-y-6">
          <div className="flex justify-between items-center">
            <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">TUGAS SELESAI PER MINGGU</Heading2>
            <div className="relative">
              <select className="appearance-none bg-background border border-border rounded-lg text-sm pl-3 pr-8 py-1.5 text-foreground focus:outline-none cursor-pointer">
                <option>Bulan Ini</option>
                <option>Bulan Lalu</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-secondary" />
            </div>
          </div>
          <div className="h-[300px] w-full">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 space-y-6">
          <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">DISTRIBUSI AKTIVITAS</Heading2>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataDistribusi}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
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
          <div className="space-y-3 pt-4 border-t border-border">
            {dataDistribusi.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-foreground-secondary">{item.name}</span>
                </div>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="flex justify-between items-center">
            <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">PENCAPAIAN SASARAN (GOALS)</Heading2>
            <Button
              variant="ghost"
              className="text-primary hover:bg-primary/10"
            >
              Lihat Semua
            </Button>
          </div>

          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Selesaikan Modul React</span>
                <span className="text-primary font-bold">80%</span>
              </div>
              <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
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

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">
                  Baca Buku &quot;Atomic Habits&quot;
                </span>
                <span className="text-success font-bold">45%</span>
              </div>
              <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
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

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Persiapan UTS Kalkulus</span>
                <span className="text-warning font-bold">20%</span>
              </div>
              <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
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
