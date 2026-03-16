"use client";

import Image from "next/image";

import { useState, useMemo } from "react";
import { Heading1, Heading2, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button, Tag } from "../components/ui/Elements";
import {
  Search,
  Plus,
  Calendar as CalendarIcon,
  Flag,
  Edit2,
  Trash2,
  MoreHorizontal,
  X,
  Check,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { isToday, isThisWeek, isFuture, parseISO } from "date-fns";

type Priority = "Low" | "Medium" | "High";

const CATEGORIES = ["Assignment", "Exam", "Study", "Proyek", "Lainnya"];
const CATEGORY_COLORS: Record<string, string> = {
  Assignment: "bg-primary/20 text-primary",
  Exam: "bg-warning/20 text-warning",
  Study: "bg-success/20 text-success",
  Proyek: "bg-primary-light/20 text-primary-light",
  Lainnya: "bg-surface-elevated text-foreground",
};

export default function TodoPage() {
  const { todos, toggleTodo, addTodo, updateTodo, deleteTodo, setActiveModal } =
    useStore();

  const [filter, setFilter] = useState("HARI INI");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Top add-task form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("Assignment");
  const [newPriority, setNewPriority] = useState<Priority>("High");
  const [newDueDate, setNewDueDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Quick-add at bottom
  const [quickTitle, setQuickTitle] = useState("");
  const [quickDueDate, setQuickDueDate] = useState("");
  const [showQuickDatePicker, setShowQuickDatePicker] = useState(false);

  // Edit modal state
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>("Medium");
  const [editDueDate, setEditDueDate] = useState("");

  const filteredTodos = useMemo(() => {
    let result = todos;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.categories.some((c) => c.toLowerCase().includes(q)),
      );
    }

    // Category sidebar filter
    if (categoryFilter) {
      result = result.filter((t) => t.categories.includes(categoryFilter));
    }

    // Tab filter
    if (filter === "SEMUA") return result;
    if (filter === "SELESAI") return result.filter((t) => t.completed);
    if (filter === "HARI INI") {
      return result.filter((t) => {
        if (t.completed) return false;
        if (!t.dueDate) return true;
        try {
          return isToday(parseISO(t.dueDate));
        } catch {
          return false;
        }
      });
    }
    if (filter === "MINGGU INI") {
      return result.filter((t) => {
        if (t.completed) return false;
        if (!t.dueDate) return false;
        try {
          return isThisWeek(parseISO(t.dueDate), { weekStartsOn: 1 });
        } catch {
          return false;
        }
      });
    }
    if (filter === "MENDATANG") {
      return result.filter((t) => {
        if (t.completed) return false;
        if (!t.dueDate) return false;
        try {
          return isFuture(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate));
        } catch {
          return false;
        }
      });
    }
    return result;
  }, [todos, filter, searchQuery, categoryFilter]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      counts[cat] = todos.filter((t) => t.categories.includes(cat)).length;
    });
    return counts;
  }, [todos]);

  // Priority counts
  const priorityCounts = useMemo(
    () => ({
      High: todos.filter((t) => t.priority === "High").length,
      Medium: todos.filter((t) => t.priority === "Medium").length,
      Low: todos.filter((t) => t.priority === "Low").length,
    }),
    [todos],
  );

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTodo({
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      completed: false,
      priority: newPriority,
      categories: [newCategory],
      dueDate: newDueDate
        ? new Date(newDueDate).toISOString()
        : new Date().toISOString(),
    });
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
    setShowDatePicker(false);
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    addTodo({
      title: quickTitle.trim(),
      completed: false,
      priority: "Medium",
      categories: ["Study"],
      dueDate: quickDueDate
        ? new Date(quickDueDate).toISOString()
        : new Date().toISOString(),
    });
    setQuickTitle("");
    setQuickDueDate("");
    setShowQuickDatePicker(false);
  };

  const openEdit = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    setEditingTodo(id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate ? todo.dueDate.split("T")[0] : "");
  };

  const handleEditSave = () => {
    if (!editingTodo || !editTitle.trim()) return;
    updateTodo(editingTodo, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority,
      dueDate: editDueDate ? new Date(editDueDate).toISOString() : undefined,
    });
    setEditingTodo(null);
  };

  const getPriorityColor = (priority: Priority) => {
    if (priority === "High") return "text-danger";
    if (priority === "Medium") return "text-warning";
    return "text-foreground-secondary";
  };

  const formatDueDate = (dueDate?: string) => {
    if (!dueDate) return null;
    try {
      const d = parseISO(dueDate);
      if (isToday(d)) return "Today";
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 shrink-0">
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
          <Button
            onClick={() => setActiveModal("todo")}
            className="!hidden md:!inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, tasks..."
              className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full md:w-70"
            />
          </div>
        </div>

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
          </div>
        </div>
      </header>

      <Heading2 className="uppercase">TO-DO DETAIL</Heading2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main List Column */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Top Add Task Form */}
          <form onSubmit={handleAddTask}>
            <Card className="flex flex-col gap-4 p-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Tambah Tugas Baru"
                className="bg-transparent border-b border-border w-full py-2 text-sm focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Deskripsi (opsional)"
                className="bg-transparent border-b border-border w-full py-1 text-xs text-foreground-secondary focus:outline-none focus:border-primary"
              />
              <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-sm w-full">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-start flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground-secondary">Kategori</span>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="text-primary bg-transparent border-none focus:outline-none cursor-pointer text-sm"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2 md:border-l border-border md:pl-4">
                    <span className="text-foreground-secondary">Prioritas</span>
                    <select
                      value={newPriority}
                      onChange={(e) =>
                        setNewPriority(e.target.value as Priority)
                      }
                      className="text-danger bg-transparent border-none focus:outline-none cursor-pointer text-sm"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="text-foreground-secondary p-2 hover:bg-surface-elevated rounded-lg"
                    >
                      <CalendarIcon className="w-4 h-4" />
                    </button>
                    {showDatePicker && (
                      <input
                        type="date"
                        value={newDueDate}
                        onChange={(e) => setNewDueDate(e.target.value)}
                        className="text-xs bg-surface-elevated border border-border rounded-lg px-2 py-1 focus:outline-none focus:border-primary"
                      />
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-2 px-4 whitespace-nowrap w-full md:w-auto"
                >
                  <Plus className="w-4 h-4" /> Add To-Do
                </Button>
              </div>
            </Card>
          </form>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
            {["HARI INI", "MINGGU INI", "MENDATANG", "SELESAI", "SEMUA"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filter === tab ? "bg-surface-elevated text-foreground shadow-sm" : "text-foreground-secondary hover:bg-surface"}`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="flex justify-between items-center mt-2">
            <Heading2 className="text-sm">
              TUGAS {filter}
              {categoryFilter ? ` · ${categoryFilter}` : ""}
              {searchQuery ? ` · "${searchQuery}"` : ""} —{" "}
              {filteredTodos.length} TUGAS
            </Heading2>
            {(categoryFilter || searchQuery) && (
              <button
                onClick={() => {
                  setCategoryFilter(null);
                  setSearchQuery("");
                }}
                className="text-xs text-foreground-secondary hover:text-danger flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Hapus Filter
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredTodos.length === 0 && (
              <div className="text-center py-10 text-foreground-secondary text-sm">
                Tidak ada tugas yang cocok.
              </div>
            )}
            {filteredTodos.map((todo) => (
              <Card
                key={todo.id}
                className={`p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-200 ${todo.completed ? "opacity-60" : ""}`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="mt-0.5 shrink-0 cursor-pointer"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${todo.completed ? "bg-primary border-primary text-white" : "border-border"}`}
                    >
                      {todo.completed && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-base font-semibold ${todo.completed ? "line-through text-foreground-secondary" : ""}`}
                    >
                      {todo.title}
                    </div>
                    {todo.description && (
                      <div className="text-xs text-foreground-secondary mt-1 max-w-xs break-words whitespace-normal">
                        {todo.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pl-9 md:pl-0 w-full md:w-auto">
                  <div className="flex gap-2 flex-wrap">
                    {todo.categories.map((cat) => (
                      <Tag
                        key={cat}
                        colorClassName={
                          CATEGORY_COLORS[cat] ||
                          "bg-surface-elevated text-foreground"
                        }
                      >
                        {cat}
                      </Tag>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-foreground-secondary shrink-0">
                    <div
                      className={`flex items-center gap-1.5 text-xs mr-2 border-r border-border pr-3 ${getPriorityColor(todo.priority)}`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      {formatDueDate(todo.dueDate) || todo.priority}
                    </div>
                    <button
                      onClick={() => openEdit(todo.id)}
                      className="hover:text-primary"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="hover:text-danger"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            <form
              onSubmit={handleQuickAdd}
              className="flex flex-col sm:flex-row gap-3 mt-4 w-full"
            >
              <input
                type="text"
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                placeholder="Tambah tugas cepat..."
                className="flex-1 bg-surface-elevated border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowQuickDatePicker(!showQuickDatePicker)}
                    className="p-3 bg-surface-elevated border border-border rounded-xl text-foreground-secondary hover:text-foreground shrink-0 flex items-center justify-center h-full"
                  >
                    <CalendarIcon className="w-5 h-5" />
                  </button>
                  {showQuickDatePicker && (
                    <div className="absolute bottom-full mb-2 left-0 bg-surface border border-border rounded-xl p-2 shadow-lg z-10">
                      <input
                        type="date"
                        value={quickDueDate}
                        onChange={(e) => setQuickDueDate(e.target.value)}
                        className="text-xs bg-transparent focus:outline-none"
                      />
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className="flex items-center justify-center gap-2 border border-border flex-[2] sm:flex-none whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />{" "}
                  <span className="hidden sm:inline">Tambah Tugas Cepat</span>
                  <span className="sm:hidden">Tambah</span>
                </Button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="flex flex-col">
              <div className="text-sm font-semibold mb-4">
                TREN PENYELESAIAN TUGAS MINGGU INI
              </div>
              <div className="flex items-center gap-6 mt-auto">
                <div className="w-24 h-24 rounded-full border-10 border-t-primary border-r-primary border-b-warning border-l-border relative shrink-0"></div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-primary"></span> Selesai
                    ({todos.filter((t) => t.completed).length})
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-warning"></span> Aktif (
                    {todos.filter((t) => !t.completed).length})
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-danger"></span> Total (
                    {todos.length})
                  </div>
                </div>
                <div className="flex-1 h-20 ml-2 flex items-end gap-1">
                  <div className="flex-1 bg-primary h-[80%] rounded-t-sm"></div>
                  <div className="flex-1 bg-warning h-[40%] rounded-t-sm"></div>
                  <div className="flex-1 bg-danger h-[20%] rounded-t-sm"></div>
                  <div className="flex-1 bg-primary h-[90%] rounded-t-sm"></div>
                  <div className="flex-1 bg-warning h-[50%] rounded-t-sm"></div>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col">
              <div className="text-sm font-semibold mb-3">
                DETAIL TENGGAT WAKTU & PROYEK MENDATANG
              </div>
              <div className="space-y-4 text-xs font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-foreground-secondary">Total Tugas</span>
                  <span className="text-2xl font-bold">{todos.length}</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Progress</span>
                    <span className="text-foreground-secondary">
                      {todos.length > 0
                        ? Math.round(
                            (todos.filter((t) => t.completed).length /
                              todos.length) *
                              100,
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{
                        width:
                          todos.length > 0
                            ? `${(todos.filter((t) => t.completed).length / todos.length) * 100}%`
                            : "0%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Tag colorClassName="bg-warning/20 text-warning px-2 py-0.5 text-[10px]">
                    High ({priorityCounts.High})
                  </Tag>
                  <Tag colorClassName="bg-success/20 text-success px-2 py-0.5 text-[10px]">
                    Medium ({priorityCounts.Medium})
                  </Tag>
                  <Tag colorClassName="bg-primary/20 text-primary px-2 py-0.5 text-[10px]">
                    Low ({priorityCounts.Low})
                  </Tag>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Categories Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-semibold">
                PENGELOLA KATEGORI & PRIORITAS
              </div>
              {categoryFilter && (
                <button
                  onClick={() => setCategoryFilter(null)}
                  className="text-xs text-foreground-secondary hover:text-danger flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {CATEGORIES.map((cat, idx) => {
                const colors = [
                  "bg-primary",
                  "bg-warning",
                  "bg-success",
                  "bg-primary-light",
                  "bg-border",
                ];
                return (
                  <button
                    key={cat}
                    onClick={() =>
                      setCategoryFilter(categoryFilter === cat ? null : cat)
                    }
                    className={`w-full flex justify-between text-sm items-center cursor-pointer px-2 py-1 -mx-2 rounded transition-colors ${categoryFilter === cat ? "bg-primary/10 text-primary" : "hover:bg-surface-elevated text-foreground-secondary"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-1.5 h-6 rounded-full ${colors[idx]} inline-block`}
                      ></span>
                      {cat}
                    </div>
                    <span>({categoryCounts[cat] ?? 0})</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setActiveModal("todo")}
              className="w-full py-2.5 rounded-xl border border-border text-foreground-secondary text-sm font-medium hover:bg-surface-elevated transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Tambah Tugas Baru
            </button>

            <div className="mt-8 border-t border-border pt-6">
              <div className="text-sm font-semibold mb-4 text-foreground-secondary">
                Prioritas
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm items-center px-2">
                  <div className="flex items-center gap-3 text-primary">
                    <Flag className="w-4 h-4 fill-primary" /> Tinggi
                  </div>
                  <span className="text-foreground-secondary">
                    ({priorityCounts.High})
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center px-2">
                  <div className="flex items-center gap-3 text-foreground-secondary">
                    <Flag className="w-4 h-4 fill-foreground-secondary" />{" "}
                    Sedang
                  </div>
                  <span className="text-foreground-secondary">
                    ({priorityCounts.Medium})
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center px-2">
                  <div className="flex items-center gap-3 text-foreground-secondary">
                    <Flag className="w-4 h-4" /> Rendah
                  </div>
                  <span className="text-foreground-secondary">
                    ({priorityCounts.Low})
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      {editingTodo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Edit Tugas</h2>
              <button
                onClick={() => setEditingTodo(null)}
                className="p-2 hover:bg-surface-elevated rounded-lg text-foreground-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground-secondary mb-1 block">
                  Judul
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-surface-elevated focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground-secondary mb-1 block">
                  Deskripsi
                </label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-surface-elevated focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground-secondary mb-1 block">
                    Prioritas
                  </label>
                  <select
                    value={editPriority}
                    onChange={(e) =>
                      setEditPriority(e.target.value as Priority)
                    }
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-surface-elevated focus:outline-none focus:border-primary"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground-secondary mb-1 block">
                    Tenggat
                  </label>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-surface-elevated focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingTodo(null)}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground-secondary hover:bg-surface-elevated transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleEditSave}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
