import React from "react";

export function Button({
  children,
  className = "",
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const baseClass = "px-4 py-2 rounded-xl font-bold transition-all active:scale-95";
  const variants = {
    primary: "bg-paper-accent text-white hover:opacity-90",
    secondary: "bg-paper-bg3 text-paper-fg hover:bg-paper-bd",
  };

  return (
    <button
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
      className={`bg-paper-bg3 border border-paper-bd rounded-xl px-4 py-2 text-paper-fg text-sm focus:outline-none focus:border-paper-accent hover:bg-paper-bg2 transition-colors ${className}`}
      {...props}
    />
  );
}

export function Tag({
  children,
  colorClassName = "bg-paper-accent/10 text-paper-accent",
}: {
  children: React.ReactNode;
  colorClassName?: string;
}) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${colorClassName}`}
    >
      {children}
    </span>
  );
}
