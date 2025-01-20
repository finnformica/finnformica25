import { useState } from "react";

import Model from "@/components/3d-carousel";
import { cards } from "@/components/3d-carousel/cards";
import GameCard from "@/components/3d-carousel/game-card";
import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { VerticalLines } from "@/components/lines";

const Footer = () => (
  <div className="container mx-auto flex flex-col items-center gap-8 p-4 md:h-20 md:flex-row md:gap-0">
    <div className="hidden basis-1/4 md:block" />
    <div className="flex w-full flex-row justify-between md:w-auto md:basis-1/2 md:justify-around">
      <CrosshairIcon />
      <CrosshairIcon />
    </div>
    <div className="hidden basis-1/4 md:block" />
  </div>
);

const Projects = () => {
  const [active, setActive] = useState<number | undefined>(undefined);
  const project = active !== undefined ? cards[active] : undefined;

  return (
    <>
      <VerticalLines />

      <Model active={active} setActive={setActive} cards={cards} />
      <GameCard active={active} setActive={setActive} project={project} />

      <Footer />
    </>
  );
};

export default Projects;
