"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";

export function DashboardClient({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768 && containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.stagger-card');
      gsap.fromTo(cards, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.2, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="relative pb-24 md:pb-0">
      {children}
      {/* Mobile FAB */}
      <button className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg z-50 animate-bounce active:scale-95">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
