import { motion } from "motion/react";

import { Avatar, Banner } from "@/components/branding";
import Header from "@/components/header";
import { VerticalLines } from "@/components/lines";
import { HackerText, StaggeredText } from "@/components/text";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const MotionButton = motion.create(Button);
  const tags = [
    { name: "Design", tag: "DS" },
    { name: "Develop", tag: "DV" },
    { name: "Deploy", tag: "DE" },
  ];

  return (
    <>
      <VerticalLines />

      <div className="hero z-[1px] flex grow flex-col">
        <Header />

        {/* Content container */}
        <div className="container mx-auto flex grow flex-col-reverse justify-center gap-8 md:flex-row md:gap-0">
          {/* Text + CTA container */}
          <div className="flex w-full grow flex-col justify-center gap-8 px-4 md:w-1/2 md:px-0">
            {/* Title */}
            <div className="flex flex-col">
              <span className="pb-0.5 text-xs text-gray-400 md:text-sm">
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
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              variant="outline"
              className="mx-auto w-full"
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
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
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
