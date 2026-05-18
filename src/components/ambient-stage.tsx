"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AmbientStage() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const aura = auraRef.current;
    if (!cursor || !aura || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (event: PointerEvent) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.18,
        ease: "power3.out"
      });
      gsap.to(aura, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.55,
        ease: "power3.out"
      });
    };

    window.addEventListener("pointermove", moveCursor);
    return () => window.removeEventListener("pointermove", moveCursor);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-50 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gold)] mix-blend-difference md:block" ref={cursorRef} />
      <div className="pointer-events-none fixed left-0 top-0 z-40 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,181,109,0.18),transparent_62%)] blur-sm md:block" ref={auraRef} />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(215,181,109,0.14)]" />
        <div className="absolute left-[12%] top-[18%] h-36 w-36 rounded-full bg-[rgba(215,181,109,0.12)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[8%] h-64 w-64 rounded-full bg-[rgba(9,38,76,0.65)] blur-3xl" />
      </div>
    </>
  );
}
