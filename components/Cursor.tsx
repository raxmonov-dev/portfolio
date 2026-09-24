"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

function subscribeFinePointer(onChange: () => void) {
  const media = window.matchMedia("(pointer: fine) and (hover: hover)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getFinePointer() {
  return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
}

export function Cursor() {
  const reduce = useReducedMotion();
  const finePointer = useSyncExternalStore(subscribeFinePointer, getFinePointer, () => false);
  const enabled = finePointer && !reduce;
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, summary, label",
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      data-keep-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
        opacity: visible ? 1 : 0,
        scale: hovering ? 1.7 : 1,
      }}
      transition={{
        x: { type: "spring", stiffness: 500, damping: 40, mass: 0.3 },
        y: { type: "spring", stiffness: 500, damping: 40, mass: 0.3 },
        scale: { duration: 0.18, ease: "easeOut" },
        opacity: { duration: 0.15 },
      }}
    >
      <span className="-ml-1 -mt-1 block h-2 w-2 rounded-full bg-white" />
    </motion.div>
  );
}
