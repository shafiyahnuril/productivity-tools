"use client";

import { useState } from "react";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Elements";
import { useStore } from "../../store/useStore";
import { Plus, Check } from "lucide-react";

const TAG_COLORS: Record<string, string> = {
  Assignment: "bg-primary/20 text-primary",
  Exam: "bg-warning/20 text-warning",
  Study: "bg-success/20 text-success",
};

function formatDueTime(dueDate: string) {
  const d = new Date(dueDate);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function isTodayDate(dateStr: string) {
  const d = new Date(dateStr);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

export function TodoWidget() {
  const { todos, toggleTodo, addTodo } = useStore();
  const [filter, setFilter] = useState<"all" | "today">("today");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const visibleTodos = filter === "today"
    ? todos.filter((t) => t.dueDate && isTodayDate(t.dueDate))
    : todos;

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addTodo({
      title: newTitle.trim(),
      completed: false,
      priority: "Medium",
      categories: ["Study"],
      dueDate: new Date().toISOString(),
    });
    setNewTitle("");
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filter tabs */}
      <div className="bg-surface-elevated p-1 rounded-xl flex">
        <button
          onClick={() => setFilter("today")}
          className={`flex-1 text-xs py-2 rounded-lg font-medium transition-colors ${
            filter === "today"
              ? "bg-surface shadow-sm text-foreground"
              : "text-foreground-secondary hover:text-foreground"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`flex-1 text-xs py-2 rounded-lg font-medium transition-colors ${
            filter === "all"
              ? "bg-surface shadow-sm text-foreground"
              : "text-foreground-secondary hover:text-foreground"
          }`}
        >
          All Tasks
        </button>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm font-semibold">
          {filter === "today" ? "Today's Tasks" : "All Tasks"}
          <span className="ml-2 text-xs text-foreground-tertiary">
            ({visibleTodos.filter((t) => !t.completed).length} remaining)
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick add form */}
      {showAddForm && (
        <Card className="p-3 flex gap-2 items-center">
          <input
            autoFocus
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") { setShowAddForm(false); setNewTitle(""); }
            }}
            placeholder="New task title..."
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-foreground-tertiary"
          />
          <button
            onClick={handleAdd}
            className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </Card>
      )}

      {/* Task list */}
      <div className="space-y-3">
        {visibleTodos.length === 0 ? (
          <div className="text-xs text-foreground-tertiary text-center py-4">
            {filter === "today" ? "No tasks due today." : "No tasks yet."}
          </div>
        ) : (
          visibleTodos.map((todo) => (
            <Card
              key={todo.id}
              className={`p-3 flex gap-3 transition-opacity ${todo.completed ? "opacity-60" : ""}`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors active:scale-95 ${
                  todo.completed
                    ? "bg-success border-success"
                    : "border-border hover:border-primary"
                }`}
              >
                {todo.completed && <Check className="w-2.5 h-2.5 text-white" />}
              </button>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-semibold ${
                    todo.completed ? "line-through text-foreground-secondary" : ""
                  }`}
                >
                  {todo.title}
                </div>
                <div className="flex gap-1.5 mt-1.5 flex-wrap items-center">
                  {todo.categories.map((cat) => (
                    <Tag
                      key={cat}
                      colorClassName={TAG_COLORS[cat] ?? "bg-primary/20 text-primary"}
                    >
                      {cat}
                    </Tag>
                  ))}
                </div>
              </div>

              {todo.dueDate && (
                <div className={`text-xs shrink-0 mt-0.5 ${
                  todo.completed
                    ? "text-foreground-tertiary"
                    : "text-foreground-secondary"
                }`}>
                  {formatDueTime(todo.dueDate)}
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
