import { cn } from "./cn";

export type IllustrationName =
  | "acorn"
  | "drumstick"
  | "maple-leaf"
  | "oak-leaf"
  | "pie"
  | "pumpkin"
  | "turkey";

type IllustrationProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> & {
  name: IllustrationName;
  animate?: "wobble" | "bob";
};

const animations = {
  wobble: "motion-safe:animate-wobble",
  bob: "motion-safe:animate-bob",
};

export const Illustration = ({
  name,
  animate,
  className,
  ...props
}: IllustrationProps) => (
  <img
    {...props}
    src={`/images/${name}.svg`}
    alt=""
    aria-hidden
    className={cn(animate && animations[animate], className)}
  />
);
