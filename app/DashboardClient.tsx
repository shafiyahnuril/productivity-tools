"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function DashboardClient({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768 && containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".stagger-card");
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, stagger: 0.1, ease: "power2.out" },
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="relative pb-24 md:pb-0">
      {children}
    </div>
  );
}
