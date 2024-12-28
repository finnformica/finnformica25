import { CrosshairIcons } from "@/components/icons/CrosshairIcon";
import { SectionTitle } from "@/components/text";

import Github from "../icons/github";

const Tech = () => {
  const content = [
    { caption: "Front End", icon: null },
    { caption: "Back End", icon: null },
    { caption: "Machine Learning", icon: null },
    { caption: "Blockchain", icon: null },
    { caption: "Cloud Computing", icon: null },
    { caption: "User Experience", icon: null },
    { caption: "Web Design", icon: null },
    { caption: "Product & Innovation", icon: null },
    { caption: "Web Design", icon: null },
  ];

  return (
    <div className="container mx-auto my-12 flex h-full flex-col">
      <div className="flex grow flex-col-reverse md:flex-row">
        <div className="md:w-1/2">
          {/* Grid container / parent */}
          <div className="grid grid-cols-3">
            {content.map((item, i) => (
              // Grid item / child
              <div
                key={i}
                className="col-span-1 row-span-1 flex aspect-square cursor-pointer flex-col items-center justify-between gap-2 p-2 text-center shadow-[0_0_1px_0_var(--foreground)] transition-all ease-in hover:drop-shadow-[0_0_2px_var(--foreground)]"
              >
                {/* Container to center icon */}
                <div className="flex grow items-center">
                  <Github />
                </div>
                <p className="text-sm">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Text container */}
        <div className="md:w-1/2">
          <SectionTitle text="tech" />
        </div>
      </div>

      <CrosshairIcons className="items-end" />
    </div>
  );
};

export default Tech;
