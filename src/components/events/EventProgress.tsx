import type { Event } from "@/shared/types";
import { cn } from "@/ui/guest/cn";

interface EventProgressProps {
  events: Event[];
  current: number;
  onProgressButtonClick: (id: number) => void;
}

export const EventProgress = ({
  events,
  current,
  onProgressButtonClick,
}: EventProgressProps) => (
  <ol aria-hidden className="mb-4 flex items-center justify-center gap-2">
    {events.map((event, i) => (
      <li
        key={event.id}
        className={cn(
          "rounded-full border-3 border-bark transition hover:cursor-pointer",
          i < current && "size-4 bg-olive",
          i === current && "size-6 bg-pumpkin shadow-chunky-sm",
          i > current && "size-4 bg-cream",
        )}
        onClick={() => onProgressButtonClick(event.id)}
      />
    ))}
  </ol>
);
