"use client";

import { motion, AnimatePresence } from "framer-motion";

import styles from "@/styles/preloader.module.css";
import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 10;
// Per-pixel duration and inter-pixel stagger. The callback timing below derives
// from these — change one, the worst-case ms below tracks automatically.
const PIXEL_DURATION = 0;
const STAGGER = 0.02;

const anim = {
  initial: { opacity: 0 },
  open: (delay: number[]) => ({
    opacity: 1,
    transition: { duration: PIXEL_DURATION, delay: STAGGER * delay[1] },
  }),
  closed: (delay: number[]) => ({
    opacity: 0,
    transition: { duration: PIXEL_DURATION, delay: STAGGER * delay[0] },
  }),
};

const shuffle = (a: number[]) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

const getBlocks = (isActive: boolean, indexOfColum: number) => {
  const { innerWidth, innerHeight } = window;
  const blockSize = innerHeight / GRID_SIZE;

  const nbOfBlocks = Math.ceil(innerWidth / blockSize);

  const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));

  return shuffledIndexes.map((randomIndex: number, index: number) => {
    return (
      <motion.div
        key={index}
        className={styles.block}
        variants={anim}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        custom={[
          indexOfColum + randomIndex,
          GRID_SIZE - indexOfColum + randomIndex,
        ]}
      />
    );
  });
};

type PixelTransitionProps = {
  isLoading: boolean;
  isActive: boolean;
  /** Fires when every pixel has finished its cover (`isActive=true`) animation. */
  onCoverComplete?: () => void;
  /** Fires when every pixel has finished its reveal (`isActive=false`) animation. */
  onRevealComplete?: () => void;
};

// Worst-case duration of a cover/reveal pass. Both delay[0] and delay[1] in
// the variants peak at (GRID_SIZE + nbOfBlocks); same upper bound either way.
// Encapsulated here so the orchestrator never has to know our internals.
const computeWorstCaseDurationMs = () => {
  if (typeof window === "undefined") return 0;
  const blockSize = window.innerHeight / GRID_SIZE;
  const nbOfBlocks = Math.ceil(window.innerWidth / blockSize);
  const maxDelay = STAGGER * (GRID_SIZE + nbOfBlocks);
  return (PIXEL_DURATION + maxDelay) * 1000;
};

const PixelTransition = ({
  isLoading,
  isActive,
  onCoverComplete,
  onRevealComplete,
}: PixelTransitionProps) => {
  const [isClient, setIsClient] = useState(false);
  // Track previous isActive so the very first mount (false → false) doesn't
  // fire onRevealComplete immediately.
  const wasActiveRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const wasActive = wasActiveRef.current;
    wasActiveRef.current = isActive;

    if (!isActive && !wasActive) return; // resting state, nothing to fire

    const callback = isActive ? onCoverComplete : onRevealComplete;
    if (!callback) return;

    const t = setTimeout(callback, computeWorstCaseDurationMs());
    return () => clearTimeout(t);
  }, [isActive, isClient, onCoverComplete, onRevealComplete]);

  return (
    <AnimatePresence>
      {(isActive || isLoading) && (
        <div className={styles.pixelBackground}>
          {isClient &&
            [...Array(GRID_SIZE)].map((_, index) => {
              return (
                <div key={index} className={styles.row}>
                  <AnimatePresence>
                    {getBlocks(isActive, index)}
                  </AnimatePresence>
                </div>
              );
            })}
        </div>
      )}
    </AnimatePresence>
  );
};

export default PixelTransition;
