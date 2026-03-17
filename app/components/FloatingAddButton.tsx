"use client";

import { useState, useEffect } from "react";
import { Plus, CheckSquare, FileText, X, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";

const MENU_ITEMS = [
  {
    key: "agenda" as const,
    icon: CalendarDays,
    label: "Add Agenda",
    description: "Schedule a calendar event",
    color: "#3B7EC2",
    bg: "rgba(59,126,194,0.12)",
  },
  {
    key: "note" as const,
    icon: FileText,
    label: "Add Note",
    description: "Write a new note",
    color: "#D97706",
    bg: "rgba(217,119,6,0.12)",
  },
  {
    key: "todo" as const,
    icon: CheckSquare,
    label: "Add Task",
    description: "Create a to-do item",
    color: "#5A8A6E",
    bg: "rgba(90,138,110,0.12)",
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
  const [noteCategories, setNoteCategories] = useState<string[]>([]);

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
      categories: noteCategories,
    });
    setNoteTitle("");
    setNoteContent("");
    setNoteCategories([]);
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
      <div className="md:hidden fixed bottom-26 right-4 z-50 flex flex-col items-end gap-3">
        {/* Staggered menu items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex flex-col gap-2 items-end"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
                hidden: {
                  transition: { staggerChildren: 0.04, staggerDirection: -1 },
                },
              }}
            >
              {MENU_ITEMS.map(({ key, icon: Icon, label, color, bg }) => (
                <motion.div
                  key={key}
                  className="flex items-center gap-2.5"
                  variants={{
                    hidden: { opacity: 0, x: 24, scale: 0.85 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 350,
                        damping: 22,
                      },
                    },
                  }}
                >
                  {/* Label tooltip */}
                  <motion.span
                    className="text-xs font-semibold px-2.5 py-1.5 rounded-xl select-none"
                    style={{
                      background: "var(--surface)",
                      color: "var(--foreground-secondary)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </motion.span>

                  {/* Icon button */}
                  <motion.button
                    onClick={() => openModal(key)}
                    title={label}
                    className="w-12 h-12 flex items-center justify-center rounded-full"
                    style={{
                      background: bg,
                      color: color,
                      border: `1.5px solid ${color}40`,
                      boxShadow: `0 4px 16px ${color}30`,
                    }}
                    whileHover={{
                      scale: 1.12,
                      boxShadow: `0 6px 20px ${color}50`,
                    }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon size={20} />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB toggle button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          title="Add New"
          className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-full"
          style={{ boxShadow: "0 4px 20px rgba(217,119,6,0.45)" }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 6px 28px rgba(217,119,6,0.6)",
          }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
        >
          {/* Rotate Plus 45° → looks like × */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 18,
              mass: 0.8,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={28} strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              className="bg-surface rounded-2xl p-6 w-full max-w-md border border-border"
              style={{
                boxShadow: "var(--shadow-md), 0 25px 50px rgba(0, 0, 0, 0.15)",
              }}
              initial={{ opacity: 0, y: 32, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 24,
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
                <motion.button
                  onClick={closeModal}
                  className="text-foreground-secondary hover:text-foreground transition-colors"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <X size={22} />
                </motion.button>
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
                  <div>
                    <label className="text-xs text-foreground-secondary mb-2 block">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Assignment", "Exam", "Study"].map((cat) => {
                        const isSelected = noteCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() =>
                              setNoteCategories((prev) =>
                                isSelected
                                  ? prev.filter((c) => c !== cat)
                                  : [...prev, cat],
                              )
                            }
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                              isSelected
                                ? "bg-primary text-white border-primary"
                                : "bg-surface-elevated text-foreground-secondary border-border hover:border-primary/50"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
