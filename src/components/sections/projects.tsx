"use client";

import { useEffect, useState } from "react";

import Model from "@/components/3d-carousel";
import { cards } from "@/components/3d-carousel/cards";
import GameCard from "@/components/3d-carousel/game-card";
import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { VerticalLines } from "@/components/lines";
import { useIsScreenSm } from "@/hooks/useMediaQuery";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

const Projects = () => {
  const isScreenSm = useIsScreenSm();

  const [isClient, setIsClient] = useState(false);
  const [active, setActive] = useState<number | undefined>(undefined);

  const project = active !== undefined ? cards[active] : undefined;

  const handleNext = () => {
    if (active === undefined) return;

    setActive((active + 1) % cards.length);
  };

  const handlePrev = () => {
    if (active === undefined) return;

    setActive((active - 1 + cards.length) % cards.length);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <VerticalLines />

      <div
        className="relative grow"
        style={!isScreenSm ? { height: window.innerHeight - 100 } : {}} // Set height on mobile devices to allow canvas to grow
      >
        <Model active={active} setActive={setActive} cards={cards} />
      </div>

      <GameCard
        active={active}
        setActive={setActive}
        project={project}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />

      <div className="container mx-auto flex flex-col items-center gap-8 p-4 md:h-20 md:flex-row md:gap-0">
        <div className="hidden basis-1/4 md:block" />
        <div className="flex w-full flex-row items-center justify-between md:w-auto md:basis-1/2 md:justify-around">
          <CrosshairIcon />
          {!isScreenSm && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection("#info")}
              >
                <ArrowUp />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => scrollToSection("#tech")}
              >
                <ArrowDown />
              </Button>
            </div>
          )}
          <CrosshairIcon />
        </div>
        <div className="hidden basis-1/4 md:block" />
      </div>
    </>
  );
};

export default Projects;
