import React from "react";

export function Button({
  children,
  className = "",
  onClick,
  variant = "primary",
  type = "button",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}) {
  const baseClass =
    "px-4 py-2 rounded-xl font-medium transition-colors hover:scale-95 active:scale-90 inline-flex justify-center items-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary: "bg-surface-elevated text-foreground hover:bg-border",
    outline:
      "bg-transparent border border-border text-foreground hover:bg-surface-hover",
    ghost: "bg-transparent hover:bg-surface-elevated text-foreground",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseClass} ${variants[variant]} ${className}`}
      {...props}
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
  className = "",
}: {
  children: React.ReactNode;
  colorClassName?: string;
  className?: string;
  variant?: string;
}) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClassName} ${className}`}
    >
      {children}
    </span>
  );
}
