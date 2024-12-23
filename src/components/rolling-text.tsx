import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const RollingText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [rollingText, setRollingText] = useState(text);
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    handleMouseEnter();
  }, []);

  const handleMouseEnter = () => {
    if (rolling) return;

    let iter = 0;

    setRolling(true);
    const interval = setInterval(() => {
      if (iter >= text.length) {
        setRolling(false);
        clearInterval(interval);
      }

      const newText = text
        .split("")
        .map((char, index) => {
          if (index < iter) return char;

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      setRollingText(newText);
      iter += 1 / 3;
    }, 30);
  };

  return (
    <p
      onMouseEnter={handleMouseEnter}
      className={cn("z-10 break-words", className)}
    >
      {rollingText}
    </p>
  );
};
