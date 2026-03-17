"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 950;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    // Enhanced template transition matching the theme
    // We add a subtle clipPath wipe along with the fade/scale
    if (isMobile.current) {
      gsap.fromTo(
        el,
        { x: 30, opacity: 0, clipPath: "inset(0% 0% 0% 100%)" },
        {
          x: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.5,
          ease: "power3.out",
          clearProps: "all",
        },
      );
    } else {
      gsap.fromTo(
        el,
        { y: 20, opacity: 0, scale: 0.98, clipPath: "inset(10% 0% 0% 0%)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "expo.out",
          clearProps: "all",
        },
      );
    }
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      style={{ willChange: "opacity, transform, clip-path" }}
    >
      {children}
    </div>
  );
}
