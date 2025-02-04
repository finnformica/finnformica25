import styles from "@/styles/preloader.module.css";
import { AnimatePresence, motion } from "motion/react";

const LoadingGlitch = ({ isActive }: { isActive: boolean }) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial="initial"
          animate="initial"
          exit="hide"
          variants={{
            initial: { y: 0 },
            hide: { y: "100vh" },
          }}
          transition={{
            duration: 0.5,
          }}
          className="absolute left-0 top-0 z-[997] flex h-screen w-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)]"
        >
          <p className={styles.glitch} data-text="Loading...">
            Loading...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingGlitch;
