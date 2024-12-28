import { SectionTitle } from "@/components/text";
import { CrosshairIcons } from "@/components/icons/CrosshairIcon";

const NUM_ROWS = 5;
const NUM_COLS = 4;

const Tech = () => {
  const height = 60;
  const width = 60;
  const gap = 1;

  const gridHeight = NUM_ROWS * height + (NUM_ROWS + 1) * gap;
  const gridWidth = NUM_COLS * width + (NUM_COLS + 1) * gap;

  return (
    <div className="container mx-auto my-12 flex h-full flex-col">
      <div className="flex flex-col-reverse md:grow md:flex-row">
        <div className="md:w-1/2">
          <div
            className={`grid h-[${gridHeight}px] w-[${gridWidth}px] grid-cols-${NUM_COLS} grid-rows-${NUM_ROWS} aspect-square gap-[${gap}px] bg-divider p-[${gap}px]`}
          >
            {[...Array(NUM_ROWS * NUM_COLS).keys()].map((_, i) => (
              <div
                key={i}
                className={`aspect-square bg-[var(--background)] transition-all hover:drop-shadow-[0px_0px_2px_rgba(255,255,255,1)]`}
              >
                {i}
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <SectionTitle text="tech" />
        </div>
      </div>
      <CrosshairIcons className="items-end" />
    </div>
  );
};

export default Tech;
