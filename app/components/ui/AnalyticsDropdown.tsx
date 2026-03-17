"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface AnalyticsDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  accentColor?: "primary" | "success" | "warning";
}

export function AnalyticsDropdown({
  options,
  value,
  onChange,
  accentColor = "primary",
}: AnalyticsDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const currentLabel = options.find((opt) => opt.value === value)?.label || options[0]?.label;

  const accentColorMap = {
    primary: "bg-primary/20 text-primary border-primary/40 hover:bg-primary/25",
    success: "bg-success/20 text-success border-success/40 hover:bg-success/25",
    warning: "bg-warning/20 text-warning border-warning/40 hover:bg-warning/25",
  };

  const accentDotColorMap = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-surface border border-border text-foreground hover:border-primary/60 hover:shadow-sm transition-all duration-200"
      >
        {currentLabel}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-surface border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3.5 transition-all duration-150 text-left border-l-4 ${
                value === option.value
                  ? accentColorMap[accentColor]
                  : "border-l-transparent hover:bg-surface-elevated text-foreground-secondary"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  value === option.value
                    ? accentDotColorMap[accentColor]
                    : "bg-foreground-tertiary"
                }`}
              ></div>
              <span className={`text-sm font-medium ${
                value === option.value ? "" : "group-hover:text-foreground"
              }`}>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
