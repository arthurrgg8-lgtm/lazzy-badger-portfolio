"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const matrixGlyphs = "X0189ABCDEF!@#$%^&*()_+~`<>?:{}[]-=/|";

interface NavLinkProps {
  href: string;
  text: string;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, text, className, onClick }: NavLinkProps) {
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  const startScramble = () => {
    const duration = 12; // Fast, snappy hover scramble (12 frames)
    const chars = text.split("");
    const totalLength = chars.length;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const tick = () => {
      frameRef.current++;
      const currentFrame = frameRef.current;

      const progress = currentFrame / duration;
      const lockedCount = Math.floor(progress * totalLength);

      const nextText = chars
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < lockedCount) {
            return char;
          }
          const randGlyph = matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
          return randGlyph;
        })
        .join("");

      setDisplayText(nextText);

      if (currentFrame < duration) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
      }
    };

    frameRef.current = 0;
    animationRef.current = requestAnimationFrame(tick);
  };

  const handleMouseEnter = () => {
    startScramble();
  };

  return (
    <Link
      className={className}
      href={href as any}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
    >
      {displayText}
    </Link>
  );
}
