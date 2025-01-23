import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";

import { SectionTitle } from "@/components/text";
import { cn } from "@/lib/utils";
import styles from "@/styles/tech.module.css";
import { useIsScreenSm } from "@/hooks/useMediaQuery";

const Tech = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [selected, setSelected] = useState<number | null>(0);
  const isScreenSmall = useIsScreenSm();

  const content = [
    {
      caption: "Design",
      description:
        "Passionate about crafting intuitive and visually appealing user interfaces and experiences. Proficient in design tools like Figma and Adobe XD, with a focus on user-centered design principles.",
    },
    {
      caption: "Full-stack",
      description:
        "Experienced full-stack developer specializing in building and deploying scalable web applications. Skilled in front-end frameworks like React and back-end technologies including Node.js, and Django.",
    },
    {
      caption: "Cloud",
      description:
        "Google Cloud Platform (GCP) certified engineer with expertise in designing, deploying, and managing cloud-based infrastructure and services. Skilled in leveraging cloud-native solutions for scalable applications.",
    },
  ];

  const handleClick = (i: number) => () => {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };

  return (
    <>
      <SectionTitle
        text="tech"
        className={`${styles["transform-clockwise"]} absolute left-[200px] top-[110px] border-none bg-transparent p-0 text-3xl sm:left-[190px] sm:top-[90px] md:text-4xl lg:left-[455px] lg:top-[155px]`}
      />

      {/* Grid */}
      <div className={styles.container}>
        {[...Array(900).keys()].map((i) => (
          <div key={i} className={styles.tile} />
        ))}

        {/* Text */}
        <AnimatePresence mode="wait">
          {/* Content panel */}
          {typeof selected === "number" && (
            <motion.div
              key={selected}
              variants={{
                initial: { left: 56, top: "100%" },
                animate: {
                  left: isScreenSmall ? 56 : 8,
                  top: isScreenSmall ? 56 : 8,
                },
                exit: { opacity: 0 },
              }}
              transition={{
                default: {
                  type: "spring",
                  mass: 0.1,
                  damping: 10,
                  stiffness: 100,
                  ease: "easeInOut",
                },
                opacity: { ease: "linear" },
              }}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              exit="exit"
              className="absolute w-[40vw] md:w-[50vw]"
            >
              <p className="p-2 text-sm backdrop-blur sm:text-base md:text-lg lg:text-xl">
                {content[selected].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <motion.div
        ref={ref}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        transition={{
          staggerChildren: 0.15,
          ease: "easeInOut",
        }}
        className={`${styles["transform-anticlockwise"]} absolute left-[-80px] top-[220px] flex items-center gap-3 lg:left-[150px] lg:top-[320px]`}
      >
        {content.map((item, i) => (
          <motion.div
            key={i}
            whileHover="hover"
            variants={{
              initial: { y: 10 },
              animate: { y: 0 },
              hover: {
                y: -10,
                transition: {
                  type: "linear",
                  duration: 0.3,
                  ease: "easeInOut",
                },
              },
            }}
            className={cn(
              "min-w-fit cursor-pointer rounded-full border-2 border-[var(--background)] bg-[var(--foreground)] px-6 py-2 text-sm text-[var(--background)] lg:text-base",
              selected === i &&
                "border-[var(--foreground)] bg-transparent text-[var(--foreground)]",
            )}
            onClick={handleClick(i)}
          >
            {item.caption}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Tech;
