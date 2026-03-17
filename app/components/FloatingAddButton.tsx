"use client";

import { useState, useEffect } from "react";
import { Plus, CheckSquare, FileText, X, CalendarDays } from "lucide-react";
import { useStore } from "../store/useStore";

const MENU_ITEMS = [
  {
    key: "agenda" as const,
    icon: CalendarDays,
    label: "Add Agenda",
    description: "Schedule a calendar event",
  },
  {
    key: "note" as const,
    icon: FileText,
    label: "Add Note",
    description: "Write a new note",
  },
  {
    key: "todo" as const,
    icon: CheckSquare,
    label: "Add Task",
    description: "Create a to-do item",
  },
];

const CATEGORY_OPTIONS = [
  { value: "focus", label: "Focus", color: "bg-primary" },
  { value: "meeting", label: "Meeting", color: "bg-warning" },
  { value: "study", label: "Study", color: "bg-success" },
  { value: "other", label: "Other", color: "bg-border" },
] as const;

const PRIORITY_OPTIONS = ["Low", "Medium", "High"] as const;

export default function FloatingAddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    activeModal,
    setActiveModal,
    setFabMenuOpen,
    addNote,
    addTodo,
    addCalendarEvent,
  } = useStore();

  // Sync local open state to the global store so FloatingThemeToggle can react
  useEffect(() => {
    setFabMenuOpen(isOpen);
  }, [isOpen, setFabMenuOpen]);

  // Todo form state
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [todoPriority, setTodoPriority] = useState<"Low" | "Medium" | "High">(
    "Medium",
  );
  const [todoDue, setTodoDue] = useState("");

  // Note form state
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  // Agenda form state
  const [agendaTitle, setAgendaTitle] = useState("");
  const [agendaDate, setAgendaDate] = useState("");
  const [agendaStart, setAgendaStart] = useState("");
  const [agendaEnd, setAgendaEnd] = useState("");
  const [agendaCategory, setAgendaCategory] = useState<
    "focus" | "meeting" | "study" | "other"
  >("focus");
  const [agendaDesc, setAgendaDesc] = useState("");

  const openModal = (key: "todo" | "note" | "agenda") => {
    setActiveModal(key);
    setIsOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  const handleAddTodo = () => {
    if (!todoTitle.trim()) return;
    addTodo({
      title: todoTitle.trim(),
      description: todoDesc.trim() || undefined,
      completed: false,
      priority: todoPriority,
      categories: [],
      dueDate: todoDue ? new Date(todoDue).toISOString() : undefined,
    });
    setTodoTitle("");
    setTodoDesc("");
    setTodoPriority("Medium");
    setTodoDue("");
    closeModal();
  };

  const handleAddNote = () => {
    if (!noteTitle.trim()) return;
    addNote({
      title: noteTitle.trim(),
      content: noteContent.trim(),
      categories: [],
    });
    setNoteTitle("");
    setNoteContent("");
    closeModal();
  };

  const handleAddAgenda = () => {
    if (!agendaTitle.trim() || !agendaDate || !agendaStart || !agendaEnd)
      return;
    addCalendarEvent({
      title: agendaTitle.trim(),
      date: agendaDate,
      startTime: agendaStart,
      endTime: agendaEnd,
      category: agendaCategory,
      description: agendaDesc.trim() || undefined,
    });
    setAgendaTitle("");
    setAgendaDate("");
    setAgendaStart("");
    setAgendaEnd("");
    setAgendaCategory("focus");
    setAgendaDesc("");
    closeModal();
  };

  return (
    <>
      {/* FAB — mobile only */}
      <div className="md:hidden fixed bottom-26 right-4 z-50 flex flex-col items-center gap-3">
        {isOpen && (
          <div className="flex flex-col gap-2">
            {MENU_ITEMS.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => openModal(key)}
                title={label}
                className="w-12 h-12 bg-surface text-primary flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ boxShadow: "var(--shadow-md)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "var(--shadow-md)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "var(--shadow-md)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Add New"
          className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ boxShadow: "var(--shadow-md)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "var(--shadow-md)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "var(--shadow-md)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          {isOpen ? <X size={28} /> : <Plus size={28} />}
        </button>
      </div>

      {/* Modal overlay */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="bg-surface rounded-2xl p-6 w-full max-w-md border border-border transition-all duration-300"
            style={{
              boxShadow: "var(--shadow-md), 0 25px 50px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold">
                {activeModal === "todo"
                  ? "Add Task"
                  : activeModal === "note"
                    ? "Add Note"
                    : "Add Agenda"}
              </h2>
              <button
                onClick={closeModal}
                className="text-foreground-secondary hover:text-foreground transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Todo form */}
            {activeModal === "todo" && (
              <div className="flex flex-col gap-3">
                <input
                  autoFocus
                  type="text"
                  placeholder="Task title *"
                  value={todoTitle}
                  onChange={(e) => setTodoTitle(e.target.value)}
                  className="bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-foreground-tertiary focus:outline-none focus:border-primary transition-colors"
                />
                <textarea
                  placeholder="Description (optional)"
                  value={todoDesc}
                  onChange={(e) => setTodoDesc(e.target.value)}
                  rows={2}
                  className="bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-foreground-tertiary focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-foreground-secondary mb-1 block">
                      Priority
                    </label>
                    <select
                      value={todoPriority}
                      onChange={(e) =>
                        setTodoPriority(e.target.value as typeof todoPriority)
                      }
                      className="w-full bg-surface-elevated border border-border rounded-md pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1em",
                      }}
                    >
                      {PRIORITY_OPTIONS.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-foreground-secondary mb-1 block">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={todoDue}
                      onChange={(e) => setTodoDue(e.target.value)}
                      className="w-full bg-surface-elevated border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors dark:[color-scheme:dark]"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddTodo}
                  disabled={!todoTitle.trim()}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                >
                  Add Task
                </button>
              </div>
            )}

            {/* Note form */}
            {activeModal === "note" && (
              <div className="flex flex-col gap-3">
                <input
                  autoFocus
                  type="text"
                  placeholder="Note title *"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-foreground-tertiary focus:outline-none focus:border-primary transition-colors"
                />
                <textarea
                  placeholder="Write your note here..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={5}
                  className="bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-foreground-tertiary focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  onClick={handleAddNote}
                  disabled={!noteTitle.trim()}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                >
                  Add Note
                </button>
              </div>
            )}

            {/* Agenda form */}
            {activeModal === "agenda" && (
              <div className="flex flex-col gap-3">
                <input
                  autoFocus
                  type="text"
                  placeholder="Event title *"
                  value={agendaTitle}
                  onChange={(e) => setAgendaTitle(e.target.value)}
                  className="bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-foreground-tertiary focus:outline-none focus:border-primary transition-colors"
                />
                <div>
                  <label className="text-xs text-foreground-secondary mb-1 block">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={agendaDate}
                    onChange={(e) => setAgendaDate(e.target.value)}
                    className="w-full bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors dark:[color-scheme:dark]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-foreground-secondary mb-1 block">
                      Start time *
                    </label>
                    <input
                      type="time"
                      value={agendaStart}
                      onChange={(e) => setAgendaStart(e.target.value)}
                      className="w-full bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors dark:[color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground-secondary mb-1 block">
                      End time *
                    </label>
                    <input
                      type="time"
                      value={agendaEnd}
                      onChange={(e) => setAgendaEnd(e.target.value)}
                      className="w-full bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors dark:[color-scheme:dark]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-foreground-secondary mb-1.5 block">
                    Category
                  </label>
                  <div className="flex gap-2">
                    {CATEGORY_OPTIONS.map(({ value, label, color }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAgendaCategory(value)}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                          agendaCategory === value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-surface-elevated text-foreground-secondary hover:border-primary/50"
                        }`}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${color} mr-1.5`}
                        />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Description (optional)"
                  value={agendaDesc}
                  onChange={(e) => setAgendaDesc(e.target.value)}
                  rows={2}
                  className="bg-surface-elevated border border-border rounded-md px-4 py-2.5 text-sm placeholder:text-foreground-tertiary focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  onClick={handleAddAgenda}
                  disabled={
                    !agendaTitle.trim() ||
                    !agendaDate ||
                    !agendaStart ||
                    !agendaEnd
                  }
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                >
                  Add to Calendar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
