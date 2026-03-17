"use client";

import { Clock, FileText, Calendar, CheckSquare, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Heading2, Text } from "../../components/ui/Typography";

const features = [
  {
    icon: Clock,
    titleEn: "Focus Timer",
    titleId: "Timer Fokus",
    descriptionEn: "Track your focus time with a beautiful pomodoro timer",
    descriptionId: "Pantau waktu fokus Anda dengan timer pomodoro yang elegan",
    color: "text-primary",
    accent: "bg-primary/10",
  },
  {
    icon: FileText,
    titleEn: "Smart Notes",
    titleId: "Catatan Pintar",
    descriptionEn: "Organize your thoughts and ideas in one place",
    descriptionId: "Atur pikiran dan ide Anda dalam satu tempat",
    color: "text-warning",
    accent: "bg-warning/10",
  },
  {
    icon: Calendar,
    titleEn: "Calendar",
    titleId: "Kalender",
    descriptionEn: "Plan your week and never miss important dates",
    descriptionId: "Rencanakan minggu Anda dan jangan lewatkan tanggal penting",
    color: "text-info",
    accent: "bg-info/10",
  },
  {
    icon: CheckSquare,
    titleEn: "To-Do List",
    titleId: "Daftar Tugas",
    descriptionEn: "Create and track your daily tasks with ease",
    descriptionId: "Buat dan pantau tugas harian Anda dengan mudah",
    color: "text-success",
    accent: "bg-success/10",
  },
  {
    icon: BarChart2,
    titleEn: "Analytics",
    titleId: "Analitik",
    descriptionEn: "Track your productivity trends and progress",
    descriptionId: "Pantau tren produktivitas dan kemajuan Anda",
    color: "text-primary",
    accent: "bg-primary/10",
  },
];

export function FeatureSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="features" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-primary/40" />
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Fitur Unggulan / Key Features
            </p>
            <div className="w-1 h-6 rounded-full bg-primary/40" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-6">
            Semua yang Anda Butuhkan
            <br />
            <span className="text-foreground-secondary">Everything You Need</span>
          </h2>

          <p className="text-foreground-secondary text-lg max-w-2xl mx-auto">
            Lengkapi kebutuhan produktivitas Anda dengan fitur-fitur yang dirancang untuk meningkatkan efisiensi.
            Complete your productivity needs with features designed to increase efficiency.
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-16"
          style={{
            background: "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
            opacity: 0.4,
          }}
        />

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                data-feature-card
                whileHover={{ y: -8, boxShadow: "var(--shadow-md)" }}
                className="group h-full"
              >
                <Card className="h-full flex flex-col gap-4 p-6 md:p-5 hover:shadow-md transition-all duration-200">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg ${feature.accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {feature.titleEn}
                    </h3>
                    <p className="text-xs text-foreground-tertiary">{feature.titleId}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground-secondary leading-relaxed flex-1">
                    {feature.descriptionEn}
                  </p>

                  {/* Indonesian Description */}
                  <p className="text-xs text-foreground-tertiary leading-relaxed">
                    {feature.descriptionId}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
