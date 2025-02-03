"use client";

import { createContext, useContext, useEffect, useState } from "react";

import useMousePosition from "@react-hook/mouse-position";
import { motion } from "motion/react";

import { getRootStyle } from "@/lib/utils";

export type CursorVariant = "default" | "project" | "rotate" | "hidden";

export type CursorContextType = {
  cursorText: string;
  setCursorText: (text: string) => void;
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
  mouseXPosition: number;
  mouseYPosition: number;
};

export const CustomCursor = createContext<CursorContextType | null>(null);

const CustomCursorProvider = ({
  children,
  containerRef,
}: {
  children: React.ReactNode;
  containerRef: any;
}) => {
  const [textFill, setTextFill] = useState<string | undefined>();
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  const mouse = useMousePosition(containerRef, {
    enterDelay: 100,
    leaveDelay: 100,
  });

  let mouseXPosition = 0;
  let mouseYPosition = 0;

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX!;
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY!;
  }

  useEffect(() => {
    setTextFill(getRootStyle("--foreground", document));
  }, []);

  const variants = {
    project: {
      opacity: 1,
      backgroundColor: "#fff",
      color: "#000",
      height: 50,
      width: 50,
      fontSize: "12px",
      x: mouseXPosition - 20,
      y: mouseYPosition - 20,
    },
    rotate: {
      opacity: 1,
      backgroundColor: "transparent",
      height: 75,
      width: 75,
      scale: 1,
      fontSize: "18px",
      x: mouseXPosition - 45,
      y: mouseYPosition - 45,
      transition: {
        type: "spring",
        mass: 0.1,
        damping: 10,
        stiffness: 100,
      },
    },
    default: {
      display: "none",
      scale: 0,
      x: mouseXPosition,
      y: mouseYPosition,
    },
  };

  const value = {
    cursorText,
    setCursorText,
    cursorVariant,
    setCursorVariant,
    mouseXPosition,
    mouseYPosition,
  };

  return (
    <CustomCursor.Provider value={value}>
      <motion.div
        variants={variants}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[10px] w-[10px] rounded-full"
        animate={cursorVariant}
      >
        {cursorVariant === "rotate" ? (
          <svg
            width="100"
            height="100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin-slow"
          >
            <path
              id="curve"
              d="M 100,100 m75,0 a75,75 0 1,0 -150,0 a 75,75 0 1,0  150,0"
              className="scale-50"
            />
            <text
              fill={textFill}
              fontSize="12px"
              style={{ letterSpacing: "0.1em" }}
            >
              {[...Array(3)].map((_, i) => (
                <textPath
                  xlinkHref="#curve"
                  startOffset={`${(i * 100) / 3}%`}
                  letter-spacing="2"
                >
                  {cursorText}
                </textPath>
              ))}
            </text>
          </svg>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="pointer-events-none text-inherit">
              {cursorText}
            </span>
          </div>
        )}
      </motion.div>

      {children}
    </CustomCursor.Provider>
  );
};

export const useCustomCursor = () => {
  const context = useContext(CustomCursor);
  if (context === undefined) {
    throw new Error("useCustomCursor was used outside of CustomCursorProvider");
  }

  return context as CursorContextType;
};

export default CustomCursorProvider;
