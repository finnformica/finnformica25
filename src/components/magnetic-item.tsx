import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const MagneticItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    setPosition({ x, y });
  };

  const onMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ ...position }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className={cn("my-auto", className)}
    >
      {children}
    </motion.div>
  );
};

export default MagneticItem;
