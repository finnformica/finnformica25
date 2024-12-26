import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type MagneticItemProps = {
  children: React.ReactNode;
  className?: string;
};

const MagneticItem = forwardRef(
  (
    { children, className }: MagneticItemProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useImperativeHandle(ref, () => innerRef.current!);

    const onMouseMove = (e: React.MouseEvent) => {
      if (!innerRef.current) return;

      const { clientX, clientY } = e;
      const { width, height, left, top } =
        innerRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      setPosition({ x, y });
    };

    const onMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.div
        ref={innerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={{ ...position }}
        transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
        className={cn("my-auto p-4", className)}
      >
        {children}
      </motion.div>
    );
  },
);

MagneticItem.displayName = "MagneticItem";

export default MagneticItem;
