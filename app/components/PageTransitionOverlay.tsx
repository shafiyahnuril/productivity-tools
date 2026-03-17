"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useStore } from "../store/useStore";

/**
 * PageTransitionOverlay
 * ---------------------
 * Renders a full-screen themed curtain that animates during the
 * landing-page → dashboard navigation.
 *
 * Flow:
 *  1. isLandingTransition becomes true  → circle EXPANDS from centre
 *  2. After expand, the CTA button's router.push fires (see HeroSection / CTASection)
 *  3. When pathname changes to /dashboard  → circle RETRACTS upward
 *  4. On retract complete → isLandingTransition = false (overlay becomes invisible)
 */
export default function PageTransitionOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const { isLandingTransition, setLandingTransition } = useStore();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const phase = useRef<"idle" | "expanding" | "expanded" | "retracting">(
    "idle",
  );

  /* ── Phase 1: Expand when transition is triggered ── */
  useEffect(() => {
    if (!isLandingTransition || phase.current !== "idle") return;
    if (!ref.current) return;

    phase.current = "expanding";

    gsap.killTweensOf(ref.current);

    // Start hidden
    gsap.set(ref.current, {
      clipPath: "circle(0% at 50% 60%)",
      opacity: 1,
    });

    const tl = gsap.timeline();

    tl.to(ref.current, {
      clipPath: "circle(150% at 50% 60%)",
      duration: 0.65,
      ease: "power4.inOut",
      onComplete: () => {
        phase.current = "expanded";
      },
    });

    // Fade in center label
    if (labelRef.current) {
      tl.fromTo(
        labelRef.current,
        { opacity: 0, scale: 0.85, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" },
        "-=0.15",
      );
    }

    // Animate the background glow blob
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.4,
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [isLandingTransition]);

  /* ── Phase 2: Retract when route is loaded ── */
  useEffect(() => {
    const prev = prevPathname.current;
    prevPathname.current = pathname;

    // Only retract when we've navigated away from the landing page while the overlay is expanded
    if (
      pathname !== "/" &&
      prev === "/" &&
      (phase.current === "expanded" || phase.current === "expanding")
    ) {
      // Wait a tick to let the new page render first
      const timeout = setTimeout(() => {
        if (!ref.current) return;

        phase.current = "retracting";

        // Fade-out label
        if (labelRef.current) {
          gsap.to(labelRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: "power2.in",
          });
        }

        gsap.to(ref.current, {
          clipPath: "circle(0% at 50% -10%)",
          duration: 0.75,
          ease: "power4.inOut",
          delay: 0.05,
          onComplete: () => {
            phase.current = "idle";
            if (glowRef.current) gsap.killTweensOf(glowRef.current);
            setLandingTransition(false);
          },
        });
      }, 80);

      return () => clearTimeout(timeout);
    }
  }, [pathname, setLandingTransition]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        clipPath: "circle(0% at 50% 60%)",
        /* Rich gradient curtain */
        background:
          "linear-gradient(135deg, #b45309 0%, #d97706 30%, #f59e0b 55%, #7c3aed 100%)",
        willChange: "clip-path",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glow blob */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
          filter: "blur(30px)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      {/* Dot grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* Center brand label — visible while screen is covered */}
      <div
        ref={labelRef}
        style={{
          position: "relative",
          opacity: 0,
          textAlign: "center",
          color: "#fff",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            textShadow: "0 2px 20px rgba(0,0,0,0.25)",
          }}
        >
          Productivity Tools
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0.75,
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {/* Simple animated dots */}
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.7)",
              animation: "dot-pulse 1.2s ease-in-out 0s infinite",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.7)",
              animation: "dot-pulse 1.2s ease-in-out 0.2s infinite",
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.7)",
              animation: "dot-pulse 1.2s ease-in-out 0.4s infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
