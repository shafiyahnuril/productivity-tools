"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { useStore } from "../store/useStore";

const MENU_ITEMS = [
  {
    key: "agenda" as const,
    label: "Add Agenda",
    description: "Schedule a calendar event",
  },
  {
    key: "note" as const,
    label: "Add Note",
    description: "Write a new note",
  },
  {
    key: "todo" as const,
    label: "Add Task",
    description: "Create a to-do item",
  },
];

export default function AddNewButton() {
  const [open, setOpen] = useState(false);
  const setActiveModal = useStore((s) => s.setActiveModal);
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

  const handleSelect = (key: "todo" | "note" | "agenda") => {
    setActiveModal(key);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 active:scale-95 transition-all duration-200"
      >
        <Plus className="w-4 h-4" />
        Add New
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-surface border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          {MENU_ITEMS.map(({ key, label, description }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className="flex flex-col w-full px-4 py-3 hover:bg-surface-elevated transition-colors text-left"
            >
              <div className="text-sm font-semibold leading-tight">{label}</div>
              <div className="text-[11px] text-foreground-secondary leading-tight mt-0.5">
                {description}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
