"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LandingClient({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      /* ── Initial hero entrance ── */
      const heroElement = containerRef.current!.querySelector("[data-hero]");
      const featureCards = containerRef.current!.querySelectorAll(
        "[data-feature-card]",
      );

      if (heroElement) {
        gsap.fromTo(
          heroElement,
          { y: 50, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "expo.out" },
        );
      }

      if (featureCards.length > 0) {
        // Implementing Flip Card Animation for feature cards on scroll
        featureCards.forEach((card, index) => {
          gsap.set(card, {
            transformPerspective: 1000,
            transformStyle: "preserve-3d",
          });

          ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: () => {
              gsap.fromTo(
                card,
                { rotationY: 90, opacity: 0, z: -100 },
                {
                  rotationY: 0,
                  opacity: 1,
                  z: 0,
                  duration: 0.8,
                  ease: "back.out(1.4)",
                  delay: index * 0.15,
                  clearProps: "all",
                },
              );
            },
            once: true,
          });
        });
      }

      /* ── Parallax: hero background blobs scroll slower than content ── */
      const blobs = containerRef.current!.querySelectorAll(
        "[data-hero] .blob-parallax",
      );
      blobs.forEach((blob, i) => {
        ScrollTrigger.create({
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const dir = i % 2 === 0 ? 1 : -1;
            gsap.to(blob, {
              y: self.progress * 120 * dir,
              rotation: self.progress * 45 * dir,
              duration: 0.5,
              ease: "power1.out",
              overwrite: "auto",
            });
          },
        });
      });

      /* ── Reveal sections as they scroll into view ── */
      const revealEls =
        containerRef.current!.querySelectorAll(".reveal-section");
      revealEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          },
        );
      });

      /* ── Parallax: floating chips move with scroll ── */
      const chips = containerRef.current!.querySelectorAll(".chip-parallax");
      chips.forEach((chip, i) => {
        const speed = 0.2 + i * 0.08;
        ScrollTrigger.create({
          trigger: containerRef.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(chip, {
              y: self.progress * -150 * speed,
              rotation: self.progress * 15,
              duration: 0.5,
              ease: "power1.out",
              overwrite: "auto",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      {children}
    </div>
  );
}
