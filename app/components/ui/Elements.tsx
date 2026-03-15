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
  const baseClass = "px-4 py-2 rounded-full font-medium transition-colors";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-surface-elevated text-foreground hover:bg-border",
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
      className={`bg-surface-elevated border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary ${className}`}
      {...props}
    />
  );
}

export function Tag({
  children,
  colorClassName = "bg-primary/20 text-primary",
}: {
  children: React.ReactNode;
  colorClassName?: string;
}) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClassName}`}
    >
      {children}
    </span>
  );
}
