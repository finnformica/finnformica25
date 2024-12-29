import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Avatar, Banner, Initials } from "@/components/branding";
import { CrosshairIcons } from "@/components/icons/CrosshairIcon";
import Github from "@/components/icons/github";
import Linkedin from "@/components/icons/linkedin";
import Mail from "@/components/icons/mail";
import MagneticItem from "@/components/magnetic-item";
import { Button } from "@/components/ui/button";
import { StaggeredText } from "../text";

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
    <div className="flex h-full flex-col bg-[var(--foreground)]">
      {/* Border Radius above CTA */}
      <div className="relative flex grow flex-col rounded bg-[var(--background)]">
        {/* Content */}
        <div className="container mx-auto flex grow flex-col">
          <CrosshairIcons />

          <div className="flex grow flex-col px-8 sm:px-0 md:flex-row">
            {/* Text content */}
            <div className="flex grow flex-col gap-2 md:gap-6 md:pl-4">
              <span className="pb-0.5 text-xs text-gray-400 md:text-sm">
                Thank you, for checking out my site.
              </span>

              <p className="bg-gradient-to-r from-gray-600 to-white to-25% bg-clip-text text-transparent md:grow-0 md:text-xl">
                I hope my work has inspired you and I&apos;d love to hear from
                you. Let&apos;s connect and explore incredible possibilities
                together.
              </p>

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
                      duration: 1,
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
              <StaggeredText className="pb-0.5 text-center text-sm text-gray-200 md:whitespace-nowrap md:text-right">
                Made by @finnformica, designed by @synchronize
              </StaggeredText>
            </div>
          </div>
        </div>
        <Banner className="mb-[-12px] sm:mb-[-16px] lg:mb-[-24px]" />
      </div>

      {/* CTA */}
      <div className="bg-[var(--foreground)] pb-1 pt-3">
        <Button size="default" className="w-full cursor-pointer">
          Get in touch
        </Button>
      </div>
    </div>
  );
};

export default Footer;
