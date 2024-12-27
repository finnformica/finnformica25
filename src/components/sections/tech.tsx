import { SectionTitle } from "@/components/text";
import { CrosshairIcons } from "@/components/icons/CrosshairIcon";

const Tech = () => {
  return (
    <div className="container mx-auto my-12 flex h-full flex-col">
      <div className="flex flex-col-reverse md:grow md:flex-row">
        <div className="md:w-1/2">content</div>
        <div className="md:w-1/2">
          <SectionTitle text="tech" />
        </div>
      </div>
      <CrosshairIcons className="items-end" />
    </div>
  );
};

export default Tech;
