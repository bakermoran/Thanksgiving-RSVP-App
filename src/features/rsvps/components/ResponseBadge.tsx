import { cn } from "@/utils/ui/cn";

export const ResponseBadge = ({
  isAttending,
}: {
  isAttending: boolean | undefined;
}) => {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border-3 border-bark px-3 py-0.5 text-base font-bold",
        isAttending === true && "bg-olive text-cream",
        isAttending === false && "bg-cranberry text-cream",
        isAttending === undefined && "border-dashed bg-cream text-cocoa",
      )}
    >
      {isAttending === undefined
        ? "No response"
        : isAttending
          ? "Attending"
          : "Not attending"}
    </span>
  );
};
