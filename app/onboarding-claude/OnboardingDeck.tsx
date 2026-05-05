"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home, Maximize, Minimize } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = "atisa-onboarding-claude-slide";

export function OnboardingDeck({ slides }: { slides: React.ReactNode[] }) {
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const n = parseInt(saved, 10);
      if (!isNaN(n) && n >= 0 && n < total) setCurrent(n);
    }
  }, [total]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, current.toString());
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => Math.min(c + 1, total - 1));
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > current ? 1 : -1);
      setCurrent(i);
    },
    [current]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(total - 1);
      } else if (e.key === "f" || e.key === "F") {
        setFullscreen((f) => !f);
      } else if (e.key === "Escape") {
        setFullscreen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, goTo, total]);

  const variants = useMemo(
    () => ({
      enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
      center: { opacity: 1, x: 0 },
      exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
    }),
    []
  );

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {!fullscreen && (
        <header className="border-b border-line bg-bg sticky top-0 z-30">
          <div className="page-container flex items-center justify-between h-14">
            <div className="flex items-center gap-5">
              <Link href="/" className="font-semibold text-[12.5px] tracking-[0.18em] text-ink hover:text-accent transition-colors">
                ATISA
              </Link>
              <div className="font-mono text-[10.5px] tracking-widest uppercase text-ink-4">
                Onboarding · Claude
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="text-[12px] text-ink-3 hover:text-accent px-3 py-1.5 transition-colors flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5" /> Inicio
              </Link>
              <button
                onClick={() => setFullscreen(true)}
                className="text-[12px] text-ink-3 hover:text-accent px-3 py-1.5 transition-colors flex items-center gap-1.5"
                title="Modo presentación (F)"
              >
                <Maximize className="w-3.5 h-3.5" /> Presentar
              </button>
            </div>
          </div>
        </header>
      )}

      {fullscreen && (
        <button
          onClick={() => setFullscreen(false)}
          className="fixed top-4 right-4 z-50 bg-ink text-white text-[11px] px-3 py-1.5 flex items-center gap-1.5 hover:bg-ink/90 transition-colors"
        >
          <Minimize className="w-3.5 h-3.5" /> Salir (Esc)
        </button>
      )}

      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full"
          >
            {slides[current]}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="border-t border-line bg-bg sticky bottom-0 z-30">
        <div className="page-container h-14 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex items-center gap-1.5 text-[12.5px] text-ink-3 hover:text-accent disabled:opacity-30 disabled:hover:text-ink-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 transition-all ${i === current ? "w-8 bg-accent" : "w-1.5 bg-line hover:bg-ink-4"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={current === total - 1}
            className="flex items-center gap-1.5 text-[12.5px] text-ink-3 hover:text-accent disabled:opacity-30 disabled:hover:text-ink-3 transition-colors"
          >
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="page-container pb-2">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-4 text-center">
            {current + 1} / {total} · ← → para navegar · F para presentar
          </div>
        </div>
      </div>
    </div>
  );
}
