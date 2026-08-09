"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeMatchMedia(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const fired = useRef(false);
  const reduced = useSyncExternalStore(
    subscribeMatchMedia,
    getReducedMotion,
    () => false,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    if (once && fired.current) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            fired.current = true;
            io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, reduced]);

  const visible = reduced || shown;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: visible ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
