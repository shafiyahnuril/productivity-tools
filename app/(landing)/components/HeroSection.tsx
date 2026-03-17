"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const floatingElements = [
    {
      id: 1,
      text: "⏱️ Track Focus Hours",
      color: "border-l-primary",
      delay: 0,
      position: { top: "20%", right: "10%" },
    },
    {
      id: 2,
      text: "📝 Organize Notes",
      color: "border-l-warning",
      delay: 0.2,
      position: { bottom: "25%", left: "5%" },
    },
    {
      id: 3,
      text: "📅 Plan Your Week",
      color: "border-l-success",
      delay: 0.4,
      position: { top: "35%", left: "8%" },
    },
    {
      id: 4,
      text: "✓ Complete Tasks",
      color: "border-l-success",
      delay: 0.6,
      position: { bottom: "20%", right: "12%" },
    },
    {
      id: 5,
      text: "📊 Track Analytics",
      color: "border-l-primary",
      delay: 0.8,
      position: { top: "60%", right: "5%" },
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
      {/* Gradient Background Accent */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Floating Accent Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute hidden md:block px-4 py-2 border-l-4 ${element.color} bg-surface rounded-lg shadow-sm text-sm font-medium text-foreground-secondary whitespace-nowrap`}
          style={element.position as any}
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {element.text}
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center" data-hero>
        {/* Accent Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Welcome to Productivity
          </span>
        </div>

        {/* Main Headline - Bilingual */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-4 leading-tight">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-foreground to-foreground">
            Produktivitas
          </span>
          <br />
          <span className="hidden md:inline">Dimulai di Sini</span>
          <span className="md:hidden">Mulai Sekarang</span>
        </h1>

        {/* English Subtitle */}
        <p className="text-xl md:text-2xl text-foreground-secondary mb-2 font-light">
          Manage your time, notes, and tasks all in one place
        </p>

        {/* Indonesian Subtitle */}
        <p className="text-base md:text-lg text-foreground-tertiary mb-10 font-light max-w-2xl mx-auto">
          Kelola waktu fokus, catatan, kalender, dan to-do list Anda dengan mudah. Tingkatkan produktivitas dan raih target Anda lebih cepat.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/dashboard">
            <motion.button
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold text-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mulai Sekarang / Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <motion.button
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-surface-elevated border border-border text-foreground rounded-lg font-semibold text-lg hover:shadow-sm active:scale-95 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More / Pelajari Lebih
          </motion.button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-col md:flex-row justify-center gap-8 text-center">
          {[
            { number: "5+", label: "Fitur Lengkap" },
            { number: "100%", label: "Free & Open" },
            { number: "∞", label: "Unlimited Tasks" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-foreground-tertiary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
