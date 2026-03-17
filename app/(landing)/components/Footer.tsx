"use client";

import Link from "next/link";
import { Github, Mail, BookOpen } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t py-10 px-4"
      style={{
        background: "var(--background-secondary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
          {/* Logo + tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                style={{ background: "var(--primary)", color: "#fff" }}
              >
                <BookOpen size={15} strokeWidth={2} />
              </div>
              <span
                className="text-base font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--foreground)" }}
              >
                Productivity<span style={{ color: "var(--primary)", fontStyle: "italic" }}> Tools</span>
              </span>
            </div>
            {/* Caveat tagline */}
            <p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "1.05rem",
                color: "var(--foreground-tertiary)",
              }}
            >
              Belajar lebih cerdas, bukan lebih keras.
            </p>
          </div>

          {/* Footer links */}
          <div className="flex items-center gap-6 text-sm">
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms", href: "#" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200"
                style={{ color: "var(--foreground-secondary)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--foreground-secondary)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Gradient divider */}
        <div
          className="h-px mb-6"
          style={{
            background: "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
            opacity: 0.5,
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--foreground-tertiary)" }}>
          <p>© {currentYear} Productivity Tools. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <a
              href="mailto:contact@productivitytools.com"
              title="Email"
              className="p-2 rounded-lg transition-all duration-200"
              style={{ color: "var(--foreground-tertiary)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--foreground)";
                el.style.background = "var(--surface-elevated)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--foreground-tertiary)";
                el.style.background = "transparent";
              }}
            >
              <Mail size={17} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="p-2 rounded-lg transition-all duration-200"
              style={{ color: "var(--foreground-tertiary)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--foreground)";
                el.style.background = "var(--surface-elevated)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--foreground-tertiary)";
                el.style.background = "transparent";
              }}
            >
              <Github size={17} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
