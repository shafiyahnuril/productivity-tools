"use client";

import Image from "next/image";

import { Heading1, Text } from "../components/ui/Typography";
import { Card } from "../components/ui/Card";
import { Button, Tag } from "../components/ui/Elements";
import {
  Search,
  Plus,
  Edit2,
  Download,
  Share2,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  FileText as FileTextIcon,
} from "lucide-react";
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

      <div className="mb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Catatan
        </Link>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:h-full">
          {/* Editor Main Content */}
          <div className="lg:col-span-8 flex flex-col min-h-[60vh] lg:min-h-0 lg:h-full shrink-0">
            <Card className="flex-1 flex flex-col overflow-hidden p-8!">
              <div className="border-b border-border pb-6 mb-6">
                <h1
                  className="text-3xl font-bold mb-4 focus:outline-none"
                  contentEditable
                  suppressContentEditableWarning
                >
                  Laporan Praktikum Biologi - Draft Lengkap
                </h1>

                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm gap-3 sm:gap-0">
                  <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                    <Tag colorClassName="bg-primary/20 text-primary">Tugas</Tag>
                    <Tag colorClassName="bg-warning/20 text-warning">Ujian</Tag>
                    <span className="text-foreground-secondary">
                      • Biologi 101
                    </span>
                  </div>
                  <span className="text-foreground-secondary text-xs sm:text-sm">
                    Diperbarui terakhir: 28 Okt 2024
                  </span>
                </div>
              </div>

              <div
                className="flex-1 overflow-y-auto space-y-6 text-base leading-relaxed text-foreground-secondary outline-none"
                contentEditable
                suppressContentEditableWarning
              >
                <p>
                  <strong className="text-foreground">Tujuan:</strong>{" "}
                  Menentukan efek kualitas cahaya yang bervariasi pada laju
                  fotosintesis.
                </p>
                <p>
                  <strong className="text-foreground">Bahan & Metode:</strong>{" "}
                  Spesimen <em>Elodea canadensis</em>, sensor oksigen, sumber
                  cahaya dengan filter berbeda (Merah, Biru, Hijau, Putih).
                </p>
                <p>
                  <strong className="text-foreground">Hasil:</strong> Tabel
                  ringkasan (O2 ppm/mnt) - Merah (15.2), Biru (12.8), Putih
                  (8.5), Hijau (4.1).
                </p>
                <p>
                  <strong className="text-foreground">Kesimpulan:</strong>{" "}
                  Cahaya merah dan biru mendorong laju fotosintesis yang lebih
                  tinggi daripada cahaya hijau atau putih.
                </p>
              </div>
            </Card>
          </div>

          {/* Right Sidebar actions */}
          <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2">
            <Card>
              <div className="text-sm font-semibold mb-4 text-foreground-secondary">
                Tindakan Cepat
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 p-3 bg-surface-elevated hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent">
                  <Edit2 className="w-4 h-4 text-primary" /> Edit
                </button>
                <button className="flex items-center gap-2 p-3 bg-surface-elevated hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent">
                  <Download className="w-4 h-4 text-foreground-secondary" />{" "}
                  Ekspor PDF
                </button>
                <button className="flex items-center gap-2 p-3 bg-surface-elevated hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent">
                  <Share2 className="w-4 h-4 text-primary-light" /> Bagikan
                </button>
                <button className="flex items-center gap-2 p-3 bg-danger/10 text-danger hover:bg-danger/20 rounded-xl text-sm transition-colors cursor-pointer border border-transparent">
                  <Trash2 className="w-4 h-4" /> Hapus
                </button>
              </div>
            </Card>

            <Card>
              <div className="text-sm font-semibold mb-4 text-foreground-secondary">
                Referensi Terkait
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-elevated rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/20 rounded text-primary">
                      <FileTextIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-foreground-secondary hover:text-primary cursor-pointer hover:underline">
                      Data_Fotosintesis.xlsx
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface-elevated rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-danger/20 rounded text-danger">
                      <FileTextIcon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-foreground-secondary hover:text-primary cursor-pointer hover:underline">
                      PDF_Jurnal.pdf
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="flex-1 min-h-62.5">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-semibold text-foreground-secondary">
                  Komentar Tim
                </div>
                <MoreHorizontal className="w-4 h-4 text-foreground-secondary cursor-pointer" />
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 overflow-hidden shrink-0">
                    <Image
                      src="https://i.pravatar.cc/150?img=33"
                      alt="User B"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">User B</div>
                    <div className="text-xs text-foreground-secondary bg-surface-elevated p-2 rounded-xl rounded-tl-none">
                      Kelihatannya bagus, pastikan grafik disertakan.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-warning/20 overflow-hidden shrink-0">
                    <Image
                      src="https://i.pravatar.cc/150?img=11"
                      alt="User B"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">User B</div>
                    <div className="text-xs text-foreground-secondary bg-surface-elevated p-2 rounded-xl rounded-tl-none">
                      Kacannya bagus, pastikan grafik disertakan.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-success/20 overflow-hidden shrink-0">
                    <Image
                      src="https://i.pravatar.cc/150?img=12"
                      alt="User C"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium">User C</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
