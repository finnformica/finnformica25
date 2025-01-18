import { useState } from "react";

import Model from "@/components/3d-carousel";
import GameCard from "@/components/game-card";
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

const cards = [
  {
    url: "/projects/blockchange-img.png",
    title: "BlockChange",
    description: "A distributed crowdfunding platform for social causes",
    stack: ["Next.js", "Solidity"],
    link: "",
  },
  {
    url: "/projects/financial-dashboard-img.png",
    title: "Financial Dashboard",
    description:
      "A mock financial dashboard with charts and graphs and a grid layout",
    stack: ["Next.js", "Material-UI"],
    link: "",
  },
  {
    url: "/projects/gradguru.png",
    title: "Gradguru",
    description:
      "Gradguru is a platform that helps students navigate the application process for graduate programs",
    stack: ["Next.js", "Firebase", "Material-UI"],
    link: "",
  },
  {
    url: "/projects/lunaocean-img.png",
    title: "lunaocean",
    description: "An art portfolio website commissioned by an upcoming artist",
    stack: ["Next.js", "Tailwind CSS"],
    link: "",
  },
  {
    url: "/projects/matrix-effect.png",
    title: "Matrix Effect",
    description: "A JavaScript based Matrix Screen effect using HTML5 Canvas",
    stack: [],
    link: "",
  },
];

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
