import React from "react";

export function Button({
  children,
  className = "",
  onClick,
  variant = "primary",
  type,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  type?: "button" | "submit" | "reset";
}) {
  const baseClass =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light",
    secondary:
      "bg-surface-tertiary text-foreground hover:bg-border border border-border",
    outline:
      "bg-transparent border border-border text-foreground hover:bg-surface-elevated",
    ghost:
      "bg-transparent text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`bg-surface-tertiary border border-border rounded-xl px-4 py-2 text-sm placeholder:text-foreground-tertiary focus:outline-none focus:border-primary transition-colors ${className}`}
      {...props}
    />
  );
}

export function Tag({
  children,
  colorClassName = "bg-primary/15 text-primary",
  className = "",
}: {
  children: React.ReactNode;
  colorClassName?: string;
  className?: string;
  variant?: string; // accepted but unused — callers may use className instead
}) {
  return (
    <span
      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold tracking-wide ${colorClassName} ${className}`}
    >
      {children}
    </span>
  );
}
