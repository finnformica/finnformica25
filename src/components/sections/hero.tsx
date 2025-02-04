import { motion, useInView, Variants } from "motion/react";

import { Avatar, Banner } from "@/components/branding";
import Header from "@/components/header";
import { VerticalLines } from "@/components/lines";
import { HackerText, StaggeredText } from "@/components/text";
import { Button } from "@/components/ui/button";
import { useCustomCursor } from "@/context/custom-cursor-context";
import { scrollToSection } from "@/lib/utils";
import { useRef } from "react";

const MotionButton = motion.create(Button);

const buttonVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "100%", opacity: 1 },
  exit: {},
};

const tagVariants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: {},
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });
  const { setCursorText, setCursorVariant } = useCustomCursor();

  const tags = [
    { name: "Design", tag: "DS" },
    { name: "Develop", tag: "DV" },
    { name: "Deploy", tag: "DE" },
  ];

  const onMouseEnter = () => {
    setCursorText("scroll");
    setCursorVariant("rotate");
  };

  const onMouseLeave = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  const anim = (variants: Variants) => ({
    initial: "initial",
    animate: isInView ? "animate" : "initial",
    exit: "exit",
    variants,
  });

  return (
    <>
      <VerticalLines />

      <div
        ref={ref}
        className="hero z-[1px] flex grow flex-col"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Header />

        {/* Content container */}
        <div className="container mx-auto flex grow flex-col-reverse justify-center gap-8 md:flex-row md:gap-0">
          {/* Text + CTA container */}
          <div className="flex w-full grow flex-col justify-center gap-8 px-4 md:w-1/2 md:px-0">
            {/* Title */}
            <div className="flex flex-col">
              <span className="pb-0.5 text-xs text-zinc-400 md:text-sm">
                Hello World.
              </span>
              <HackerText
                text="My name is Finn."
                className="text-2xl drop-shadow-white md:text-5xl lg:whitespace-nowrap"
              />
            </div>

            {/* Body */}
            <StaggeredText className="gradient grow text-sm sm:text-base md:grow-0">
              Combining expertise in design and development to craft intuitive
              and scalable digital solutions.
            </StaggeredText>

            {/* CTA */}
            <MotionButton
              {...anim(buttonVariants)}
              variant="outline"
              className="mx-auto w-full"
              onClick={() => scrollToSection("#projects")}
            >
              See Work
            </MotionButton>
          </div>

          {/* Avatar + Tags */}
          <div className="flex h-1/2 w-full flex-col items-center justify-center gap-4 md:h-full md:w-1/2">
            <Avatar className="h-40 w-40 md:h-48 md:w-48" rounded />

            {/* Tags */}
            <div className="mx-auto flex gap-4 md:flex-col">
              {tags.map((tag, i) => (
                <motion.div
                  key={i}
                  {...anim(tagVariants)}
                  transition={{
                    duration: 1,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                  className="flex flex-row gap-2 text-xs font-bold md:text-base"
                >
                  <span>{`[ ${tag.tag} ]`}</span>
                  <span className="hidden md:block">{tag.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Banner />
      </div>
    </>
  );
};

export default Hero;
