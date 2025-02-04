import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";

import Barcode from "@/components/icons/barcode";
import { CrossedLines } from "@/components/lines";
import { SectionTitle } from "@/components/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";

const MotionSeparator = motion.create(Separator);
// const MotionAccordionTrigger = motion.create(AccordionTrigger);

const Milestones = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const [expanded, setExpanded] = useState("0");

  const content = [
    {
      year: 2024,
      text: "Begin my professional journey as a Software Developer and achieve certification as a Google Cloud Platform (GCP) Engineer.",
    },
    {
      year: 2023,
      text: "Earn a MSc degree in Financial Technology with a specialisation in Data Science, solidifying my expertise in the field.",
    },
    {
      year: 2023,
      text: "Collaborate with clients as a freelance developer, delivering tailored UI/UX designs and React-based web applications.",
    },
    {
      year: 2022,
      text: "Complete my undergraduate studies with a BEng degree in Mechanical and Electrical Engineering, building a strong technical foundation.",
    },
    {
      year: 2021,
      text: "Launch my first end-to-end React web application, showcasing both dynamic front-end development and intuitive design.",
    },
    {
      year: 2020,
      text: "Design and develop my first static websites, igniting my passion for web development and UI/UX design.",
    },
  ];

  return (
    <>
      <CrossedLines />

      {/* Content container */}
      <div className="container mx-auto my-6 flex grow flex-col items-center sm:my-12 md:items-start">
        <SectionTitle text="milestones" />

        {/* Accordion container */}
        <Accordion
          ref={ref}
          value={expanded}
          onValueChange={(value) => setExpanded(value)}
          type="single"
          collapsible
          className="z-10 flex w-full grow flex-col justify-evenly py-8"
        >
          {content.map((item, i) => (
            <AccordionItem key={i} value={i.toString()} className="border-b-0">
              <AccordionTrigger className="flex flex-col items-start text-2xl hover:no-underline">
                {item.year}
                <AnimatePresence>
                  <MotionSeparator
                    className="w-20 bg-[var(--foreground)]"
                    key={i}
                    initial="initial"
                    animate={
                      expanded === i.toString() && isInView
                        ? "animate"
                        : "initial"
                    }
                    whileHover={expanded === i.toString() ? "animate" : "hover"}
                    exit="exit"
                    variants={{
                      initial: { width: "80px" },
                      animate: { width: "100%" },
                      hover: { width: "120px" },
                      exit: { width: "80px" },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </AccordionTrigger>
              <AccordionContent
                key={i}
                className="float-right text-right md:max-w-[80%] md:text-lg"
              >
                {item.text}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Barcode container (absolute elements do not respect padding of container) */}
        <div className="relative w-full">
          <Barcode className="absolute bottom-0 right-1/2 translate-x-1/2 md:right-px md:translate-x-0" />
        </div>
      </div>
    </>
  );
};

export default Milestones;
