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

const MotionImage = motion.create(Image); // Init outside of component to avoid re-creating on each render

const textVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const imgVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const transition = {
  duration: 0.5,
  ease: "easeInOut",
};

const content = [
  {
    text: "Designs focus on creating intuitive, user-centric journeys that ensure a seamless experience throughout the application and align with project goals.",
    img: "/images/goggles.png",
    alt: "info",
    num: 23,
    tag: "DS",
    header: "[ DS ] Design",
  },
  {
    text: "Solutions are built using Next.js and React for full customisability, or Framer for faster delivery, depending on project requirements.",
    img: "/images/retro-computer.png",
    alt: "info",
    num: 24,
    tag: "DV",
    header: "[ DV ] Develop",
  },
  {
    text: "The final product is deployed to a live environment, ensuring immediate access and smooth interaction for end users.",
    img: "/images/cloud-infra.png",
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
    if (selected === content.length - 1) {
      setSelected(0);
      return;
    }

    setSelected(selected + 1);
  };

  const handlePrev = () => {
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

      <div className="container mx-auto flex grow flex-col">
        <CrosshairIcons className="h-10 lg:h-40" />

        {/* Content container */}
        <div className="flex grow flex-col items-center justify-around lg:flex-row lg:gap-4 lg:px-2">
          {/* Small screen section title */}
          {renderTitle("lg:hidden w-full m-0")}

          {/* Image container */}
          <div
            ref={ref}
            className="w-3/4 translate-x-40 rounded-lg bg-[var(--foreground)] lg:w-1/2 xl:w-[40%]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                variants={textVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                exit="exit"
                transition={transition}
                className="flex flex-row justify-between px-2 pt-2 text-xs text-[var(--background)] lg:text-base"
              >
                <p>{`[ ${item.tag} ]`}</p>
                <p>{item.num}</p>
              </motion.div>
            </AnimatePresence>
            <div className="relative m-2 rounded bg-black">
              <AnimatePresence mode="wait">
                <MotionImage
                  // Motion props
                  key={selected}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={imgVariants}
                  transition={transition}
                  // Image props
                  alt={item.alt}
                  src={item.img}
                  width={1000}
                  height={1000}
                  className="scale-[80%] transform"
                  style={{
                    clipPath: "inset(2px)",
                    filter: "sepia(90%) saturate(300%) hue-rotate(240deg)",
                  }}
                />
              </AnimatePresence>

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 3,
                  backdropFilter: "blur(12px)",
                  mask: "radial-gradient(circle, transparent 25%, rgb(0, 0, 0) 75%)",
                }}
              />
            </div>
          </div>

          {/* Text container */}
          <div className="z-10 w-full px-4 lg:w-[40%] lg:px-0 lg:text-right">
            {renderTitle("hidden lg:block")}

            <StaggeredText key={selected} className="text-sm lg:text-lg">
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
                  className="inline-block rounded-full bg-[var(--foreground)] px-3 py-2 text-sm text-[var(--background)]"
                  variants={textVariants}
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

        <CrosshairIcons className="h-10 lg:h-40" />
      </div>
    </>
  );
};

export default Info;
