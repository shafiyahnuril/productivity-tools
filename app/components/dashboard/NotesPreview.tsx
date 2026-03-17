"use client";

import Link from "next/link";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Elements";
import { useStore } from "../../store/useStore";

const NOTE_STYLES = [
  {
    border: "border-l-primary/50",
    bg: "",
    hover: "hover:bg-primary/[0.09]",
  },
  {
    border: "border-l-success/50",
    bg: "",
    hover: "hover:bg-success/[0.09]",
  },
  {
    border: "border-l-warning/50",
    bg: "",
    hover: "hover:bg-warning/[0.09]",
  },
] as const;

const TAG_COLORS: Record<string, string> = {
  Assignment: "bg-primary/15 text-primary",
  Exam: "bg-warning/15 text-warning",
  Study: "bg-success/15 text-success",
};

export function NotesPreview() {
  const { notes } = useStore();
  const preview = notes.slice(0, 3);

  return (
    <div className="space-y-3 flex-1 flex flex-col">
      {preview.map((note, i) => {
        const style = NOTE_STYLES[i % NOTE_STYLES.length];
        return (
          <Link key={note.id} href="/notes">
            <Card
              className={`border-l-4 ${style.border} ${style.bg} ${style.hover} transition-colors p-4 cursor-pointer`}
            >
              <div className="font-semibold text-sm mb-1">{note.title}</div>
              <div className="text-xs text-foreground-secondary mb-3 line-clamp-2">
                {note.content}
              </div>
              <div className="flex gap-2 flex-wrap">
                {note.categories.map((cat) => (
                  <Tag
                    key={cat}
                    colorClassName={
                      TAG_COLORS[cat] ?? "bg-primary/20 text-primary"
                    }
                  >
                    {cat}
                  </Tag>
                ))}
              </div>
            </Card>
          </Link>
        );
      })}

      {notes.length === 0 && (
        <div className="text-xs text-foreground-tertiary text-center py-4">
          No notes yet.
        </div>
      )}

      <Link href="/notes" className="mt-4">
        <button className="w-full px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors active:scale-95">
          New Note
        </button>
      </Link>
    </div>
  );
}
