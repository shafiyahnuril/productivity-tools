"use client";

import Image from "next/image";

import { Heading1, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button, Tag } from "../components/ui/Elements";
import { Search, Plus, Edit2, Download, Share2, Trash2, MoreHorizontal, ArrowLeft, FileText as FileTextIcon } from "lucide-react";
import Link from "next/link";
import { useStore } from "../store/useStore";

export default function NotesPage() {
  const { notes } = useStore();
  
  // Show first note as active mockup
  // const activeNote = notes[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 h-[calc(100vh-(--spacing(16)))] flex flex-col">
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

      <div className="mb-2">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-paper-fg2 hover:text-paper-accent transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Catatan
        </Link>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Editor Main Content */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <Card className="flex-1 flex flex-col overflow-hidden p-8!">
            <div className="border-b border-paper-bd pb-6 mb-6">
              <h1 className="text-3xl font-bold mb-4 focus:outline-none" contentEditable suppressContentEditableWarning>
                Laporan Praktikum Biologi - Draft Lengkap
              </h1>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <Tag colorClassName="bg-paper-accent/20 text-paper-accent">Tugas</Tag>
                  <Tag colorClassName="bg-note-yellow-bg text-note-yellow-bd">Ujian</Tag>
                  <span className="text-paper-fg2">• Biologi 101</span>
                </div>
                <span className="text-paper-fg2">Diperbarui terakhir: 28 Okt 2024</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 text-base leading-relaxed text-paper-fg2 outline-none" contentEditable suppressContentEditableWarning>
              <p>
                <strong className="text-foreground">Tujuan:</strong> Menentukan efek kualitas cahaya yang bervariasi pada laju fotosintesis.
              </p>
              <p>
                <strong className="text-foreground">Bahan & Metode:</strong> Spesimen <em>Elodea canadensis</em>, sensor oksigen, sumber cahaya dengan filter berbeda (Merah, Biru, Hijau, Putih).
              </p>
              <p>
                <strong className="text-foreground">Hasil:</strong> Tabel ringkasan (O2 ppm/mnt) - Merah (15.2), Biru (12.8), Putih (8.5), Hijau (4.1).
              </p>
              <p>
                <strong className="text-foreground">Kesimpulan:</strong> Cahaya merah dan biru mendorong laju fotosintesis yang lebih tinggi daripada cahaya hijau atau putih.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Sidebar actions */}
        <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2">
          <Card>
            <div className="text-sm font-semibold mb-4 text-paper-fg2">Tindakan Cepat</div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 p-3 bg-paper-bg3 hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent">
                <Edit2 className="w-4 h-4 text-paper-accent" /> Edit
              </button>
              <button className="flex items-center gap-2 p-3 bg-paper-bg3 hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent">
                <Download className="w-4 h-4 text-paper-fg2" /> Ekspor PDF
              </button>
              <button className="flex items-center gap-2 p-3 bg-paper-bg3 hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent">
                <Share2 className="w-4 h-4 text-paper-accent-light" /> Bagikan
              </button>
              <button className="flex items-center gap-2 p-3 bg-note-pink-bg text-note-pink-bd hover:brightness-95 rounded-xl text-sm transition-colors cursor-pointer border border-transparent">
                <Trash2 className="w-4 h-4" /> Hapus
              </button>
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold mb-4 text-paper-fg2">Referensi Terkait</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-paper-bg3 rounded-xl">
                 <div className="flex items-center gap-3">
                   <div className="p-1.5 bg-paper-accent/20 rounded text-paper-accent"><FileTextIcon className="w-4 h-4" /></div>
                   <span className="text-sm text-paper-fg2 hover:text-paper-accent cursor-pointer hover:underline">Data_Fotosintesis.xlsx</span>
                 </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-paper-bg3 rounded-xl">
                 <div className="flex items-center gap-3">
                   <div className="p-1.5 bg-note-pink-bg rounded text-note-pink-bd"><FileTextIcon className="w-4 h-4" /></div>
                   <span className="text-sm text-paper-fg2 hover:text-paper-accent cursor-pointer hover:underline">PDF_Jurnal.pdf</span>
                 </div>
              </div>
            </div>
          </Card>

          <Card className="flex-1 min-h-62.5">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-semibold text-paper-fg2">Komentar Tim</div>
              <MoreHorizontal className="w-4 h-4 text-paper-fg2 cursor-pointer" />
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-paper-accent/20 overflow-hidden shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=33" alt="User B" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">User B</div>
                  <div className="text-xs text-paper-fg2 bg-paper-bg3 p-2 rounded-xl rounded-tl-none">
                    Kelihatannya bagus, pastikan grafik disertakan.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-note-yellow-bg overflow-hidden shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=11" alt="User B" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">User B</div>
                  <div className="text-xs text-paper-fg2 bg-paper-bg3 p-2 rounded-xl rounded-tl-none">
                    Kacannya bagus, pastikan grafik disertakan.
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-note-green-bg overflow-hidden shrink-0">
                  <Image src="https://i.pravatar.cc/150?img=12" alt="User C" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="text-sm font-medium">User C</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
