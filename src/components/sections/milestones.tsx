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

const Milestones = () => {
  const MotionSeparator = motion.create(Separator);
  const MotionAccordionTrigger = motion.create(AccordionTrigger);

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const [expanded, setExpanded] = useState("0");

  const content = [
    {
      year: 2024,
      text: "Work first job as a Software Developer & become GCP Engineer Certified",
    },
    {
      year: 2023,
      text: "Graduate from Financial Technology with Data Science MSc",
    },
    {
      year: 2022,
      text: "Graduate from Mechanical and Electrical Engineering BEng",
    },
    {
      year: 2020,
      text: "Build first static websites",
    },
    {
      year: 2018,
      text: "Train first Machnie Learning model using NEAT algorithm",
    },
    {
      year: 2016,
      text: "Start programming journey with Python",
    },
  ];

  return (
    <>
      <CrossedLines />

      {/* Content container */}
      <div className="container mx-auto my-12 flex h-full flex-col items-center md:items-start">
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
              <AnimatePresence>
                <MotionAccordionTrigger
                  className="flex flex-col items-start text-2xl hover:no-underline"
                  initial="initial"
                  animate={
                    expanded === i.toString() && isInView
                      ? "animate"
                      : "initial"
                  }
                  whileHover={expanded === i.toString() ? "animate" : "hover"}
                  exit="exit"
                >
                  {item.year}
                  <MotionSeparator
                    className="w-20 bg-white"
                    key={i}
                    variants={{
                      initial: { width: "80px" },
                      animate: { width: "100%" },
                      hover: { width: "120px" },
                      exit: { width: "80px" },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </MotionAccordionTrigger>
              </AnimatePresence>
              <AccordionContent key={i} className="text-right">
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
