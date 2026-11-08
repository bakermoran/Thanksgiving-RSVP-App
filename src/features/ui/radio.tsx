import { cn } from "../../utils/ui/cn";

type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Radio = ({ className, ...props }: RadioProps) => {
  return (
    <input
      {...props}
      type="radio"
      className={cn(
        "size-6 shrink-0 cursor-pointer appearance-none rounded-full border-3 border-bark bg-white transition",
        "checked:bg-mustard checked:shadow-[inset_0_0_0_3px_white]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard",
        className,
      )}
    />
  );
};
