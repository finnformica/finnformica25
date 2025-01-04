import { motion, useInView } from "motion/react";

import { CrosshairIcons } from "@/components/icons/CrosshairIcon";
import Arrow from "@/components/icons/arrow";
import { SectionTitle } from "@/components/text";
import { cn } from "@/lib/utils";

import { useRef } from "react";
import Github from "../icons/github";

const Square = ({
  className,
  style,
}: {
  className?: string;
  style?: { [key: string]: string };
}) => (
  <div
    style={style}
    className={cn(
      "absolute h-40 w-40 rounded-xl border-[3px] border-divider",
      className,
    )}
  />
);

const Tech = () => {
  const MotionSquare = motion.create(Square);

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const hidden = isInView ? "opacity-100" : "opacity-0";

  const leftVariant = {
    initial: { x: "-100%" },
    animate: { x: 0 },
  };

  const bottomVariant = {
    initial: { y: "100%", x: "100%" },
    animate: { y: 0, x: 0 },
  };

  const topVariant = {
    initial: { y: "-100%" },
    animate: { y: 0 },
  };

  const transition = {
    ease: "easeInOut",
    duration: 0.4,
    delay: 0.25,
  };

  const animations = {
    initial: "initial",
    animate: isInView ? "animate" : "initial",
    transition,
  };

  const content = [
    { caption: "Front End", icon: null },
    { caption: "Back End", icon: null },
    { caption: "Machine Learning", icon: null },
    { caption: "Blockchain", icon: null },
    { caption: "Cloud Computing", icon: null },
    { caption: "User Experience", icon: null },
    { caption: "Web Design", icon: null },
    { caption: "Product & Innovation", icon: null },
    { caption: "Web Design", icon: null },
  ];

  return (
    <>
      {/* Left square */}
      {/* <MotionSquare
        className={`left-[-24px] top-48 ${hidden}`}
        style={{ clipPath: "inset(0 0 0 24px)" }}
        {...animations}
        variants={leftVariant}
      /> */}

      {/* Top square */}
      {/* <MotionSquare
        className={`left-24 top-[-36px] ${hidden}`}
        style={{ clipPath: "inset(36px 0 0 0)" }}
        {...animations}
        variants={topVariant}
      /> */}

      {/* Left arrow */}
      {/* <motion.div
        className={`absolute left-[-96px] top-96 ${hidden}`}
        style={{ clipPath: "inset(0 0 0 96px)" }}
        {...animations}
        variants={leftVariant}
      >
        <Arrow width={240} height={240} />
      </motion.div> */}

      {/* Bottom arrow */}
      {/* <motion.div
        className={`absolute bottom-[-48px] left-1/2 ${hidden}`}
        style={{ clipPath: "inset(0 0 48px 0)" }}
        {...animations}
        variants={bottomVariant}
      >
        <Arrow width={240} height={240} className="-rotate-[135deg]" />
      </motion.div> */}

      <div ref={ref} className="container mx-auto my-12 flex h-full flex-col">
        <div className="flex grow flex-col-reverse md:flex-row">
          <div className="md:w-1/2">
            {/* Grid container / parent */}
            <div className="grid grid-cols-3">
              {content.map((item, i) => (
                <div
                  key={i}
                  className="col-span-1 row-span-1 flex aspect-square cursor-pointer flex-col items-center justify-between gap-2 p-2 text-center shadow-[0_0_1px_0_var(--foreground)] transition-all ease-in hover:drop-shadow-[0_0_2px_var(--foreground)]"
                >
                  {/* Container to center icon vertically */}
                  <div className="flex grow items-center">
                    <Github />
                  </div>
                  <p className="text-sm">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text container */}
          <div className="md:w-1/2">
            <SectionTitle text="tech" />
          </div>
        </div>

        <CrosshairIcons className="items-end" />
      </div>
    </>
  );
};

export default Tech;
