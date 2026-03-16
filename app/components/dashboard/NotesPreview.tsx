"use client";

import Link from "next/link";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Elements";
import { useStore } from "../../store/useStore";

const BORDER_COLORS = ["border-l-primary", "border-l-success", "border-l-warning"];

const TAG_COLORS: Record<string, string> = {
  Assignment: "bg-primary/20 text-primary",
  Exam: "bg-warning/20 text-warning",
  Study: "bg-success/20 text-success",
};

export function NotesPreview() {
  const { notes } = useStore();
  const preview = notes.slice(0, 3);

  return (
    <div className="space-y-3 flex-1 flex flex-col">
      {preview.map((note, i) => (
        <Link key={note.id} href="/notes">
          <Card
            elevated
            className={`border-l-[6px] ${BORDER_COLORS[i % BORDER_COLORS.length]} cursor-pointer hover:bg-surface transition-colors p-4`}
          >
            <div className="font-semibold text-sm mb-1">{note.title}</div>
            <div className="text-xs text-foreground-secondary mb-3 line-clamp-2">
              {note.content}
            </div>
            <div className="flex gap-2 flex-wrap">
              {note.categories.map((cat) => (
                <Tag key={cat} colorClassName={TAG_COLORS[cat] ?? "bg-primary/20 text-primary"}>
                  {cat}
                </Tag>
              ))}
            </div>
          </Card>
        </Link>
      ))}

      {notes.length === 0 && (
        <div className="text-xs text-foreground-tertiary text-center py-4">
          No notes yet.
        </div>
      )}

      <Link href="/notes" className="mt-auto">
        <button className="w-full px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors active:scale-95">
          New Note
        </button>
      </Link>
    </div>
  );
}
