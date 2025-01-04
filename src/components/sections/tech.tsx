import { motion, AnimatePresence } from "motion/react";

import { SectionTitle } from "@/components/text";
import "@/styles/tech.css";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Tech = () => {
  const [selected, setSelected] = useState<number | null>(0);

  const content = [
    {
      caption: "Full-stack",
      description:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      icon: null,
    },
    {
      caption: "Cloud",
      description:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      icon: null,
    },
    {
      caption: "Design",
      description:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      icon: null,
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
      {/* Grid */}
      <div id="container" className="tech-grid">
        {[...Array(900).keys()].map((i) => (
          <div key={i} className="tile" />
        ))}
      </div>

      <SectionTitle
        text="tech"
        className="transform-clockwise absolute left-[450px] top-[170px] border-none bg-transparent p-0 text-3xl md:text-4xl"
      />

      {/* Buttons */}
      <motion.div className="transform-anticlockwise absolute left-[150px] top-[320px] flex items-center gap-4">
        {content.map((item, i) => (
          <motion.div
            key={i}
            className={cn(
              "min-w-fit cursor-pointer rounded-full bg-[var(--foreground)] px-6 py-2 text-[var(--background)] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]",
              selected === i &&
                "border-2 border-[var(--foreground)] bg-transparent text-[var(--foreground)]",
            )}
            onClick={handleClick(i)}
          >
            {item.caption}
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Content panel */}
        {typeof selected === "number" && (
          <motion.div
            key={selected}
            variants={{
              initial: { left: 0, top: "100vh" },
              animate: { left: 400, top: 210 },
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
            animate="animate"
            exit="exit"
            className="transform-clockwise absolute left-[400px] top-[210px] w-96 border-[var(--divider)] bg-[var(--background)] p-2"
          >
            <p className="text-xl">{content[selected].caption}</p>
            <p>{content[selected].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tech;
