import { cn } from "../../utils/ui/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

/** A taped-down recipe card. */
export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={cn(
        "paper-lines relative rounded-[2rem] border-4 border-bark bg-cream p-6 shadow-chunky sm:p-8",
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
