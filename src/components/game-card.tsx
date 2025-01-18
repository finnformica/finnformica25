import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { CardProps } from "./3d-carousel/card-item";

type GameCardProps = {
  active: number | undefined;
  setActive: (value: number | undefined) => void;
  project: CardProps | undefined;
};

const GameCard = ({ active, setActive, project }: GameCardProps) => {
  if (!project) return null;

  return (
    <Dialog
      open={active !== undefined}
      onOpenChange={() => setActive(undefined)}
    >
      <DialogContent>
        <div className="relative">
          <div className="absolute left-[50%] top-[50%] z-50 grid h-[600px] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded border bg-[var(--background)] p-6 shadow-lg md:w-96">
            <DialogHeader>
              <DialogTitle>{project?.title}</DialogTitle>
              <DialogDescription>{project?.description}</DialogDescription>
            </DialogHeader>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameCard;
