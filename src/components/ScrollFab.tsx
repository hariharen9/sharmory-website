import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ScrollFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-5 z-40 flex flex-col gap-1 border border-hairline/80 bg-background/80 p-1 shadow-xl shadow-black/60 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            className="flex h-7 w-7 items-center justify-center border border-transparent font-mono text-xs text-muted-foreground transition-all hover:border-signal hover:bg-signal/15 hover:text-signal active:scale-95"
          >
            ↑
          </button>
          <div className="h-px w-full bg-hairline/50" />
          <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
            title="Scroll to bottom"
            className="flex h-7 w-7 items-center justify-center border border-transparent font-mono text-xs text-muted-foreground transition-all hover:border-signal hover:bg-signal/15 hover:text-signal active:scale-95"
          >
            ↓
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
