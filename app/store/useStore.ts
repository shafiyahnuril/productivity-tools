import { create } from "zustand";

interface TimerConfig {
  focus: number;
  shortBreak: number;
  longBreak: number;
  cycles: number;
}

interface SessionLog {
  type: "focus" | "shortBreak" | "longBreak";
  duration: number;
  completed: boolean;
  timestamp: string;
  cycle?: number;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  categories: string[];
  dueDate?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  categories: string[];
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: "focus" | "meeting" | "study" | "other";
  description?: string;
}

interface AppState {
  todos: Todo[];
  notes: Note[];
  calendarEvents: CalendarEvent[];
  activeModal: "todo" | "note" | "agenda" | null;
  fabMenuOpen: boolean;
  timerState: {
    isRunning: boolean;
    timeLeft: number;
    mode: "focus" | "shortBreak" | "longBreak";
    currentCycle: number;
    config: TimerConfig;
    history: SessionLog[];
  };
  setTimerState: (state: Partial<AppState["timerState"]>) => void;
  updateTimerConfig: (config: Partial<TimerConfig>) => void;
  addSessionLog: (log: SessionLog) => void;
  addTodo: (todo: Omit<Todo, "id">) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, changes: Partial<Omit<Todo, "id">>) => void;
  deleteTodo: (id: string) => void;
  addNote: (note: Omit<Note, "id" | "updatedAt">) => void;
  updateNote: (id: string, changes: Partial<Omit<Note, "id">>) => void;
  deleteNote: (id: string) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, "id">) => void;
  updateCalendarEvent: (
    id: string,
    changes: Partial<Omit<CalendarEvent, "id">>,
  ) => void;
  deleteCalendarEvent: (id: string) => void;
  setActiveModal: (modal: "todo" | "note" | "agenda" | null) => void;
  setFabMenuOpen: (open: boolean) => void;
  clearAllTodos: () => void;
  clearCompletedTodos: () => void;
  clearAllNotes: () => void;
  clearAllCalendarEvents: () => void;
  resetTimerHistory: () => void;
}

export const useStore = create<AppState>((set) => ({
  todos: [
    {
      id: "1",
      title: "Submit Math HW",
      description: "Finish Chapter 4 problem sets",
      completed: true,
      priority: "High",
      categories: ["Assignment", "Exam"],
      dueDate: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Revise Chemistry",
      description: "Periodic table and bonding concepts",
      completed: false,
      priority: "Medium",
      categories: ["Exam", "Study"],
      dueDate: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Read Biology Article",
      description: "Cell division and mitosis paper",
      completed: false,
      priority: "Low",
      categories: ["Study"],
      dueDate: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Draft English Essay",
      description: "Identity theme analysis",
      completed: false,
      priority: "High",
      categories: ["Assignment"],
      dueDate: new Date(Date.now() + 86400000).toISOString(),
    },
  ],
  notes: [
    {
      id: "1",
      title: "History Ch. 5",
      content: "The story of revolution...",
      categories: ["Assignment", "Exam"],
      updatedAt: "2024-10-28",
    },
    {
      id: "2",
      title: "Biology Lab Report",
      content: "Specimen Elodea canadensis...",
      categories: ["Study"],
      updatedAt: "2024-10-28",
    },
    {
      id: "3",
      title: "Essay Ideas",
      content: "Read for studying writes...",
      categories: ["Study"],
      updatedAt: "2024-10-28",
    },
  ],
  calendarEvents: [],
  activeModal: null,
  fabMenuOpen: false,
  timerState: {
    isRunning: false,
    timeLeft: 25 * 60,
    mode: "focus",
    currentCycle: 2,
    config: {
      focus: 25,
      shortBreak: 5,
      longBreak: 15,
      cycles: 4,
    },
    history: [
      {
        type: "focus",
        duration: 25,
        completed: true,
        timestamp: "2026-03-15T14:30:00Z",
        cycle: 2,
      },
      {
        type: "shortBreak",
        duration: 5,
        completed: false,
        timestamp: "2026-03-15T14:55:00Z",
      },
      {
        type: "focus",
        duration: 25,
        completed: true,
        timestamp: "2026-03-15T15:00:00Z",
        cycle: 3,
      },
    ],
  },
  setTimerState: (state) =>
    set((prev) => ({ timerState: { ...prev.timerState, ...state } })),
  updateTimerConfig: (newConfig) =>
    set((prev) => ({
      timerState: {
        ...prev.timerState,
        config: { ...prev.timerState.config, ...newConfig },
      },
    })),
  addSessionLog: (log) =>
    set((prev) => ({
      timerState: {
        ...prev.timerState,
        history: [log, ...prev.timerState.history],
      },
    })),
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, { ...todo, id: Date.now().toString() }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    })),
  updateTodo: (id, changes) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
  addNote: (note) =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          ...note,
          id: Date.now().toString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),
  updateNote: (id, changes) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id
          ? { ...n, ...changes, updatedAt: new Date().toISOString() }
          : n,
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),
  addCalendarEvent: (event) =>
    set((state) => ({
      calendarEvents: [
        ...state.calendarEvents,
        { ...event, id: Date.now().toString() },
      ],
    })),
  updateCalendarEvent: (id, changes) =>
    set((state) => ({
      calendarEvents: state.calendarEvents.map((e) =>
        e.id === id ? { ...e, ...changes } : e,
      ),
    })),
  deleteCalendarEvent: (id) =>
    set((state) => ({
      calendarEvents: state.calendarEvents.filter((e) => e.id !== id),
    })),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setFabMenuOpen: (open) => set({ fabMenuOpen: open }),
  clearAllTodos: () => set({ todos: [] }),
  clearCompletedTodos: () =>
    set((state) => ({ todos: state.todos.filter((t) => !t.completed) })),
  clearAllNotes: () => set({ notes: [] }),
  clearAllCalendarEvents: () => set({ calendarEvents: [] }),
  resetTimerHistory: () =>
    set((prev) => ({
      timerState: { ...prev.timerState, history: [] },
    })),
}));
