import styles from "@/styles/preloader.module.css";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValueEvent,
} from "motion/react";
import { useRef } from "react";

type LoadingGlitchProps = {
  isActive: boolean;
  count: MotionValue<number>;
  /** Fires when the slide-out exit animation completes. */
  onExited?: () => void;
};

const LoadingGlitch = ({ isActive, count, onExited }: LoadingGlitchProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);

  // Drive the bottom counter directly from the MotionValue so we don't
  // re-render this tree every frame as the number ticks.
  useMotionValueEvent(count, "change", (v) => {
    const text = Math.round(v).toString().padStart(3, "0");
    if (counterRef.current) counterRef.current.textContent = text;
  });

  return (
    <AnimatePresence mode="wait" onExitComplete={onExited}>
      {isActive && (
        <motion.div
          initial="initial"
          animate="initial"
          exit="hide"
          variants={{
            initial: { y: 0 },
            hide: { y: "100vh" },
          }}
          transition={{ duration: 0.5 }}
          className="fixed left-0 top-0 z-[997] flex h-screen w-screen cursor-wait items-center justify-center bg-[var(--background)] text-[var(--foreground)]"
        >
          <p className={styles.glitch} data-text="Loading...">
            Loading...
          </p>
          <span ref={counterRef} className={styles.counter}>
            000
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingGlitch;
