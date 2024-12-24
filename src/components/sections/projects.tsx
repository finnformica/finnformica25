import { SectionTitle } from "@/components/text";
import { CrosshairIcon } from "@/components/icons/CrosshairIcon";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Projects = () => {
  const renderFooter = () => (
    <div className="flex flex-row">
      <div className="basis-1/4" />
      <div className="flex basis-1/2 flex-row justify-around">
        <CrosshairIcon />
        <CrosshairIcon />
      </div>

      <div className="flex basis-1/4 flex-row justify-center gap-4">
        <Button variant="outline" size="icon">
          <ArrowLeft />
        </Button>
        <Button variant="outline" size="icon">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
  return (
    <div className="container mx-auto flex h-full w-full flex-col">
      <SectionTitle text="projects" />

      <div className="grow">content</div>

      {renderFooter()}
    </div>
  );
};

export default Projects;
