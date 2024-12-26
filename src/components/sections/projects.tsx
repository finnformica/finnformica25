import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { VerticalLines } from "@/components/lines";
import { SectionTitle } from "@/components/text";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";

const getStyles = (active: number, index: number) => {
  if (active === index)
    return {
      opacity: 1,
      transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
      zIndex: 10,
    };
  else if (active - 1 === index)
    return {
      opacity: 1,
      transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
      zIndex: 9,
    };
  else if (active + 1 === index)
    return {
      opacity: 1,
      transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
      zIndex: 9,
    };
  else if (active - 2 === index)
    return {
      opacity: 1,
      transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
      zIndex: 8,
    };
  else if (active + 2 === index)
    return {
      opacity: 1,
      transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
      zIndex: 8,
    };
  else if (index < active - 2)
    return {
      opacity: 0,
      transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
      zIndex: 7,
    };
  else if (index > active + 2)
    return {
      opacity: 0,
      transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
      zIndex: 7,
    };
};

const Projects = () => {
  const numProjects = 10;
  const [activeSlide, setactiveSlide] = useState(0);

  const next = () =>
    activeSlide < numProjects - 1 && setactiveSlide(activeSlide + 1);

  const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);

  const renderFooter = () => (
    <div className="container mx-auto flex flex-col items-center gap-8 p-4 md:h-20 md:flex-row md:gap-0">
      <div className="hidden basis-1/4 md:block" />
      <div className="flex w-full flex-row justify-between md:w-auto md:basis-1/2 md:justify-around">
        <CrosshairIcon />
        <CrosshairIcon />
      </div>

      <div className="flex flex-row justify-center gap-12 md:basis-1/4 md:gap-4">
        <Button variant="outline" size="icon" onClick={prev}>
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon" onClick={next}>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <VerticalLines />
      <div className="container mx-auto">
        <SectionTitle text="projects" />
      </div>
      <div className="no-scrollbar relative flex grow flex-row items-center justify-center gap-8 overflow-x-scroll pt-8">
        {[...Array(numProjects).keys()].map((key) => (
          <div
            key={key}
            style={{
              ...getStyles(activeSlide, key),
              boxShadow: `0 0 20px #FFF`,
            }}
            className="absolute top-0 transition-all"
          >
            <ProjectCard key={key} />
          </div>
        ))}
      </div>

      {renderFooter()}
    </>
  );
};

export default Projects;
