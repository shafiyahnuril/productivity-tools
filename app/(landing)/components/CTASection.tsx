"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const benefits = [
  { title: "100% Free",    desc: "No hidden fees, forever free" },
  { title: "Privacy First", desc: "Data stored in your browser" },
  { title: "All Devices",   desc: "Works on desktop & mobile" },
];

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 px-4 overflow-hidden"
      style={{
        background: "var(--background-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Floating sticker chips */}
      <div
        className="absolute hidden lg:flex items-center px-3 py-1.5 rounded-xl pointer-events-none select-none"
        style={{
          top: "18%", left: "5%",
          background: "var(--surface)",
          color: "var(--foreground-secondary)",
          border: "1px solid var(--border)",
          fontFamily: "var(--font-hand)",
          fontSize: "1.05rem",
          transform: "rotate(-6deg)",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.06)",
          animation: "float 5s ease-in-out infinite",
          "--r": "-6deg",
        } as React.CSSProperties}
      >
        all your tools
      </div>

      <div
        className="absolute hidden lg:flex items-center px-3 py-1.5 rounded-xl pointer-events-none select-none"
        style={{
          bottom: "20%", right: "6%",
          background: "var(--surface)",
          color: "var(--foreground-secondary)",
          border: "1px solid var(--border)",
          fontFamily: "var(--font-hand)",
          fontSize: "1.05rem",
          transform: "rotate(5deg)",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.06)",
          animation: "float 7s ease-in-out infinite",
          animationDelay: "1.5s",
          "--r": "5deg",
        } as React.CSSProperties}
      >
        stay organized
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Caveat section label */}
        <div className="mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-xl"
            style={{
              fontFamily: "var(--font-hand)",
              color: "var(--primary)",
            }}
          >
            join us now
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
            color: "var(--foreground)",
          }}
        >
          Get Started,{" "}
          <br className="hidden sm:block" />
          <em style={{ color: "var(--primary)" }}>unlock your full potential.</em>
        </h2>

        <p style={{ color: "var(--foreground-secondary)", fontSize: "1.1rem" }} className="mb-10 max-w-lg mx-auto">
          Start boosting your productivity now — free forever.
          <br />
          <span style={{ color: "var(--foreground-tertiary)", fontSize: "0.95rem" }}>
            No sign-up required. Just open and start.
          </span>
        </p>

        {/* CTA Button */}
        <Link href="/dashboard">
          <button
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95"
            style={{
              background: "var(--primary)",
              color: "#fff",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "var(--shadow-md)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "var(--shadow-sm)";
              el.style.transform = "translateY(0)";
            }}
          >
            Start Now
            <ArrowRight size={18} />
          </button>
        </Link>

        {/* Benefits grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--foreground)", fontFamily: "var(--font-display)" }}
                >
                  {b.title}
                </h3>
                <p style={{ color: "var(--foreground-secondary)", fontSize: "0.85rem" }}>{b.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
