import Image from "next/image";

import { Heading1, Heading2, Text } from "./components/ui/Typography";
import { Search, Filter } from "lucide-react";
import { DashboardClient } from "./DashboardClient";
import { FocusTimerWidget } from "./components/dashboard/FocusTimerWidget";
import { CalendarWidget } from "./components/dashboard/CalendarWidget";
import { TodoWidget } from "./components/dashboard/TodoWidget";
import { DashboardStats } from "./components/dashboard/DashboardStats";
import { NotesPreview } from "./components/dashboard/NotesPreview";
import AddNewButton from "./components/AddNewButton";

export default function Home() {
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
              <Text className="text-foreground-secondary">
                Welcome! Let&apos;s make today awesome.
              </Text>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AddNewButton />
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search notes, tasks..."
                className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full md:w-70"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-surface-elevated border border-border text-foreground-secondary hover:text-foreground transition-colors hover:shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3 w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search notes, tasks..."
                className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-surface-elevated border border-border text-foreground-secondary hover:text-foreground transition-colors hover:shadow-sm shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)', opacity: 0.4 }} />
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
          {/* Left Column — Focus Timer */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2>Focus Timer</Heading2>
            </div>
            <FocusTimerWidget />
          </div>

          {/* Middle Column — Dashboard, Notes, Calendar */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Stats */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-primary/40" />
                <Heading2>Dashboard</Heading2>
              </div>
              <DashboardStats />
            </div>

            {/* Notes + Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-primary/40" />
                  <Heading2>Notes</Heading2>
                </div>
                <NotesPreview />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full bg-primary/40" />
                  <Heading2>Calendar</Heading2>
                </div>
                <CalendarWidget />
              </div>
            </div>
          </div>

          {/* Right Column — To-Do & Analytics */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full bg-success/40" />
              <Heading2>To-Do List</Heading2>
            </div>
            <TodoWidget />

            <div className="flex items-center gap-3 mt-4">
              <div className="w-1 h-6 rounded-full bg-primary/40" />
              <Heading2>Analytics Preview</Heading2>
            </div>
            <div className="bg-surface rounded-3xl p-4 md:p-6 border border-border shadow-sm dark:bg-surface" style={{ backgroundImage: 'linear-gradient(135deg, rgba(217,119,6,0.04) 0%, transparent 100%)', backgroundAttachment: 'fixed', backgroundSize: '100% 100%' }}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-[11px] text-foreground-secondary">
                  Weekly focus hour trend
                </div>
                <div className="text-[11px] text-foreground-secondary text-right">
                  Task Completion Rate
                </div>
              </div>

              <div className="flex gap-4 items-end">
                <div className="flex-1 h-20 flex relative">
                  <div className="absolute left-0 bottom-0 top-0 flex flex-col justify-between text-[8px] text-foreground-secondary py-1">
                    <span>12</span>
                    <span>9</span>
                    <span>6</span>
                    <span>3</span>
                    <span>0</span>
                  </div>
                  <div className="ml-4 flex-1 h-full relative">
                    <div className="absolute w-full border-t border-border top-0" />
                    <div className="absolute w-full border-t border-border top-1/4" />
                    <div className="absolute w-full border-t border-border top-2/4" />
                    <div className="absolute w-full border-t border-border top-3/4" />
                    <div className="absolute w-full border-t border-border bottom-0" />
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,80 C10,40 20,90 30,70 C40,50 50,20 60,30 C70,40 80,10 100,0"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                      />
                      <path
                        d="M0,80 C10,40 20,90 30,70 C40,50 50,20 60,30 C70,40 80,10 100,0 L100,100 L0,100 Z"
                        fill="var(--color-primary)"
                        fillOpacity="0.15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full border-[5px] border-t-primary border-r-success border-b-warning border-l-border mb-2" />
              </div>

              <div className="flex justify-between text-[8px] text-foreground-secondary mt-2 w-2/3 ml-4">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardClient>
  );
}
