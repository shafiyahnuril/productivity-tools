"use client";

import Image from "next/image";

import { useState } from "react";
import { Heading1, Heading2, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button, Tag } from "../components/ui/Elements";
import {
  Search,
  Plus,
  Calendar as CalendarIcon,
  Flag,
  Edit2,
  Share2,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { useStore } from "../store/useStore";

export default function TodoPage() {
  const { todos, toggleTodo, addTodo } = useStore();
  const [filter, setFilter] = useState("HARI INI");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filteredTodos = todos.filter((t) => {
    if (filter === "SEMUA") return true;
    if (filter === "SELESAI") return t.completed;
    if (filter === "HARI INI") {
      // Simulating today filter for mockup
      return !t.completed && t.title !== "Draft English Essay";
    }
    if (filter === "MENDATANG") {
      return !t.completed && t.title === "Draft English Essay";
    }
    return true;
  });

  const handleAddQuick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTodo({
      title: newTaskTitle,
      completed: false,
      priority: "Medium",
      categories: ["Study"],
      dueDate: new Date().toISOString(),
    });
    setNewTaskTitle("");
  };

  const getCategoryColor = (cat: string) => {
    if (cat === "Assignment") return "bg-primary/20 text-primary";
    if (cat === "Exam") return "bg-warning/20 text-warning";
    if (cat === "Study") return "bg-success/20 text-success";
    if (cat === "Proyek") return "bg-primary-light/20 text-primary-light";
    return "bg-surface-elevated text-foreground";
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
          <Button className="!hidden md:!inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
            <input
              type="text"
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
              placeholder="Search notes, tasks..."
              className="pl-9 pr-4 py-2 bg-surface-elevated rounded-full border border-border text-sm focus:outline-none focus:border-primary w-full"
            />
          </div>
        </div>
      </header>

      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full bg-success/40" />
        <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">TO-DO DETAIL</Heading2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main List Column */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Card className="flex flex-col md:flex-row gap-4 justify-between md:items-center p-4">
            <input
              type="text"
              placeholder="Tambah Tugas Baru"
              className="bg-transparent border-b border-border w-full py-2 text-sm focus:outline-none focus:border-primary md:flex-1 md:mr-4"
            />
            <div className="flex flex-wrap md:flex-nowrap items-center gap-3 text-sm w-full md:w-auto">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                <div className="flex items-center gap-2">
                  <span className="text-foreground-secondary">Kategori</span>
                  <span className="text-primary cursor-pointer hover:underline">
                    Assignment
                  </span>
                </div>
                <div className="flex items-center gap-2 md:border-l border-border md:pl-4">
                  <span className="text-foreground-secondary">Prioritas</span>
                  <span className="text-danger cursor-pointer hover:underline">
                    High
                  </span>
                </div>
                <button className="text-foreground-secondary p-2 hover:bg-surface-elevated rounded-lg">
                  <CalendarIcon className="w-4 h-4" />
                </button>
              </div>
              <Button className="flex items-center justify-center gap-2 py-2 px-4 whitespace-nowrap w-full md:w-auto mt-2 md:mt-0">
                <Plus className="w-4 h-4" /> Add To-Do
              </Button>
            </div>
          </Card>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
            {["Hari Ini", "Minggu Ini", "Mendatang", "Selesai", "Semua"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${filter === tab ? "bg-primary text-white shadow-md" : "text-foreground-secondary hover:bg-surface-elevated"}`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="flex justify-between items-center mt-2 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-success/50" />
              <Heading2 className="!text-xs !font-bold !uppercase !tracking-widest">TUGAS {filter}</Heading2>
              <span className="text-[11px] text-foreground-tertiary font-medium">28 OKT</span>
            </div>
            <MoreHorizontal className="w-5 h-5 text-foreground-secondary cursor-pointer hover:text-foreground transition-colors" />
          </div>

          <div className="space-y-3">
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
                      <Tag key={cat} colorClassName={getCategoryColor(cat)}>
                        {cat}
                      </Tag>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-foreground-secondary shrink-0">
                    <div className="flex items-center gap-1.5 text-xs mr-2 border-r border-border pr-3">
                      <Flag className="w-3.5 h-3.5" />
                      {todo.priority === "High" ? "10:00 AM" : "02:00 PM"}
                    </div>
                    <button className="hover:text-primary">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="hover:text-primary">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="hover:text-danger">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            <form
              onSubmit={handleAddQuick}
              className="flex flex-col sm:flex-row gap-3 mt-4 w-full"
            >
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Tambah tugas cepat..."
                className="flex-1 bg-surface-elevated border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  className="p-3 bg-surface-elevated border border-border rounded-xl text-foreground-secondary hover:text-foreground shrink-0 flex-1 sm:flex-none flex items-center justify-center"
                >
                  <CalendarIcon className="w-5 h-5" />
                </button>
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
            <div className="flex flex-col rounded-3xl border border-border p-4 md:p-6 shadow-sm" style={{ backgroundImage: 'linear-gradient(135deg, rgba(90,138,110,0.03) 0%, transparent 100%)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full bg-primary/50" />
                <div className="text-xs font-bold uppercase tracking-widest text-foreground-secondary">
                  Tren Penyelesaian
                </div>
              </div>
              <div className="flex items-center gap-6 mt-auto">
                <div className="w-24 h-24 rounded-full border-10 border-t-primary border-r-primary border-b-warning border-l-border relative shrink-0"></div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-primary"></span> Selesai
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-warning"></span> Aktif
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-danger"></span>{" "}
                    Terlambat
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
            </div>

            <div className="flex flex-col rounded-3xl border border-border p-4 md:p-6 shadow-sm" style={{ backgroundImage: 'linear-gradient(135deg, rgba(217,119,6,0.03) 0%, transparent 100%)' }}>
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/50">
                <div className="w-1 h-5 rounded-full bg-warning/50" />
                <div className="text-xs font-bold uppercase tracking-widest text-foreground-secondary">
                  Tenggat Waktu
                </div>
              </div>
              <div className="space-y-4 text-xs font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-foreground-secondary">
                    Total Tenggat Minggu Ini
                  </span>
                  <span className="text-2xl font-bold">66</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Proyek</span>
                    <MoreHorizontal className="w-4 h-4 text-foreground-secondary" />
                  </div>
                  <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden flex">
                    <div className="bg-warning w-1/3"></div>
                    <div className="bg-success w-1/4"></div>
                    <div className="bg-primary w-1/3"></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Tag colorClassName="bg-warning/20 text-warning px-2 py-0.5 text-[10px]">
                    Exam
                  </Tag>
                  <Tag colorClassName="bg-success/20 text-success px-2 py-0.5 text-[10px]">
                    Study
                  </Tag>
                  <Tag colorClassName="bg-primary/20 text-primary px-2 py-0.5 text-[10px]">
                    Proyek
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="rounded-3xl border border-border p-4 md:p-6 shadow-sm" style={{ backgroundImage: 'linear-gradient(135deg, rgba(90,138,110,0.03) 0%, transparent 100%)' }}>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-border/50">
              <div className="w-1 h-5 rounded-full bg-success/50" />
              <div className="text-xs font-bold uppercase tracking-widest text-foreground-secondary">
                Kategori & Prioritas
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs items-center cursor-pointer bg-primary/5 hover:bg-primary/10 px-3 py-2 -mx-3 rounded-lg transition-all duration-200 group border border-primary/10 hover:border-primary/30 hover:shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:shadow-sm transition-all" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}></span>{" "}
                  <span className="font-medium text-foreground-secondary group-hover:text-foreground transition-colors">Assignment</span>
                </div>
                <span className="text-primary font-semibold group-hover:scale-110 transition-transform">( 8)</span>
              </div>
              <div className="flex justify-between text-xs items-center cursor-pointer bg-warning/5 hover:bg-warning/10 px-3 py-2 -mx-3 rounded-lg transition-all duration-200 group border border-warning/10 hover:border-warning/30 hover:shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 rounded-full bg-warning/60 group-hover:bg-warning group-hover:shadow-sm transition-all" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}></span>{" "}
                  <span className="font-medium text-foreground-secondary group-hover:text-foreground transition-colors">Exam</span>
                </div>
                <span className="text-warning font-semibold group-hover:scale-110 transition-transform">(4)</span>
              </div>
              <div className="flex justify-between text-xs items-center cursor-pointer bg-success/5 hover:bg-success/10 px-3 py-2 -mx-3 rounded-lg transition-all duration-200 group border border-success/10 hover:border-success/30 hover:shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 rounded-full bg-success/60 group-hover:bg-success group-hover:shadow-sm transition-all" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}></span>{" "}
                  <span className="font-medium text-foreground-secondary group-hover:text-foreground transition-colors">Study</span>
                </div>
                <span className="text-success font-semibold group-hover:scale-110 transition-transform">(12)</span>
              </div>
              <div className="flex justify-between text-xs items-center cursor-pointer bg-primary-light/5 hover:bg-primary-light/10 px-3 py-2 -mx-3 rounded-lg transition-all duration-200 group border border-primary-light/10 hover:border-primary-light/30 hover:shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 rounded-full bg-primary-light/60 group-hover:bg-primary-light group-hover:shadow-sm transition-all" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}></span>{" "}
                  <span className="font-medium text-foreground-secondary group-hover:text-foreground transition-colors">Projek</span>
                </div>
                <span className="text-primary-light font-semibold group-hover:scale-110 transition-transform">(3)</span>
              </div>
              <div className="flex justify-between text-xs items-center cursor-pointer bg-border/10 hover:bg-border/20 px-3 py-2 -mx-3 rounded-lg transition-all duration-200 group border border-border/20 hover:border-border/40 hover:shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5 rounded-full bg-border/50 group-hover:bg-foreground-tertiary group-hover:shadow-sm transition-all" style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}></span>{" "}
                  <span className="font-medium text-foreground-secondary group-hover:text-foreground transition-colors">Lainnya</span>
                </div>
                <span className="text-foreground-tertiary font-semibold group-hover:scale-110 transition-transform">(5)</span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-xl border border-border text-foreground-secondary text-sm font-medium hover:bg-surface-elevated transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Tambah Kategori Baru
            </button>

            <div className="mt-6 border-t border-border/50 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded-full bg-danger/50" />
                <div className="text-xs font-bold uppercase tracking-widest text-foreground-secondary">
                  Prioritas
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs items-center px-3 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all duration-200 cursor-pointer group hover:shadow-sm">
                  <div className="flex items-center gap-2.5 text-primary font-medium">
                    <Flag className="w-3.5 h-3.5 fill-primary group-hover:drop-shadow-sm transition-all" /> Tinggi
                  </div>
                  <span className="text-primary font-semibold group-hover:scale-110 transition-transform">(6)</span>
                </div>
                <div className="flex justify-between text-xs items-center px-3 py-2 rounded-lg bg-warning/5 hover:bg-warning/10 border border-warning/10 hover:border-warning/30 transition-all duration-200 cursor-pointer group hover:shadow-sm">
                  <div className="flex items-center gap-2.5 text-warning font-medium">
                    <Flag className="w-3.5 h-3.5 fill-warning group-hover:drop-shadow-sm transition-all" /> Sedang
                  </div>
                  <span className="text-warning font-semibold group-hover:scale-110 transition-transform">(14)</span>
                </div>
                <div className="flex justify-between text-xs items-center px-3 py-2 rounded-lg bg-foreground-secondary/5 hover:bg-foreground-secondary/10 border border-foreground-secondary/10 hover:border-foreground-secondary/30 transition-all duration-200 cursor-pointer group hover:shadow-sm">
                  <div className="flex items-center gap-2.5 text-foreground-secondary font-medium">
                    <Flag className="w-3.5 h-3.5 fill-foreground-secondary group-hover:drop-shadow-sm transition-all" /> Rendah
                  </div>
                  <span className="text-foreground-secondary font-semibold group-hover:scale-110 transition-transform">(4)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
