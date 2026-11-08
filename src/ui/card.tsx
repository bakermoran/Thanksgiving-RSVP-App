import { cn } from "./cn";

type CardTilt = "none" | "left" | "right";

const tilts: Record<CardTilt, string> = {
  none: "",
  left: "-rotate-[0.6deg]",
  right: "rotate-[0.6deg]",
};

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  tilt?: CardTilt;
};

/** A taped-down recipe card. */
export const Card = ({
  tilt = "none",
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      className={cn(
        "paper-lines relative rounded-[2rem] border-4 border-bark bg-cream p-6 shadow-chunky sm:p-8",
        tilts[tilt],
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 -rotate-3 rounded-sm bg-mustard/70 shadow-sm"
      />
      {children}
    </div>
  );
};
