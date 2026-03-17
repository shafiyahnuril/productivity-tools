"use client";

import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Smartphone,
  Infinity as InfinityIcon,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const benefits = [
  {
    title: "100% Free",
    desc: "No hidden fees, forever free",
    icon: InfinityIcon,
    color: "#5A8A6E",
  },
  {
    title: "Privacy First",
    desc: "Data stored in your browser",
    icon: Shield,
    color: "#3B7EC2",
  },
  {
    title: "All Devices",
    desc: "Works on desktop & mobile",
    icon: Smartphone,
    color: "#7C3AED",
  },
];

/* Sparkle particle type */
interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  dist: number;
}
const SPARK_COLORS = [
  "#D97706",
  "#F59E0B",
  "#7C3AED",
  "#C4574A",
  "#5A8A6E",
  "#fff",
];

export function CTASection() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [sparkKey, setSparkKey] = useState(0);

  const fireSparks = () => {
    const newSparks: Spark[] = Array.from({ length: 18 }, (_, i) => ({
      id: sparkKey + i,
      x: 50,
      y: 50,
      size: Math.random() * 7 + 4,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      angle: (i / 18) * 360,
      dist: Math.random() * 80 + 40,
    }));
    setSparks(newSparks);
    setSparkKey((k) => k + 18);
    setTimeout(() => setSparks([]), 700);
  };

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
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Ambient glow behind content */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(217,119,6,0.09) 0%, transparent 70%)",
          animation: "blob-drift 12s ease-in-out infinite",
          filter: "blur(4px)",
        }}
      />

      {/* Floating sticker chips */}
      <div
        className="absolute hidden lg:flex items-center px-3 py-1.5 rounded-xl pointer-events-none select-none"
        style={
          {
            top: "18%",
            left: "5%",
            background: "var(--surface)",
            color: "var(--foreground-secondary)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-hand)",
            fontSize: "1.05rem",
            transform: "rotate(-6deg)",
            boxShadow: "2px 4px 12px rgba(0,0,0,0.06)",
            animation: "float 5s ease-in-out infinite",
            "--r": "-6deg",
          } as React.CSSProperties
        }
      >
        all your tools
      </div>

      <div
        className="absolute hidden lg:flex items-center px-3 py-1.5 rounded-xl pointer-events-none select-none"
        style={
          {
            bottom: "20%",
            right: "6%",
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
          } as React.CSSProperties
        }
      >
        stay organized
      </div>

      {/* Extra chip */}
      <div
        className="absolute hidden xl:flex items-center px-3 py-1.5 rounded-xl pointer-events-none select-none"
        style={
          {
            bottom: "25%",
            left: "8%",
            background: "#FEF3C7",
            color: "#92400E",
            fontFamily: "var(--font-hand)",
            fontSize: "1rem",
            transform: "rotate(3deg)",
            boxShadow: "2px 4px 12px rgba(0,0,0,0.08)",
            animation: "float 6s ease-in-out infinite",
            animationDelay: "0.8s",
            "--r": "3deg",
          } as React.CSSProperties
        }
      >
        ✦ free forever
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Caveat section label */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="inline-flex items-center gap-1.5 text-xl"
            style={{ fontFamily: "var(--font-hand)", color: "var(--primary)" }}
          >
            <Zap size={16} style={{ color: "var(--primary)" }} />
            join us now
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="mb-5 leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--foreground)",
          }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get Started, <br className="hidden sm:block" />
          <em style={{ color: "var(--primary)" }}>
            unlock your full potential.
          </em>
        </motion.h2>

        <motion.p
          style={{ color: "var(--foreground-secondary)", fontSize: "1.1rem" }}
          className="mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Start boosting your productivity now — free forever.
          <br />
          <span
            style={{ color: "var(--foreground-tertiary)", fontSize: "0.95rem" }}
          >
            No sign-up required. Just open and start.
          </span>
        </motion.p>

        {/* CTA Button with spark effect */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            type: "spring",
            stiffness: 200,
          }}
        >
          {/* Rotating gradient border ring */}
          <span
            className="absolute inset-[-3px] rounded-[14px] pointer-events-none"
            style={
              {
                background:
                  "conic-gradient(from var(--angle), var(--primary), #7C3AED, #F59E0B, var(--primary))",
                animation: "border-rotate 2.5s linear infinite",
                filter: "blur(1px)",
                opacity: 0.6,
              } as React.CSSProperties
            }
          />

          <Link href="/dashboard">
            <motion.button
              className="btn-shine relative inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg overflow-hidden"
              style={{
                background: "var(--primary)",
                color: "#fff",
                zIndex: 1,
                boxShadow: "0 4px 18px rgba(217,119,6,0.45)",
              }}
              whileHover={{
                scale: 1.04,
                y: -2,
                boxShadow: "0 8px 28px rgba(217,119,6,0.6)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              onHoverStart={fireSparks}
            >
              Start Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.3,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>
          </Link>

          {/* Spark particles */}
          <AnimatePresence>
            {sparks.map((spark) => (
              <motion.span
                key={spark.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: spark.size,
                  height: spark.size,
                  background: spark.color,
                  left: `${spark.x}%`,
                  top: `${spark.y}%`,
                }}
                initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                animate={{
                  scale: 0,
                  opacity: 0,
                  x: Math.cos((spark.angle * Math.PI) / 180) * spark.dist,
                  y: Math.sin((spark.angle * Math.PI) / 180) * spark.dist,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Benefits grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                className="text-center group cursor-default"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.4, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                {/* Icon circle */}
                <motion.div
                  className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                  style={{
                    background: b.color + "18",
                    border: `1px solid ${b.color}28`,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 8,
                    background: b.color + "28",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={20} style={{ color: b.color }} />
                </motion.div>
                <h3
                  className="font-semibold mb-1"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    color: "var(--foreground-secondary)",
                    fontSize: "0.85rem",
                  }}
                >
                  {b.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
