import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  Variants,
  motion,
  useAnimationFrame,
  useInView,
} from "motion/react";
import { useRef, useState } from "react";

import Image from "next/image";

import { CrosshairIcons } from "@/components/icons/CrosshairIcon";
import { CrossedLines, WireframeLine } from "@/components/lines";
import { SectionTitle, StaggeredText } from "@/components/text";
import { Button } from "@/components/ui/button";

import useMousePosition from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";

const variants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const transition = {
  duration: 0.5,
  ease: "easeInOut",
};

const content = [
  {
    text: "Focus on functional and intuitive user journeys throughout the application.",
    img: "/info1.png",
    alt: "info",
    num: 23,
    tag: "DS",
    header: "[ DS ] Design",
  },
  {
    text: "Build solution using Next.js + React for customisability or Framer for speed.",
    img: "/info1.png",
    alt: "info",
    num: 24,
    tag: "DV",
    header: "[ DV ] Develop",
  },
  {
    text: "Ship the finished product to a live site for your users to interact with.",
    img: "/info1.png",
    alt: "info",
    num: 25,
    tag: "DE",
    header: "[ DE ] Deploy",
  },
];

const renderTitle = (className: string) => (
  <SectionTitle
    text="info"
    className={cn("mb-8 ml-auto mr-0 max-w-52", className)}
  />
);

const Info = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 1 });

  const { x, y } = useMousePosition();

  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const item = content[selected];

  useAnimationFrame(() => {
    // track the position of the mouse relative to the ref
    if (!ref.current) return;

    const constrain = 50;
    const {
      width,
      height,
      y: refY,
      x: refX,
    } = ref.current.getBoundingClientRect();
    const calcX = -(y - refY - height / 2) / constrain;
    const calcY = (x - refX - width / 2) / constrain;

    ref.current.style.transform = `perspective(500px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;
  });

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

  return (
    <>
      <CrossedLines />
      <WireframeLine orientation="h" className="top-1/2" />

      <div className="container mx-auto flex h-full flex-col">
        <CrosshairIcons className="h-10 sm:h-40" />

        {/* Content container */}
        <div className="flex grow flex-col items-center justify-center gap-6 sm:justify-evenly md:flex-row md:gap-4 md:px-2">
          {/* Small screen section title */}
          {renderTitle("md:hidden w-full m-0")}

          {/* Image container */}
          <div
            ref={ref}
            className="w-3/4 translate-x-40 rounded-lg bg-[var(--foreground)] md:w-1/2 xl:w-[40%]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                custom={direction}
                variants={variants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                exit="exit"
                transition={transition}
                className="flex flex-row justify-between px-2 pt-2 text-[var(--background)]"
              >
                <p>{`[ ${item.tag} ]`}</p>

                <p>{item.num}</p>
              </motion.div>
            </AnimatePresence>

            <Image alt={item.alt} src={item.img} width={1000} height={1000} />
          </div>

          {/* Text container */}
          <div className="z-10 w-3/4 sm:h-full md:w-[40%] md:text-right">
            {renderTitle("hidden md:block")}

            <StaggeredText key={selected} className="gradient md:text-lg">
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

              <AnimatePresence mode="wait">
                <motion.h2
                  key={selected}
                  className="inline-block rounded-full bg-white px-3 py-2 text-sm text-black"
                  variants={variants}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  exit="exit"
                  transition={transition}
                >
                  {item.header}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <CrosshairIcons className="h-10 sm:h-40" />
      </div>
    </>
  );
};

export default Info;
