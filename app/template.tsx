"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only run horizontal slide on mobile (md breakpoint is 768px in tailwind)
    if (window.innerWidth < 768 && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
      );
    } else if (containerRef.current) {
      // Desktop just fades in slightly
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );
    }
  }, [pathname]);

  return <div ref={containerRef}>{children}</div>;
}
