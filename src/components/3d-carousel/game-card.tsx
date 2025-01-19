import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supplyMono } from "@/fonts";
import { cn } from "@/lib/utils";

import { CardProps } from "./card-item";

const ChipLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    className={cn(
      "rounded-full border px-4 py-0.5 transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)]",
      className,
    )}
  >
    {children}
  </a>
);

type GameCardProps = {
  active: number | undefined;
  setActive: (value: number | undefined) => void;
  project: CardProps | undefined;
};

const GameCard = ({ active, setActive, project }: GameCardProps) => {
  const bgGradientColors =
    "from-[rgba(168,168,168,0.15)] to-[rgba(168,168,168,0)]";
  const bgGradientTr = `bg-gradient-to-tr ${bgGradientColors}`;
  const bgGradientBr = `bg-gradient-to-br ${bgGradientColors}`;

  // Clip paths for header, footer, and description
  // Tab angle is 35px across (x) and 25px up (y)
  const headerClipPath =
    "[clip-path:polygon(0_0,_0_100%,_130px_100%,_165px_43px,_100%_43px,_100%_0)]";
  const imgClipPath =
    "[clip-path:polygon(0_25px,_133px_25px,_168px_0,_100%_0,_100%_100%,_0_100%)]"; // assumed height of 208px from h-52
  const descClipPath =
    "[clip-path:polygon(0_25px,_180px_25px,_215px_0,_100%_0,_100%_100%,_0_100%)]";
  const footerClipPath =
    "[clip-path:polygon(0_0,_0_100%,_100%_100%,_100%_25px,_30%_25px,_21%_0)]";

  if (!project) return null;

  console.log(project.image);

  return (
    <Dialog
      open={active !== undefined}
      onOpenChange={() => setActive(undefined)}
    >
      <DialogContent className={supplyMono.className}>
        {/* Wrapper for content positioning */}
        <div className="relative">
          {/* Content container and border */}
          <div className="absolute left-[50%] top-[50%] z-50 flex h-[50vh] min-h-[600px] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col gap-3 rounded border bg-[var(--background)] p-6 shadow-lg sm:w-96">
            {/* Title / Header */}
            <DialogHeader
              className={`px-2 py-1 text-left ${bgGradientBr} ${headerClipPath}`}
            >
              <DialogTitle className="text-2xl tracking-wider">
                {project.title}
              </DialogTitle>
              <DialogTitle className="pb-0.5 text-sm font-light text-muted-foreground">
                For Charities
              </DialogTitle>
            </DialogHeader>
            {/* Image */}
            <div
              className={`h-52 w-full rounded bg-[url('/projects/gradguru.png')] bg-cover bg-center object-contain ${imgClipPath} mt-[-32px]`}
            />

            {/* Description */}
            <div
              className={`grow ${descClipPath} mt-[-34px] bg-[var(--background)]`}
            >
              <p className="pb-3 text-right text-lg">Description</p>
              <p>{project.description}</p>
            </div>
            {/* Stack / Footer */}
            <div
              className={`flex flex-col gap-3 px-3 py-1 ${footerClipPath} ${bgGradientTr}`}
            >
              <p className="pb-2 text-lg text-muted-foreground">Stack</p>
              <div className="flex justify-between">
                {project.stack.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>

              <div className="mb-2 flex justify-evenly">
                {project.github !== undefined && (
                  <ChipLink href={project.github}>GitHub</ChipLink>
                )}

                {project.link !== undefined && (
                  <ChipLink href={project.link}>Source</ChipLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameCard;
