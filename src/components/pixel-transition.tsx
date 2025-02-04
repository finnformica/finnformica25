"use client";

import { motion, AnimatePresence } from "framer-motion";

import styles from "@/styles/preloader.module.css";
import { useEffect, useState } from "react";

const GRID_SIZE = 10;

const anim = {
  initial: {
    opacity: 0,
  },
  open: (delay: number[]) => ({
    opacity: 1,
    transition: { duration: 0, delay: 0.02 * delay[1] },
  }),
  closed: (delay: number[]) => ({
    opacity: 0,
    transition: { duration: 0, delay: 0.02 * delay[0] },
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

const PixelTransition = ({ isLoading }: { isLoading: boolean }) => {
  const [isClient, setIsClient] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsActive(true);
      }, 2000);

      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }
  }, [isLoading]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.pixelBackground}>
      {isClient &&
        [...Array(GRID_SIZE)].map((_, index) => {
          return (
            <div key={index} className={styles.row}>
              <AnimatePresence>{getBlocks(isActive, index)}</AnimatePresence>
            </div>
          );
        })}
    </div>
  );
};

export default PixelTransition;
