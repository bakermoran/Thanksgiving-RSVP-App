import { cn } from "@/ui/cn";

interface EventProgressProps {
  count: number;
  current: number;
}

export const EventProgress = ({ count, current }: EventProgressProps) => (
  <ol aria-hidden className="mb-4 flex items-center justify-center gap-2">
    {Array.from({ length: count }, (_, i) => (
      <li
        key={i}
        className={cn(
          "rounded-full border-3 border-bark transition",
          i < current && "size-4 bg-olive",
          i === current && "size-6 bg-pumpkin shadow-chunky-sm",
          i > current && "size-4 bg-cream",
        )}
      />
    ))}
  </ol>
);
