"use client";

import { Plus } from "lucide-react";

export default function FloatingAddButton() {
  return (
    <button
      onClick={() => console.log("Add New clicked")}
      title="Add New"
      className="md:hidden fixed bottom-[6.5rem] right-4 w-14 h-14 bg-primary text-white flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 z-50"
    >
      <Plus size={28} />
    </button>
  );
}
