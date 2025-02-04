import { motion } from "motion/react";
import styles from "@/styles/preloader.module.css";

const Preloader = () => {
  return (
    <motion.div
      initial="initial"
      animate="initial"
      exit="hide"
      variants={{
        initial: { opacity: 1 },
        hide: { opacity: 0 },
      }}
      className="absolute left-0 top-0 z-[997] flex h-screen w-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)]"
    >
      <p className={styles.glitch} data-text="Loading...">
        Loading...
      </p>
    </motion.div>
  );
};

export default Preloader;
