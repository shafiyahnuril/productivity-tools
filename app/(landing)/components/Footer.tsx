"use client";

import Link from "next/link";
import { Github, Mail, BookOpen, Heart } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    icon: Mail,
    href: "mailto:contact@productivitytools.com",
    label: "Email",
    hoverColor: "#D97706",
    hoverBg: "rgba(217,119,6,0.1)",
  },
  {
    icon: Github,
    href: "https://github.com",
    external: true,
    label: "GitHub",
    hoverColor: "var(--foreground)",
    hoverBg: "var(--surface-elevated)",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{
        background: "var(--background-secondary)",
        borderColor: "var(--border)",
      }}
    >
      {/* Wave SVG top separator */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden"
        style={{ height: "40px", marginTop: "-1px" }}
      >
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <path
            d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,0 L0,0 Z"
            fill="var(--background-secondary)"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
          {/* Logo + tagline */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-2 group"
            >
              <motion.div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                style={{ background: "var(--primary)", color: "#fff" }}
                whileHover={{
                  scale: 1.12,
                  rotate: -8,
                  boxShadow: "0 4px 14px rgba(217,119,6,0.4)",
                }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <BookOpen size={15} strokeWidth={2} />
              </motion.div>
              <motion.span
                className="text-base font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                Productivity
                <span style={{ color: "var(--primary)", fontStyle: "italic" }}>
                  {" "}
                  Tools
                </span>
              </motion.span>
            </Link>
            {/* Caveat tagline */}
            <motion.p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "1.05rem",
                color: "var(--foreground-tertiary)",
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
            >
              Work smarter, not harder.
            </motion.p>
          </motion.div>

          {/* Footer nav links */}
          <motion.div
            className="flex items-center gap-6 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms", href: "#" },
            ].map((link) => (
              <motion.span key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 relative group"
                  style={{ color: "var(--foreground-secondary)" }}
                >
                  <motion.span whileHover={{ color: "var(--foreground)" }}>
                    {link.label}
                  </motion.span>
                  {/* Underline on hover */}
                  <span
                    className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-200"
                    style={{ background: "var(--primary)" }}
                  />
                </Link>
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Gradient divider */}
        <motion.div
          className="h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: "var(--foreground-tertiary)" }}
        >
          <motion.p
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            © {currentYear} Productivity Tools. Made with
            <motion.span
              animate={{ scale: [1, 1.35, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              <Heart size={13} fill="#C4574A" style={{ color: "#C4574A" }} />
            </motion.span>
            for students.
          </motion.p>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            {socialLinks.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  {...(s.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="p-2 rounded-lg flex items-center justify-center"
                  style={{ color: "var(--foreground-tertiary)" }}
                  whileHover={{
                    scale: 1.2,
                    color: s.hoverColor,
                    background: s.hoverBg,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Icon size={17} />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
