"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heading2 } from "../../components/ui/Typography";

export function CTASection() {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-background-secondary/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-primary/40" />
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Mulai Sekarang / Get Started
            </p>
            <div className="w-1 h-6 rounded-full bg-primary/40" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground mb-6">
            Siap Tingkatkan Produktivitas?
            <br />
            <span className="text-foreground-secondary">Ready to Level Up?</span>
          </h2>

          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pengguna yang telah meningkatkan produktivitas mereka. Mulai gratis hari ini tanpa perlu kartu kredit.
          </p>
          <p className="text-sm text-foreground-tertiary mt-2">
            Join thousands of users who have boosted their productivity. Start free today—no credit card required.
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{
            background: "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
            opacity: 0.4,
          }}
        />

        {/* Main CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/dashboard">
            <motion.button
              className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Masuk ke Dashboard
            </motion.button>
          </Link>

          <motion.button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-surface-elevated border border-border text-foreground rounded-lg font-bold text-lg hover:shadow-sm active:scale-95 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tentang Kami / About Us
          </motion.button>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "100% Gratis", desc: "Tidak ada biaya tersembunyi" },
            { title: "Privacy First", desc: "Data Anda tetap rahasia" },
            { title: "Responsive", desc: "Bekerja di semua perangkat" },
          ].map((benefit, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">✓</div>
              <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
              <p className="text-sm text-foreground-tertiary">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
