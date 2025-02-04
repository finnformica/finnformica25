import { motion } from "motion/react";
import { outerSans } from "@/fonts";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Marquee } from "./marquee";

export const Avatar = ({
  className,
  rounded,
}: {
  className?: string;
  rounded: boolean;
}) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    variants={{
      initial: { scale: 0 },
      animate: { scale: 1 },
    }}
    className={cn("relative rounded-full", className)}
  >
    <Image
      src="/images/finnformica-logo.png"
      alt="logo"
      fill
      sizes="160px"
      style={{ objectFit: "cover", borderRadius: rounded ? "50%" : "0%" }}
      priority
    />
  </motion.div>
);

export const Initials = () => (
  <h1 className={`${outerSans.className} text-2xl font-bold tracking-tightest`}>
    ff
  </h1>
);

export const Banner = ({
  className,
  innerClassName,
}: {
  className?: string;
  innerClassName?: string;
}) => (
  <Marquee numberOfCopies={3} className={className}>
    <h1
      className={cn(
        `${outerSans.className} mb-[-12px] text-nowrap text-8xl font-black text-[var(--foreground)] sm:mb-[-16px] sm:text-9xl lg:mb-[-24px] lg:text-10xl`,
        innerClassName,
      )}
    >
      finn formica
    </h1>
  </Marquee>
);
