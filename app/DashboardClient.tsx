"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function DashboardClient({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      /* ── Initial entrance: staggered fade-up for all top-level elements ── */
      const cards = containerRef.current!.querySelectorAll(
        ".rounded-3xl, .rounded-2xl",
      );

      // Only animate cards that are in viewport for entrance
      const initialCards = Array.from(cards).filter(
        (card) => card.getBoundingClientRect().top < window.innerHeight,
      );

      gsap.fromTo(
        initialCards,
        { y: 40, opacity: 0, scale: 0.95, rotationX: 5 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.2)",
          clearProps: "all",
        },
      );

      /* ── Enhanced scroll-triggered batch reveals ── */
      // Select elements that weren't part of the initial entrance
      const scrollCards = Array.from(cards).filter(
        (card) => card.getBoundingClientRect().top >= window.innerHeight,
      );

      ScrollTrigger.batch(scrollCards, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 50, opacity: 0, scale: 0.95, rotationY: 10 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              clearProps: "all",
            },
          );
        },
        once: true,
      });

      /* ── Scroll-triggered reveals for other widgets ── */
      const sections = containerRef.current!.querySelectorAll(
        "[data-scroll-reveal]",
      );

      sections.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0, filter: "blur(5px)" },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.6,
                ease: "power2.out",
                clearProps: "all",
              },
            );
          },
          once: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative pb-24 md:pb-0"
      style={{ perspective: "1000px" }}
    >
      {children}
    </div>
  );
}
