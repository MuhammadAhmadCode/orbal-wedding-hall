"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";

const THEME_KEY = "orbal-theme";
const THEME_EVENT = "orbal-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getSnapshot(): "dark" | "light" {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): "dark" | "light" {
  return "light";
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = dark === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink-2 text-ivory transition-all duration-300 hover:border-gold/50 hover:text-gold"
    >
      {dark === "dark" ? (
        <Sun size={19} weight="bold" />
      ) : (
        <Moon size={19} weight="bold" />
      )}
    </button>
  );
}
