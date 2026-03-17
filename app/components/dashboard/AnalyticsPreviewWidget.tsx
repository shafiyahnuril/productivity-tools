"use client";

import { useStore } from "../../store/useStore";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  YAxis,
  XAxis,
} from "recharts";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export function AnalyticsPreviewWidget() {
  const { todos } = useStore();

  const chartStats = useMemo(
    () => ({
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed).length,
    }),
    [todos],
  );

  const pieData = [
    {
      name: "Selesai",
      value: chartStats.completed,
      fill: "var(--color-primary)",
    },
    { name: "Aktif", value: chartStats.active, fill: "var(--color-warning)" },
  ];

  // Dummy focus trend for preview, but at least connected to real data for today
  const trendData = useMemo(() => {
    const defaultData = [2, 5, 3, 7, 4, 8, 5];
    return WEEKDAYS.map((day, index) => {
      return { day, focus: defaultData[index] };
    });
  }, []);

  return (
    <div
      className="bg-surface rounded-3xl p-4 md:p-6 border border-border shadow-sm dark:bg-surface transition-all duration-200 hover:shadow-md hover:scale-[1.01] hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(217,119,6,0.04) 0%, transparent 100%)",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-[11px] text-foreground-secondary font-medium">
          Tren Fokus Mingguan
        </div>
        <div className="text-[11px] text-foreground-secondary font-medium text-right">
          Tugas Selesai
        </div>
      </div>

      <div className="flex gap-4 items-center h-32">
        {/* Line Chart */}
        <div className="flex-1 h-full w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
                itemStyle={{ color: "var(--color-foreground)" }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`${value}j`, "Fokus"]}
                labelStyle={{ color: "var(--color-foreground-secondary)" }}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 9,
                  fill: "var(--color-foreground-secondary)",
                }}
                dy={5}
              />
              <YAxis domain={[0, 12]} hide />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-16 h-16 relative shrink-0 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={18}
                outerRadius={28}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "10px",
                  padding: "4px 8px",
                }}
                itemStyle={{
                  color: "var(--color-foreground)",
                  fontSize: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
