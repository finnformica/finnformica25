import { ArrowLeft, ArrowRight, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supplyMono } from "@/fonts";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import { CardProps } from "./card-item";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

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
      "rounded-full border border-[var(--foreground)] px-4 py-0.5 text-sm transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)]",
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
  handleNext: () => void;
  handlePrev: () => void;
};

const GameCard = ({
  active,
  setActive,
  project,
  handleNext,
  handlePrev,
}: GameCardProps) => {
  const isScreenXs = useMediaQuery("(min-width: 470px)");

  const bgGradientColors =
    "from-[rgba(200,200,200,0.15)] to-[rgba(200,200,200,0)]";
  const bgGradientTr = `bg-gradient-to-tr ${bgGradientColors}`;
  const bgGradientBr = `bg-gradient-to-br ${bgGradientColors}`;

  // Clip paths for header, footer, and description
  // Tab angle is 35px across (x) and 25px up (y)
  const headerClipPath =
    "[clip-path:polygon(0_0,_0_100%,_130px_100%,_165px_43px,_100%_43px,_100%_0)]";
  const imgClipPath =
    "[clip-path:polygon(0_25px,_133px_25px,_168px_0,_100%_0,_100%_183px,_215px_183px,_180px_100%,_0_100%)]"; // assumed height of 208px from h-52
  const footerClipPath =
    "[clip-path:polygon(0_0,_0_100%,_100%_100%,_100%_25px,_30%_25px,_21%_0)]";

  if (!project) return null;

  return (
    <Dialog
      open={active !== undefined}
      onOpenChange={() => setActive(undefined)}
    >
      <DialogContent
        className={`${supplyMono.className} min-h-[600px] w-[80%] p-0 sm:w-96`}
        aria-describedby={project.description}
      >
        {/* Wrapper for content positioning */}
        <div className="relative">
          {/* Content container and border */}
          <div className="absolute left-[50%] top-[50%] z-[100] flex h-full w-full translate-x-[-50%] translate-y-[-50%] flex-col gap-3 rounded border border-[var(--foreground)] bg-[var(--background)] p-6 shadow-lg">
            {/* Title / Header */}
            <DialogHeader
              className={`rounded-t px-2 py-1 text-left ${bgGradientBr} ${headerClipPath}`}
            >
              <DialogTitle className="tracking-wider md:text-2xl">
                {project.title}
              </DialogTitle>
              <DialogTitle className="pb-0.5 text-xs font-light text-muted-foreground md:text-sm">
                {project.subtitle}
              </DialogTitle>
            </DialogHeader>

            {/* Image */}
            <div
              className={`h-52 w-full bg-cover bg-center ${imgClipPath} mt-[-32px]`}
              style={{
                backgroundImage: `url('${project.image}')`, // Tailwind throws an error if this is not in style
              }}
            />

            {/* Description */}
            <div className="mt-[-34px] grow bg-[var(--background)]">
              <p className="pb-3 text-right text-sm sm:text-lg">
                {isScreenXs ? "Description" : "Desc"}
              </p>
              <DialogDescription className="text-xs md:text-base">
                {project.description}
              </DialogDescription>
            </div>
            {/* Stack / Footer */}
            <div
              className={`flex flex-col gap-3 rounded-b px-3 py-1 ${footerClipPath} ${bgGradientTr}`}
            >
              <p className="pb-2 text-sm sm:text-lg">Stack</p>
              <div className="flex justify-between">
                {project.stack.map((item) => (
                  <p
                    key={item}
                    className="text-sm text-muted-foreground md:text-base"
                  >
                    {item}
                  </p>
                ))}
              </div>

              <div className="mb-2 flex justify-evenly">
                {project.github !== undefined && (
                  <ChipLink href={project.github}>GitHub</ChipLink>
                )}

                {project.source !== undefined && (
                  <ChipLink href={project.source}>Source</ChipLink>
                )}
              </div>
            </div>
          </div>

          <DialogClose className="not-focus-visible absolute bottom-0 left-[50%] z-[100] translate-x-[-50%] translate-y-[50%]">
            <Button
              variant="outline"
              size="icon"
              className="bg-[var(--background)]"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>

          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 top-[50%] z-[100] translate-x-[-50%] translate-y-[-50%] bg-[var(--background)] sm:translate-x-[-150%]"
          >
            <ArrowLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 top-[50%] z-[100] translate-x-[50%] translate-y-[-50%] bg-[var(--background)] sm:translate-x-[150%]"
          >
            <ArrowRight />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameCard;
