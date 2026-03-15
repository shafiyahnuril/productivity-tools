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

interface AppState {
  todos: Todo[];
  notes: Note[];
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
  addNote: (note: Omit<Note, "id" | "updatedAt">) => void;
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
}));
