import { cn } from "@/lib/utils";

const ProjectCard = ({
  className,
  style,
}: {
  className?: string;
  style?: { [key: string]: unknown };
}) => {
  return (
    <div
      className={cn(
        "border-1 border-divider-light z-10 min-h-[600px] min-w-[350px] max-w-[350px] rounded bg-black",
        className,
      )}
      style={style}
    >
      <h1>ProjectCard</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
};

export default ProjectCard;
