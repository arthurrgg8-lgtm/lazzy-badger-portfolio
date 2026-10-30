"use client";

import { useEffect, useState, useRef } from "react";

const matrixGlyphs = "0189ABCDEFXYZ";

interface ScrambleTextProps {
  text: string;
  trigger: boolean;
}

export function ScrambleText({ text, trigger }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!trigger) {
      return;
    }

    const duration = 36; // Snappy 36 frames (~600ms)
    const chars = text.split("");
    const totalLength = chars.length;

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
          // Cycle through clean matrix code characters without width deformation
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

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, trigger]);

  return <span className="font-display select-none inline-block max-w-full break-words sm:whitespace-nowrap">{displayText}</span>;
}
