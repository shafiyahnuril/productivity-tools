"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function DashboardClient({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Stagger-in all direct section-level children
    const cards = containerRef.current.querySelectorAll(
      ".rounded-3xl, .rounded-2xl",
    );

    gsap.fromTo(
      cards,
      { y: 18, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.38,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "transform",
      },
    );
  }, []);

  return (
    <div ref={containerRef} className="relative pb-24 md:pb-0">
      {children}
    </div>
  );
}
