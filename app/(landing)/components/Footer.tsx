"use client";

import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "GitHub", href: "https://github.com", external: true },
  ];

  return (
    <footer className="bg-background-secondary/50 border-t border-border/40 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Left: About */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-2">Productivity Tools</h3>
            <p className="text-sm text-foreground-tertiary max-w-md">
              Alat produktivitas yang dirancang untuk membantu Anda mencapai lebih banyak setiap hari.
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-foreground-secondary hover:text-foreground transition-colors duration-200 flex items-center gap-1"
              >
                {link.label}
                {link.external && <ExternalLink size={12} />}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background: "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
            opacity: 0.4,
          }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-tertiary">
          <p>© {currentYear} Productivity Tools. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@productivitytools.com"
              className="hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-surface-elevated"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-surface-elevated"
              title="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
