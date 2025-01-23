import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Avatar, Banner, Initials } from "@/components/branding";
import { CrosshairIcons } from "@/components/icons/CrosshairIcon";
import Github from "@/components/icons/github";
import Linkedin from "@/components/icons/linkedin";
import Mail from "@/components/icons/mail";
import MagneticItem from "@/components/magnetic-item";
import { StaggeredText } from "@/components/text";
import { Button } from "@/components/ui/button";

const variants = {
  initial: { y: 25, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const Footer = () => {
  const MotionMagneticItem = motion.create(MagneticItem);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const socials = [
    {
      icon: <Github />,
      link: "https://github.com/finnformica",
    },
    {
      icon: <Linkedin />,
      link: "https://www.linkedin.com/in/finnformica/",
    },
    {
      icon: <Mail />,
      link: "mailto:hello@finnformica.com",
    },
    {
      icon: <Avatar rounded />,
      link: null,
    },
  ];

  return (
    <div className="flex grow flex-col bg-[var(--foreground)]">
      {/* Border Radius above CTA */}
      <div className="relative flex grow flex-col rounded bg-[var(--background)]">
        {/* Content */}
        <div className="container mx-auto flex grow flex-col">
          <CrosshairIcons className="h-20 sm:h-40" />

          <div className="flex grow flex-col px-8 sm:px-0 md:flex-row">
            {/* Text content */}
            <div className="flex grow flex-col gap-2 md:gap-6 md:pl-4">
              <span className="pb-0.5 text-xs text-gray-400 md:text-sm">
                Thank you, for checking out my site.
              </span>

              <StaggeredText className="gradient md:grow-0 md:text-xl">
                I hope my work has inspired you. Let's connect and explore
                exciting possibilities together.
              </StaggeredText>

              <Initials />
            </div>

            {/* Social content */}
            <div className="flex grow flex-col items-center justify-end gap-8 md:max-w-[200px] md:grow-0 md:items-end md:justify-between">
              <motion.div
                ref={ref}
                className="flex flex-row md:flex-col"
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                {socials.map((social, i) => (
                  <MotionMagneticItem
                    key={i}
                    variants={variants}
                    transition={{
                      duration: 0.25,
                      delay: i * 0.25,
                      ease: "easeInOut",
                    }}
                  >
                    {social.link ? (
                      <a href={social.link} target="_blank">
                        <Button size="icon" asChild={!social.link}>
                          {social.icon}
                        </Button>
                      </a>
                    ) : (
                      <Button size="icon" asChild={!social.link}>
                        {social.icon}
                      </Button>
                    )}
                  </MotionMagneticItem>
                ))}
              </motion.div>
              <StaggeredText
                staggerChildren={0.1}
                className="pb-0.5 text-center text-xs text-gray-200 md:whitespace-nowrap md:text-right md:text-sm"
              >
                Made by @finnformica using Next.js, Tailwind, Motion, and R3F
              </StaggeredText>
            </div>
          </div>
        </div>
        <Banner />
      </div>

      {/* CTA */}
      <div className="bg-[var(--foreground)] pb-1 pt-3">
        <Button
          size="default"
          className="w-full border-2 border-[var(--background)] bg-[var(--background)] text-base text-[var(--foreground)] hover:text-[var(--background)]"
        >
          Get in touch
        </Button>
      </div>
    </div>
  );
};

export default Footer;
