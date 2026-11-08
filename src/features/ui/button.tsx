import { cn } from "../../utils/ui/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-3 border-bark bg-cranberry px-8 py-3 font-display text-2xl tracking-wide text-cream shadow-chunky transition-all duration-150",
        "hover:-translate-y-0.5 hover:-rotate-1 hover:bg-cranberry-dark",
        "active:translate-x-[3px] active:translate-y-[3px] active:rotate-0 active:shadow-none",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:rotate-0 disabled:hover:bg-cranberry",
        className,
      )}
    />
  );
};
