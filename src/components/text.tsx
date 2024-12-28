import { motion, useInView } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { outerSans } from "@/fonts";
import { cn } from "@/lib/utils";

export const SectionTitle = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <HackerText
    text={text}
    className={cn(
      `${outerSans.className} z-10 inline-block border-[1px] border-divider bg-[var(--background)] px-16 py-4 text-center text-2xl`,
      className,
    )}
  />
);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const HackerText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [rollingText, setRollingText] = useState(text);
  const [rolling, setRolling] = useState(false);

  const handleMouseEnter = () => {
    if (rolling) return;

    let iter = 0;

    setRolling(true);
    const interval = setInterval(() => {
      if (iter >= text.length) {
        setRolling(false);
        clearInterval(interval);
      }

      const newText = text
        .split("")
        .map((char, index) => {
          if (index < iter) return char;

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      setRollingText(newText);
      iter += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    handleMouseEnter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p
      onMouseEnter={handleMouseEnter}
      className={cn("z-10 break-words", className)}
    >
      {rollingText}
    </p>
  );
};

export const RollingText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });

  const DURATION = 0.25;
  const STAGGER = 0.025;

  return (
    <motion.div
      ref={ref}
      initial="initial"
      whileHover="hovered"
      animate={isInView ? "hovered" : "initial"}
      className={cn(
        "relative block overflow-hidden whitespace-nowrap",
        className,
      )}
      style={{ lineHeight: 1.5 }}
    >
      <div>
        {text.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {text.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export const StaggeredText = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const variants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.1,
      }}
      aria-hidden
      className={cn("relative", className)}
    >
      {children.split(" ").map((word, i) => (
        <React.Fragment key={i}>
          <motion.span key={i} className="inline-block" variants={variants}>
            {word}
          </motion.span>{" "}
        </React.Fragment>
      ))}
    </motion.span>
  );
};
