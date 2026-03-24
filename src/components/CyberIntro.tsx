/** Animated cyber intro sequence shown once per session */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "Initializing Neural Cyber System...",
  "Loading Security Modules...",
  "Welcome, Agent",
];

export default function CyberIntro() {
  const [visible, setVisible] = useState(() => {
    if (sessionStorage.getItem("cyber-intro-done")) return false;
    return true;
  });
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (lineIdx >= LINES.length) {
      const t = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("cyber-intro-done", "1");
      }, 600);
      return () => clearTimeout(t);
    }
    if (charIdx < LINES[lineIdx].length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 30);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx(l => l + 1);
      setCharIdx(0);
    }, 400);
    return () => clearTimeout(t);
  }, [visible, lineIdx, charIdx]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary)/0.1) 2px, hsl(var(--primary)/0.1) 4px)",
          }} />

          <div className="font-mono text-sm sm:text-base space-y-2 px-6 max-w-md">
            {LINES.slice(0, lineIdx + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={i === LINES.length - 1 ? "text-primary font-bold text-lg mt-4" : "text-muted-foreground"}
              >
                <span className="text-primary mr-1">{">"}</span>
                {i < lineIdx ? line : line.slice(0, charIdx)}
                {i === lineIdx && <span className="animate-pulse text-primary">▊</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
