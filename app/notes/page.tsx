"use client";

import Image from "next/image";
import Link from "next/link";

import { useState, useRef, useEffect, useCallback } from "react";
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
  FileText as FileTextIcon,
  Check,
  X,
  ArrowLeft,
} from "lucide-react";
import { useStore } from "../store/useStore";
import { format, parseISO, isValid } from "date-fns";

const CATEGORY_COLORS: Record<string, string> = {
  Assignment: "bg-primary/20 text-primary",
  Exam: "bg-warning/20 text-warning",
  Study: "bg-success/20 text-success",
};

function formatUpdatedAt(dateStr: string) {
  try {
    const d = parseISO(dateStr);
    if (isValid(d)) return format(d, "dd MMM yyyy");
  } catch {
    // fallback
  }
  return dateStr;
}

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, setActiveModal } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeNoteId, setActiveNoteId] = useState<string | null>(
    notes.length > 0 ? notes[0].id : null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const filteredNotes = notes.filter((n) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.categories.some((c) => c.toLowerCase().includes(q))
    );
  });

  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;

  // When active note changes, if we were editing without saving, reset
  const selectNote = (id: string) => {
    setIsEditing(false);
    setActiveNoteId(id);
    setShowDeleteConfirm(false);
  };

  const startEdit = () => {
    if (!activeNote) return;
    setEditTitle(activeNote.title);
    setEditContent(activeNote.content);
    setIsEditing(true);
  };

  const saveEdit = useCallback(() => {
    if (!activeNote) return;
    // Get content from contentEditable if available
    const content = contentRef.current
      ? contentRef.current.innerText
      : editContent;
    updateNote(activeNote.id, {
      title: editTitle || activeNote.title,
      content: content,
    });
    setIsEditing(false);
  }, [activeNote, editTitle, editContent, updateNote]);

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!activeNote) return;
    const currentIndex = notes.findIndex((n) => n.id === activeNote.id);
    deleteNote(activeNote.id);
    setShowDeleteConfirm(false);
    setIsEditing(false);
    // Select next available note
    const remaining = notes.filter((n) => n.id !== activeNote.id);
    if (remaining.length > 0) {
      const nextIndex = Math.min(currentIndex, remaining.length - 1);
      setActiveNoteId(remaining[nextIndex].id);
    } else {
      setActiveNoteId(null);
    }
  };

  const handleExport = () => {
    if (!activeNote) return;
    const content = `${activeNote.title}\n${"=".repeat(activeNote.title.length)}\n\n${activeNote.content}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeNote.title.replace(/[^a-z0-9]/gi, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!activeNote) return;
    const text = `${activeNote.title}\n\n${activeNote.content}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback for older browsers
    }
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const handleNewNote = () => {
    setActiveModal("note");
  };

  // When notes change and there's no active note, select first
  useEffect(() => {
    if (!activeNoteId && notes.length > 0) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 min-h-screen flex flex-col">
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
            onClick={handleNewNote}
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

      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      <div className="mb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Catatan
        </Link>
      </div>

      <div className="flex-1 min-h-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
          {/* Notes List Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-foreground-secondary uppercase">
                Catatan ({filteredNotes.length})
              </span>
              <button
                onClick={handleNewNote}
                className="p-1.5 hover:bg-surface-elevated rounded-lg text-foreground-secondary hover:text-primary transition-colors"
                title="Catatan Baru"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile search */}
            <div className="lg:hidden relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari catatan..."
                className="pl-9 pr-4 py-2 bg-surface-elevated rounded-xl border border-border text-sm focus:outline-none focus:border-primary w-full"
              />
            </div>

            <div className="flex flex-col gap-2 max-h-[60vh] lg:max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
              {filteredNotes.length === 0 && (
                <div className="text-center py-8 text-foreground-secondary text-sm">
                  Tidak ada catatan.
                </div>
              )}
              {filteredNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => selectNote(note.id)}
                  className={`text-left p-3 rounded-2xl border bg-surface shadow-sm transition-all ${
                    note.id === activeNoteId
                      ? "border-primary ring-1 ring-primary/20"
                      : "border-border hover:bg-surface-elevated"
                  }`}
                >
                  <div className="text-sm font-semibold line-clamp-1 mb-1">
                    {note.title}
                  </div>
                  <div className="text-xs text-foreground-secondary line-clamp-2 mb-2">
                    {note.content}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {note.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[cat] ?? "bg-surface-elevated text-foreground"}`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] text-foreground-secondary shrink-0">
                      {formatUpdatedAt(note.updatedAt)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor Main Content */}
          <div className="lg:col-span-6 flex flex-col min-h-[60vh] lg:min-h-0">
            {activeNote ? (
              <Card className="flex-1 flex flex-col overflow-hidden p-8!">
                <div className="border-b border-border pb-6 mb-6">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-3xl font-bold w-full bg-transparent border-b-2 border-primary focus:outline-none mb-4"
                      autoFocus
                    />
                  ) : (
                    <h1
                      className="text-3xl font-bold mb-4"
                      onDoubleClick={startEdit}
                      title="Double-click to edit"
                    >
                      {activeNote.title}
                    </h1>
                  )}

                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm gap-3 sm:gap-0">
                    <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                      {activeNote.categories.map((cat) => (
                        <Tag
                          key={cat}
                          colorClassName={
                            CATEGORY_COLORS[cat] ??
                            "bg-surface-elevated text-foreground"
                          }
                        >
                          {cat}
                        </Tag>
                      ))}
                    </div>
                    <span className="text-foreground-secondary text-xs sm:text-sm">
                      Diperbarui: {formatUpdatedAt(activeNote.updatedAt)}
                    </span>
                  </div>
                </div>

                {isEditing ? (
                  <>
                    <div
                      ref={contentRef}
                      contentEditable
                      suppressContentEditableWarning
                      className="flex-1 overflow-y-auto text-base leading-relaxed text-foreground-secondary outline-none border border-border rounded-xl p-4 min-h-[200px]"
                      dangerouslySetInnerHTML={{ __html: editContent }}
                    />
                    <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                      <button
                        onClick={cancelEdit}
                        className="flex-1 py-2 border border-border rounded-xl text-sm font-medium text-foreground-secondary hover:bg-surface-elevated transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" /> Batal
                      </button>
                      <button
                        onClick={saveEdit}
                        className="flex-1 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Simpan
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    className="flex-1 overflow-y-auto space-y-4 text-base leading-relaxed text-foreground-secondary outline-none whitespace-pre-wrap"
                    onDoubleClick={startEdit}
                    title="Double-click to edit"
                  >
                    {activeNote.content}
                  </div>
                )}
              </Card>
            ) : (
              <Card className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <FileTextIcon className="w-12 h-12 text-foreground-secondary mb-4" />
                <div className="text-lg font-semibold mb-2">
                  Pilih atau Buat Catatan
                </div>
                <div className="text-sm text-foreground-secondary mb-6">
                  Pilih catatan dari daftar atau buat catatan baru.
                </div>
                <Button
                  onClick={handleNewNote}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Catatan Baru
                </Button>
              </Card>
            )}
          </div>

          {/* Right Sidebar actions */}
          <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2">
            <Card>
              <div className="text-sm font-semibold mb-4 text-foreground-secondary">
                Tindakan Cepat
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={startEdit}
                  disabled={!activeNote}
                  className="flex items-center gap-2 p-3 bg-surface-elevated hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Edit2 className="w-4 h-4 text-primary" /> Edit
                </button>
                <button
                  onClick={handleExport}
                  disabled={!activeNote}
                  className="flex items-center gap-2 p-3 bg-surface-elevated hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4 text-foreground-secondary" />{" "}
                  Export
                </button>
                <button
                  onClick={handleShare}
                  disabled={!activeNote}
                  className="flex items-center gap-2 p-3 bg-surface-elevated hover:bg-border rounded-xl text-sm transition-colors cursor-pointer border border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {shareSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-success" />{" "}
                      <span className="text-success">Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-primary-light" /> Bagikan
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={!activeNote}
                  className="flex items-center gap-2 p-3 bg-danger/10 text-danger hover:bg-danger/20 rounded-xl text-sm transition-colors cursor-pointer border border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-4 h-4" /> Hapus
                </button>
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-semibold text-foreground-secondary">
                  Semua Catatan
                </div>
                <MoreHorizontal className="w-4 h-4 text-foreground-secondary cursor-pointer" />
              </div>
              <div className="space-y-2">
                {notes.slice(0, 5).map((note) => (
                  <button
                    key={note.id}
                    onClick={() => selectNote(note.id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left ${
                      note.id === activeNoteId
                        ? "bg-primary/10"
                        : "hover:bg-surface-elevated"
                    }`}
                  >
                    <div className="p-1.5 bg-primary/20 rounded text-primary shrink-0">
                      <FileTextIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-foreground-secondary hover:text-primary line-clamp-1">
                      {note.title}
                    </span>
                  </button>
                ))}
                {notes.length === 0 && (
                  <div className="text-xs text-foreground-secondary text-center py-4">
                    Belum ada catatan.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && activeNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold mb-2">Hapus Catatan?</h2>
            <p className="text-sm text-foreground-secondary mb-6">
              Catatan &quot;{activeNote.title}&quot; akan dihapus secara
              permanen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground-secondary hover:bg-surface-elevated transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-danger text-white rounded-xl text-sm font-medium hover:bg-danger/90 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
