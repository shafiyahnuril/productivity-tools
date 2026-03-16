"use client";

import { useState } from "react";
import { Plus, CheckSquare, FileText, X } from "lucide-react";

export default function FloatingAddButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<"todo" | "note" | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="md:hidden fixed bottom-[6.5rem] right-4 z-50 flex flex-col items-center gap-3">
        {isOpen && (
          <div className="flex flex-col gap-2 mb-2">
            <button
              onClick={() => {
                setModal("note");
                setIsOpen(false);
              }}
              title="Add Note"
              className="w-12 h-12 bg-white dark:bg-gray-800 text-primary flex items-center justify-center rounded-full shadow-lg hover:scale-105 transition-all"
            >
              <FileText size={20} />
            </button>
            <button
              onClick={() => {
                setModal("todo");
                setIsOpen(false);
              }}
              title="Add Todo"
              className="w-12 h-12 bg-white dark:bg-gray-800 text-primary flex items-center justify-center rounded-full shadow-lg hover:scale-105 transition-all"
            >
              <CheckSquare size={20} />
            </button>
          </div>
        )}
        <button
          onClick={toggleMenu}
          title="Add New"
          className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {isOpen ? <X size={28} /> : <Plus size={28} />}
        </button>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {modal === "todo" ? "Add Task" : "Add Note"}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Form implementation coming next...
            </p>

            <button
              onClick={() => setModal(null)}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
