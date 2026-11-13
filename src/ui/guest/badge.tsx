import { cn } from "./cn";

export type BadgeVariant = "olive" | "cranberry" | "mustard" | "outline";

const variants: Record<BadgeVariant, string> = {
  olive: "bg-olive text-cream",
  cranberry: "bg-cranberry text-cream",
  mustard: "bg-mustard text-bark",
  outline: "border-dashed bg-cream text-cocoa",
};

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export const Badge = ({
  variant = "mustard",
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      {...props}
      className={cn(
        "shrink-0 rounded-full border-3 border-bark px-3 py-0.5 text-base font-bold",
        variants[variant],
        className,
      )}
    />
  );
};
