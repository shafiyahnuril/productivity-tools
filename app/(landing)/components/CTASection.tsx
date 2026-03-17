"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const benefits = [
  { icon: "🆓", title: "100% Gratis", desc: "No hidden fees, forever free" },
  { icon: "🔒", title: "Privacy First", desc: "Data tersimpan di browser kamu" },
  { icon: "📱", title: "Semua Perangkat", desc: "Works on desktop & mobile" },
];

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 px-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--primary) 0%, #b45309 100%)",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Floating sticker chips */}
      <div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl pointer-events-none select-none"
        style={{
          top: "18%", left: "5%",
          background: "rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "var(--font-hand)",
          fontSize: "1.05rem",
          transform: "rotate(-6deg)",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.15)",
          animation: "float 5s ease-in-out infinite",
          "--r": "-6deg",
        } as React.CSSProperties}
      >
        all your tools ✨
      </div>

      <div
        className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl pointer-events-none select-none"
        style={{
          bottom: "20%", right: "6%",
          background: "rgba(255,255,255,0.18)",
          color: "rgba(255,255,255,0.85)",
          fontFamily: "var(--font-hand)",
          fontSize: "1.05rem",
          transform: "rotate(5deg)",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.15)",
          animation: "float 7s ease-in-out infinite",
          animationDelay: "1.5s",
          "--r": "5deg",
        } as React.CSSProperties}
      >
        stay organized 📌
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Caveat section label */}
        <div className="mb-4">
          <span
            className="text-xl"
            style={{
              fontFamily: "var(--font-hand)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            ✦ bergabunglah sekarang
          </span>
        </div>

        {/* Playfair Display heading */}
        <h2
          className="mb-5 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#fff",
          }}
        >
          Ayo Mulai,{" "}
          <br className="hidden sm:block" />
          <em>wujudkan produktivitasmu.</em>
        </h2>

        <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.1rem" }} className="mb-10 max-w-lg mx-auto">
          Mulai tingkatkan produktivitasmu sekarang — gratis selamanya.
          <br />
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem" }}>
            Start boosting your productivity today, completely free.
          </span>
        </p>

        {/* CTA Button */}
        <Link href="/dashboard">
          <button
            className="inline-flex items-center gap-2 px-8 py-3 rounded-[10px] font-bold text-lg transition-all duration-200 active:scale-95"
            style={{ background: "#fff", color: "var(--primary)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "none";
              el.style.transform = "translateY(0)";
            }}
          >
            <Zap size={20} />
            Mulai Sekarang
            <ArrowRight size={18} />
          </button>
        </Link>

        {/* Benefits grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <div className="text-2xl mb-2">{b.icon}</div>
              <h3
                className="font-semibold mb-1"
                style={{ color: "#fff", fontFamily: "var(--font-display)" }}
              >
                {b.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem" }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
