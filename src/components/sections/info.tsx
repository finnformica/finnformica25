import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, Variants, motion, useInView } from "motion/react";
import { useRef, useState } from "react";

import Image from "next/image";

import { CrosshairIcons } from "@/components/icons/CrosshairIcon";
import { CrossedLines, WireframeLine } from "@/components/lines";
import { SectionTitle, StaggeredText } from "@/components/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const variants: Variants = {
  initial: (direction) => ({ opacity: 0, y: direction === 1 ? 25 : -25 }),
  animate: { opacity: 1, y: 0 },
  exit: (direction) => ({ opacity: 0, y: direction === 1 ? -25 : 25 }),
};

const transition = {
  duration: 0.5,
  ease: "easeInOut",
};

const content = [
  {
    text: "I explore the intersection of engineering, data science and AI",
    img: "/info1.png",
    alt: "info",
    num: 23,
    tag: "DV",
  },
  {
    text: "I explore the intersection of engineering, data science and AI",
    img: "/info1.png",
    alt: "info",
    num: 24,
    tag: "DD",
  },
  {
    text: "I explore the intersection of engineering, data science and AI",
    img: "/info1.png",
    alt: "info",
    num: 25,
    tag: "DS",
  },
  {
    text: "I explore the intersection of engineering, data science and AI",
    img: "/info1.png",
    alt: "info",
    num: 26,
    tag: "AI",
  },
];

const renderTitle = (className: string) => (
  <SectionTitle
    text="info"
    className={cn("mb-8 ml-auto mr-0 max-w-52", className)}
  />
);

const Info = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });

  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const handleNext = () => {
    setDirection(1);

    if (selected === content.length - 1) {
      setSelected(0);
      return;
    }

    setSelected(selected + 1);
  };

  const handlePrev = () => {
    setDirection(-1);

    if (selected === 0) {
      setSelected(content.length - 1);
      return;
    }

    setSelected(selected - 1);
  };

  const item = content[selected];

  return (
    <>
      <CrossedLines />
      <WireframeLine orientation="h" className="top-1/2" />

      <div className="container mx-auto flex h-full flex-col">
        <CrosshairIcons />

        {/* Content container */}
        <AnimatePresence mode="wait">
          <div
            ref={ref}
            className="flex grow flex-col items-center justify-between gap-4 md:flex-row md:px-2"
          >
            {/* Small screen section title */}
            {renderTitle("md:hidden block w-full mx-0")}

            {/* Image container */}
            <motion.div
              key={selected}
              custom={direction}
              variants={variants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              exit="exit"
              transition={transition}
              className="w-3/4 rounded-lg bg-[var(--foreground)] md:w-1/2 xl:w-[40%]"
            >
              <div className="flex flex-row justify-between px-2 pt-2 text-[var(--background)]">
                <p>{`[${item.tag}]`}</p>

                <p>{item.num}</p>
              </div>
              <div className="aspect-auto w-full"></div>

              <Image alt={item.alt} src={item.img} width={1000} height={1000} />
            </motion.div>

            {/* Text container */}
            <div className="z-10 h-full w-3/4 md:w-[40%]">
              {renderTitle("hidden md:block")}

              <StaggeredText key={selected} className="text-lg">
                {item.text}
              </StaggeredText>

              <div className="flex items-center justify-between pt-8">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" onClick={handlePrev}>
                    <ArrowLeft />
                  </Button>

                  <Button variant="outline" size="icon" onClick={handleNext}>
                    <ArrowRight />
                  </Button>
                </div>

                <motion.span
                  key={selected}
                  custom={1}
                  variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                  }}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  transition={transition}
                  className="text-sm font-thin text-gray-300"
                >
                  - [Finn Formica]
                </motion.span>
              </div>
            </div>
          </div>
        </AnimatePresence>

        <CrosshairIcons />
      </div>
    </>
  );
};

export default Info;
