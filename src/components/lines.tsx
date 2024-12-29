import { cn } from "@/lib/utils";

const points = (orientation: string) => {
  switch (orientation) {
    case "h":
      return { x1: 0, x2: 100, y1: 50, y2: 50 };
    case "v":
      return { x1: 50, x2: 50, y1: 0, y2: 100 };
    case "tr":
    case "bl":
      return { x1: 100, x2: 0, y1: 0, y2: 100 };
    case "tl":
    case "br":
      return { x1: 100, x2: 0, y1: 100, y2: 0 };
    default:
      return { x1: 0, x2: 0, y1: 0, y2: 0 };
  }
};

const dims = (orientation: string) => {
  switch (orientation) {
    case "h":
      return { width: "100%", height: "1px" };
    case "v":
      return { width: "1px", height: "100%" };
    case "tr":
    case "bl":
    case "tl":
    case "br":
      return { width: "100%", height: "100%" };
    default:
      return { width: "0", height: "0" };
  }
};

export const WireframeLine = ({
  orientation,
  className,
}: {
  orientation: string;
  className?: string;
}) => {
  const { x1, x2, y1, y2 } = points(orientation);
  const { width, height } = dims(orientation);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("max-w-screen absolute z-0 max-h-screen", className)}
    >
      <line
        {...{ x1, x2, y1, y2 }}
        vectorEffect="non-scaling-stroke"
        stroke="rgba(139, 139, 139, 0.2)"
      />
    </svg>
  );
};

export const VerticalLines = () => (
  <>
    <WireframeLine
      orientation="v"
      className="left-[calc(75%)] hidden md:block"
    />
    <WireframeLine
      orientation="v"
      className="left-[calc(75%_+_8px)] hidden md:block"
    />

    <WireframeLine
      orientation="v"
      className="left-[calc(25%)] hidden md:block"
    />
    <WireframeLine
      orientation="v"
      className="left-[calc(25%_-_8px)] hidden md:block"
    />

    <WireframeLine orientation="v" className="left-[15px]" />
    <WireframeLine orientation="v" className="left-[calc(100%_-_15px)]" />
  </>
);

export const CrossedLines = () => (
  <>
    <WireframeLine orientation="tr" className="md:-translate-x-1/4" />
    <WireframeLine orientation="tl" className="md:-translate-x-1/4" />
  </>
);
