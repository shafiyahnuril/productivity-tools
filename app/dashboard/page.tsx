"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Heading1, Heading2 } from "../components/ui/Typography";
import { Search, Filter, X, Check } from "lucide-react";
import { DashboardClient } from "../DashboardClient";
import { FocusTimerWidget } from "../components/dashboard/FocusTimerWidget";
import { CalendarWidget } from "../components/dashboard/CalendarWidget";
import { TodoWidget } from "../components/dashboard/TodoWidget";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { NotesPreview } from "../components/dashboard/NotesPreview";
import { AnalyticsPreviewWidget } from "../components/dashboard/AnalyticsPreviewWidget";
import AddNewButton from "../components/AddNewButton";

const PRIORITIES = ["High", "Medium", "Low"] as const;
type Priority = (typeof PRIORITIES)[number];

const PRIORITY_COLORS: Record<Priority, string> = {
  High: "text-danger",
  Medium: "text-warning",
  Low: "text-foreground-secondary",
};

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState<Priority | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter panel on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterOpen]);

  const hasActiveFilter = !!filterPriority || !!searchQuery.trim();

  return (
    <DashboardClient>
      <div className="max-w-7xl mx-auto space-y-8 pb-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0 shadow-sm">
              <Image
                src="https://i.pravatar.cc/150?img=47"
                alt="Profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Heading1>Hi, Sarah! 👋</Heading1>
              <p className="text-sm text-foreground-secondary">
                Welcome! Let&apos;s make today awesome.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AddNewButton />
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, tasks..."
                className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full md:w-70"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {/* Filter button */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen((v) => !v)}
                className={`p-2.5 rounded-xl border text-foreground-secondary hover:text-foreground transition-colors hover:shadow-sm relative ${
                  hasActiveFilter
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-surface-elevated border-border"
                }`}
              >
                <Filter className="w-4 h-4" />
                {hasActiveFilter && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </button>

              {filterOpen && (
                <div className="absolute right-0 top-12 z-50 bg-surface border border-border rounded-2xl shadow-xl w-52 py-2 overflow-hidden">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground-tertiary border-b border-border mb-1">
                    Filter Prioritas
                  </div>
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setFilterPriority(filterPriority === p ? null : p);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                        filterPriority === p
                          ? "bg-primary/5 text-primary"
                          : "text-foreground hover:bg-surface-elevated"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          p === "High"
                            ? "bg-danger"
                            : p === "Medium"
                              ? "bg-warning"
                              : "bg-foreground-tertiary"
                        }`}
                      />
                      <span
                        className={
                          filterPriority === p
                            ? "text-primary"
                            : PRIORITY_COLORS[p]
                        }
                      >
                        {p}
                      </span>
                      {filterPriority === p && (
                        <Check className="w-3 h-3 ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                  {hasActiveFilter && (
                    <div className="border-t border-border mt-1 pt-1 px-3 pb-1">
                      <button
                        onClick={() => {
                          setFilterPriority(null);
                          setSearchQuery("");
                          setFilterOpen(false);
                        }}
                        className="w-full text-xs text-danger hover:text-danger/80 flex items-center gap-1.5 py-1.5 transition-colors"
                      >
                        <X className="w-3 h-3" /> Reset semua filter
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Divider for mobile */}
          <div className="w-full border-t border-border md:hidden mt-2 mb-1" />

          {/* Mobile header controls */}
          <div className="flex md:hidden items-center gap-3 w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, tasks..."
                className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen((v) => !v)}
                className={`p-2.5 rounded-xl border text-foreground-secondary hover:text-foreground transition-colors hover:shadow-sm shrink-0 relative ${
                  hasActiveFilter
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-surface-elevated border-border"
                }`}
              >
                <Filter className="w-4 h-4" />
                {hasActiveFilter && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </button>

              {filterOpen && (
                <div className="absolute right-0 top-12 z-50 bg-surface border border-border rounded-2xl shadow-xl w-52 py-2 overflow-hidden">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground-tertiary border-b border-border mb-1">
                    Filter Prioritas
                  </div>
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      onClick={() =>
                        setFilterPriority(filterPriority === p ? null : p)
                      }
                      className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                        filterPriority === p
                          ? "bg-primary/5 text-primary"
                          : "text-foreground hover:bg-surface-elevated"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          p === "High"
                            ? "bg-danger"
                            : p === "Medium"
                              ? "bg-warning"
                              : "bg-foreground-tertiary"
                        }`}
                      />
                      <span
                        className={
                          filterPriority === p
                            ? "text-primary"
                            : PRIORITY_COLORS[p]
                        }
                      >
                        {p}
                      </span>
                      {filterPriority === p && (
                        <Check className="w-3 h-3 ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                  {hasActiveFilter && (
                    <div className="border-t border-border mt-1 pt-1 px-3 pb-1">
                      <button
                        onClick={() => {
                          setFilterPriority(null);
                          setSearchQuery("");
                          setFilterOpen(false);
                        }}
                        className="w-full text-xs text-danger hover:text-danger/80 flex items-center gap-1.5 py-1.5 transition-colors"
                      >
                        <X className="w-3 h-3" /> Reset semua filter
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Filter active badge */}
        {hasActiveFilter && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-foreground-secondary">
              Filter aktif:
            </span>
            {filterPriority && (
              <span
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface-elevated border border-border ${PRIORITY_COLORS[filterPriority]}`}
              >
                Prioritas: {filterPriority}
                <button
                  onClick={() => setFilterPriority(null)}
                  className="ml-0.5 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-foreground-secondary">
                Kata kunci: &quot;{searchQuery}&quot;
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-0.5 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Main Grid */}
        <div
          className="hidden md:block h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
            opacity: 0.4,
          }}
        />
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
          {/* Left Column — Focus Timer */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                FOCUS TIMER
              </Heading2>
            </div>
            <FocusTimerWidget />
          </div>

          {/* Middle Column — Dashboard, Notes, Calendar */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Stats */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-primary/40" />
                <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                  DASHBOARD
                </Heading2>
              </div>
              <DashboardStats />
            </div>

            {/* Notes + Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-primary/40" />
                  <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                    NOTES
                  </Heading2>
                </div>
                <NotesPreview searchQuery={searchQuery} />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-primary/40" />
                  <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                    CALENDAR
                  </Heading2>
                </div>
                <CalendarWidget />
              </div>
            </div>
          </div>

          {/* Right Column — To-Do & Analytics */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-success/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                TO-DO LIST
              </Heading2>
            </div>
            <TodoWidget
              searchQuery={searchQuery}
              filterPriority={filterPriority}
            />

            <div className="flex items-center gap-3 mt-4">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2 className="text-xs! font-bold! uppercase! tracking-widest!">
                ANALYTICS PREVIEW
              </Heading2>
            </div>
            <AnalyticsPreviewWidget />
          </div>
        </div>
      </div>
    </DashboardClient>
  );
}
