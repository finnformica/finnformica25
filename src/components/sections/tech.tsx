import { motion } from "motion/react";

import { SectionTitle } from "@/components/text";
import "@/styles/tech.css";

const Tech = () => {
  const content = [
    { caption: "Full-stack", icon: null },
    { caption: "Cloud", icon: null },
    { caption: "Design", icon: null },
  ];

  return (
    <>
      <div id="container" className="tech-grid">
        {[...Array(900).keys()].map((i) => (
          <div key={i} className="tile" />
        ))}
      </div>

      <SectionTitle
        text="tech"
        className="transform-clockwise absolute left-[450px] top-[170px] border-none bg-transparent p-0 text-3xl md:text-4xl"
      />

      <motion.div className="transform-anticlockwise absolute left-[150px] top-[320px] flex gap-4">
        {content.map((item, i) => (
          <motion.div
            key={i}
            className="cursor-pointer rounded-full bg-[var(--foreground)] px-6 py-2 text-[var(--background)] transition-all duration-300 ease-in-out hover:-translate-y-2"
          >
            {item.caption}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Tech;
