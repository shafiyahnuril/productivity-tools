"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function LandingClient({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Stagger animation for hero elements and sections
      const heroElement = containerRef.current.querySelector("[data-hero]");
      const featureCards = containerRef.current.querySelectorAll("[data-feature-card]");

      if (heroElement) {
        gsap.fromTo(
          heroElement,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      }

      if (featureCards.length > 0) {
        gsap.fromTo(
          featureCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
    </div>
  );
}
