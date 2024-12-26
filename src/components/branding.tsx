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
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={cn("relative rounded-full", className)}
  >
    <Image
      src="/finnformica-logo.png"
      alt="logo"
      fill
      sizes="100vw"
      style={{ objectFit: "cover", borderRadius: rounded ? "50%" : "0%" }}
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
  <Marquee pauseOnHover numberOfCopies={3} className={className}>
    <h1
      className={cn(
        `${outerSans.className} text-nowrap text-8xl font-black text-white sm:text-9xl lg:text-10xl`,
        innerClassName,
      )}
    >
      finn formica
    </h1>
  </Marquee>
);
