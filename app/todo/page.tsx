"use client";

import Image from "next/image";

import { useState } from "react";
import { Heading1, Heading2, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button, Tag } from "../components/ui/Elements";
import { Search, Plus, Calendar as CalendarIcon, Flag, Edit2, Share2, Trash2, MoreHorizontal } from "lucide-react";
import { useStore } from "../store/useStore";

export default function TodoPage() {
  const { todos, toggleTodo, addTodo } = useStore();
  const [filter, setFilter] = useState("HARI INI");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filteredTodos = todos.filter(t => {
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
      dueDate: new Date().toISOString()
    });
    setNewTaskTitle("");
  };

  const getCategoryColor = (cat: string) => {
    if (cat === "Assignment") return "bg-paper-accent/20 text-paper-accent";
    if (cat === "Exam") return "bg-note-yellow-bg text-note-yellow-bd";
    if (cat === "Study") return "bg-note-green-bg text-note-green-bd";
    if (cat === "Proyek") return "bg-paper-accent-light/20 text-paper-accent-light";
    return "bg-paper-bg3 text-paper-fg";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-paper-accent/20 shrink-0">
            <Image src="https://i.pravatar.cc/150?img=47" alt="Profile" width={48} height={48} className="w-full h-full object-cover" />
          </div>
          <div>
            <Heading1>Hi, Sarah! 👋</Heading1>
            <Text className="text-paper-fg2">Welcome! Let&apos;s make today awesome.</Text>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-paper-fg2" />
            <input type="text" placeholder="Search notes, tasks..." className="pl-9 pr-4 py-2 bg-paper-bg3 rounded-full border border-paper-bd text-sm focus:outline-none focus:border-paper-accent w-full md:w-70" />
          </div>
        </div>
      </header>

      <Heading2 className="uppercase">TO-DO DETAIL</Heading2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main List Column */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Card className="flex flex-col md:flex-row gap-4 justify-between items-center p-4">
             <input type="text" placeholder="Tambah Tugas Baru" className="bg-transparent border-b border-paper-bd w-full md:w-1/3 py-2 text-sm focus:outline-none focus:border-paper-accent" />
             <div className="flex items-center gap-4 text-sm w-full md:w-auto">
               <div className="flex items-center gap-2">
                 <span className="text-paper-fg2">Kategori</span>
                 <span className="text-paper-accent cursor-pointer hover:underline">Assignment</span>
               </div>
               <div className="flex items-center gap-2 border-l border-paper-bd pl-4">
                 <span className="text-paper-fg2">Prioritas</span>
                 <span className="text-note-pink-bd cursor-pointer hover:underline">High</span>
               </div>
               <button className="text-paper-fg2 p-2 hover:bg-paper-bg3 rounded-lg"><CalendarIcon className="w-4 h-4" /></button>
               <Button className="flex items-center gap-2 py-1.5 px-3 whitespace-nowrap"><Plus className="w-4 h-4" /> Add To-Do</Button>
             </div>
          </Card>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
            {["HARI INI", "MINGGU INI", "MENDATANG", "SELESAI", "SEMUA"].map(tab => (
              <button 
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filter === tab ? 'bg-paper-bg3 text-paper-fg shadow-sm' : 'text-paper-fg2 hover:bg-paper-card'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-2">
            <Heading2 className="text-sm">TUGAS {filter} - 28 OKT</Heading2>
            <MoreHorizontal className="w-5 h-5 text-paper-fg2 cursor-pointer" />
          </div>

          <div className="space-y-3">
            {filteredTodos.map(todo => (
              <Card key={todo.id} className={`p-4 flex gap-4 transition-all duration-200 ${todo.completed ? 'opacity-60' : ''}`}>
                 <div className="mt-1 shrink-0 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                   <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${todo.completed ? 'bg-paper-accent border-paper-accent text-white' : 'border-paper-bd'}`}>
                     {todo.completed && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                   </div>
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className={`text-base font-semibold ${todo.completed ? 'line-through text-paper-fg2' : ''}`}>{todo.title}</div>
                   {todo.description && <div className="text-xs text-paper-fg2 mt-1">{todo.description}</div>}
                 </div>
                 
                 <div className="flex items-center gap-2 flex-wrap justify-end md:justify-start w-full md:w-auto">
                    {todo.categories.map(cat => (
                      <Tag key={cat} colorClassName={getCategoryColor(cat)}>{cat}</Tag>
                    ))}
                 </div>
                 
                 <div className="flex items-center gap-3 ml-auto text-paper-fg2 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs mr-2">
                       <Flag className="w-3.5 h-3.5" /> {todo.priority === "High" ? "10:00 AM" : "02:00 PM"}
                    </div>
                    <button className="hover:text-paper-accent"><Edit2 className="w-4 h-4" /></button>
                    <button className="hover:text-paper-accent"><Share2 className="w-4 h-4" /></button>
                    <button className="hover:text-note-pink-bd"><Trash2 className="w-4 h-4" /></button>
                 </div>
              </Card>
            ))}
            
            <form onSubmit={handleAddQuick} className="flex gap-3 mt-4 w-full">
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="Tambah tugas cepat..." 
                className="flex-1 bg-paper-bg3 border border-paper-bd rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-paper-accent"
              />
              <button type="button" className="p-3 bg-paper-bg3 border border-paper-bd rounded-xl text-paper-fg2 hover:text-paper-fg">
                <CalendarIcon className="w-5 h-5" />
              </button>
              <Button type="submit" variant="secondary" className="flex items-center gap-2 border border-paper-bd">
                <Plus className="w-4 h-4" /> Tambah Tugas Cepat
              </Button>
            </form>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="flex flex-col">
               <div className="text-sm font-semibold mb-4">TREN PENYELESAIAN TUGAS MINGGU INI</div>
               <div className="flex items-center gap-6 mt-auto">
                  <div className="w-24 h-24 rounded-full border-10 border-t-primary border-r-primary border-b-warning border-l-border relative shrink-0"></div>
                  <div className="space-y-2 text-xs">
                     <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-paper-accent"></span> Selesai</div>
                     <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-note-yellow-bg"></span> Aktif</div>
                     <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-note-pink-bg"></span> Terlambat</div>
                  </div>
                  <div className="flex-1 h-20 ml-2 flex items-end gap-1">
                     <div className="flex-1 bg-paper-accent h-[80%] rounded-t-sm"></div>
                     <div className="flex-1 bg-note-yellow-bg h-[40%] rounded-t-sm"></div>
                     <div className="flex-1 bg-note-pink-bg h-[20%] rounded-t-sm"></div>
                     <div className="flex-1 bg-paper-accent h-[90%] rounded-t-sm"></div>
                     <div className="flex-1 bg-note-yellow-bg h-[50%] rounded-t-sm"></div>
                  </div>
               </div>
            </Card>
            
            <Card className="flex flex-col">
               <div className="text-sm font-semibold mb-3">DETAIL TENGGAT WAKTU & PROYEK MENDATANG</div>
               <div className="space-y-4 text-xs font-medium">
                  <div className="flex items-center justify-between">
                     <span className="text-paper-fg2">Total Tenggat Minggu Ini</span>
                     <span className="text-2xl font-bold">66</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Proyek</span>
                      <MoreHorizontal className="w-4 h-4 text-paper-fg2" />
                    </div>
                    <div className="w-full h-1.5 bg-paper-bg3 rounded-full overflow-hidden flex">
                       <div className="bg-note-yellow-bg w-1/3"></div>
                       <div className="bg-note-green-bg w-1/4"></div>
                       <div className="bg-paper-accent w-1/3"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Tag colorClassName="bg-note-yellow-bg text-note-yellow-bd px-2 py-0.5 text-[10px]">Exam</Tag>
                    <Tag colorClassName="bg-note-green-bg text-note-green-bd px-2 py-0.5 text-[10px]">Study</Tag>
                    <Tag colorClassName="bg-paper-accent/20 text-paper-accent px-2 py-0.5 text-[10px]">Proyek</Tag>
                  </div>
               </div>
            </Card>
          </div>
        </div>

        {/* Categories Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card>
            <div className="flex justify-between items-center mb-6">
               <div className="text-sm font-semibold">PENGELOLA KATEGORI & PRIORITAS</div>
            </div>
            
            <div className="space-y-3 mb-6">
               <div className="flex justify-between text-sm items-center cursor-pointer hover:bg-paper-bg3 px-2 py-1 -mx-2 rounded transition-colors text-paper-fg2">
                 <div className="flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-paper-accent inline-block"></span> Assignment</div>
                 <span>(8)</span>
               </div>
               <div className="flex justify-between text-sm items-center cursor-pointer hover:bg-paper-bg3 px-2 py-1 -mx-2 rounded transition-colors text-paper-fg2">
                 <div className="flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-note-yellow-bg inline-block"></span> Exam</div>
                 <span>(4)</span>
               </div>
               <div className="flex justify-between text-sm items-center cursor-pointer hover:bg-paper-bg3 px-2 py-1 -mx-2 rounded transition-colors text-paper-fg2">
                 <div className="flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-note-green-bg inline-block"></span> Study</div>
                 <span>(12)</span>
               </div>
               <div className="flex justify-between text-sm items-center cursor-pointer hover:bg-paper-bg3 px-2 py-1 -mx-2 rounded transition-colors text-paper-fg2">
                 <div className="flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-note-pink-bg inline-block"></span> Projek</div>
                 <span>(3)</span>
               </div>
               <div className="flex justify-between text-sm items-center cursor-pointer hover:bg-paper-bg3 px-2 py-1 -mx-2 rounded transition-colors text-paper-fg2">
                 <div className="flex items-center gap-3"><span className="w-1.5 h-6 rounded-full bg-border inline-block"></span> Lainnya</div>
                 <span>(5)</span>
               </div>
            </div>
            
            <button className="w-full py-2.5 rounded-xl border border-paper-bd text-paper-fg2 text-sm font-medium hover:bg-paper-bg3 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Tambah Kategori Baru
            </button>
            
            <div className="mt-8 border-t border-paper-bd pt-6">
               <div className="text-sm font-semibold mb-4 text-paper-fg2">Prioritas</div>
               <div className="space-y-3">
                 <div className="flex justify-between text-sm items-center px-2">
                   <div className="flex items-center gap-3 text-paper-accent"><Flag className="w-4 h-4 fill-primary" /> Tinggi</div>
                   <span className="text-paper-fg2">(6)</span>
                 </div>
                 <div className="flex justify-between text-sm items-center px-2">
                   <div className="flex items-center gap-3 text-paper-fg2"><Flag className="w-4 h-4 fill-foreground-secondary" /> Sedang</div>
                   <span className="text-paper-fg2">(14)</span>
                 </div>
                 <div className="flex justify-between text-sm items-center px-2">
                   <div className="flex items-center gap-3 text-paper-fg2"><Flag className="w-4 h-4" /> Rendah</div>
                   <span className="text-paper-fg2">(4)</span>
                 </div>
               </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
