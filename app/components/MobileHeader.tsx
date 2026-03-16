"use client";

import Link from "next/link";
import { User, Settings } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background-secondary/90 backdrop-blur-md border-b border-border/50 z-40 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary/15 text-primary rounded-xl flex items-center justify-center font-black text-xs tracking-tighter select-none">
          PA
        </div>
        <span className="font-bold text-sm">Productivity App</span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/account"
          className="p-2 text-foreground-secondary hover:text-foreground transition-colors rounded-full hover:bg-surface-tertiary"
        >
          <User size={20} />
        </Link>
        <Link
          href="/settings"
          className="p-2 text-foreground-secondary hover:text-foreground transition-colors rounded-full hover:bg-surface-tertiary"
        >
          <Settings size={20} />
        </Link>
      </div>
    </header>
  );
}
