import { cn } from "cn";

export const NativeSelect = ({
  className,
  ...props
}: React.ComponentProps<"select">) => (
  <select
    data-slot="native-select"
    className={cn(
      "h-8 rounded-md border border-input bg-transparent px-2 text-sm shadow-xs transition-[color,box-shadow] outline-none",
      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
      "disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
      className,
    )}
    {...props}
  />
);
