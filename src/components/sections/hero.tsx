import { motion } from "motion/react";

import { Avatar, Banner } from "@/components/branding";
import Header from "@/components/header";
import { VerticalLines } from "@/components/lines";
import { HackerText } from "@/components/text";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const MotionButton = motion.create(Button);
  const tags = [
    {
      name: "Design",
      tag: "DS",
    },
    {
      name: "Development",
      tag: "DV",
    },
    {
      name: "Artificial Intelligence",
      tag: "AI",
    },
  ];

  return (
    <>
      <VerticalLines />

      <div className="hero z-[1px] flex h-full min-h-full flex-col">
        <Header />

        {/* Content container */}
        <div className="container mx-auto flex grow flex-col-reverse justify-center gap-8 md:flex-row md:gap-0">
          {/* Text + CTA container */}
          <div className="flex w-full grow flex-col justify-center gap-8 px-4 md:w-1/2 md:px-0">
            {/* Title */}
            <div className="flex flex-col">
              <span className="pb-0.5 text-sm text-gray-400">Hello World.</span>
              <HackerText
                text="My name is Finn."
                className="text-5xl drop-shadow-[0px_0px_2px_rgba(255,255,255,0.75)] lg:whitespace-nowrap"
              />
            </div>

            {/* Body */}
            <p className="grow bg-gradient-to-r from-gray-600 to-white to-25% bg-clip-text text-xl text-transparent md:grow-0">
              My unique skill and interest in Data Science, Development and AI
              equips me to provide cutting edge solutions in new dynamic fields.
            </p>

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
            <Avatar className="h-48 w-48" rounded />

            {/* Tags */}
            <div className="mx-auto hidden w-40 gap-4 md:flex md:flex-col">
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
                  className="flex flex-row gap-2 font-bold"
                >
                  <span>{`[${tag.tag}]`}</span>
                  <span>{tag.name}</span>
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
