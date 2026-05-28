"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollOrchestrator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const gallerySection = document.querySelector<HTMLElement>("[data-gallery-section]");
      const galleryTrack = document.querySelector<HTMLElement>("[data-gallery-track]");

      if (gallerySection && galleryTrack && window.innerWidth >= 768) {
        const getTravelDistance = () => galleryTrack.scrollWidth - window.innerWidth + 32;

        gsap.to(galleryTrack, {
          x: () => -Math.max(0, getTravelDistance()),
          ease: "none",
          scrollTrigger: {
            trigger: gallerySection,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight, getTravelDistance())}`,
            scrub: 0.85,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((element) => {
        const depth = Number(element.dataset.drift || "1");
        gsap.to(element, {
          yPercent: -10 * depth,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-tilt-card]").forEach((card) => {
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateX: y * -8,
            rotateY: x * 10,
            transformPerspective: 900,
            duration: 0.45,
            ease: "power3.out"
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.55)"
          });
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
