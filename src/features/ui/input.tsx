import { cn } from "./cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl border-3 border-bark bg-white px-4 py-3 text-lg text-bark shadow-chunky-sm transition placeholder:text-cocoa/50",
        "focus:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-mustard",
        "aria-invalid:border-cranberry aria-invalid:bg-red-50",
        className,
      )}
    />
  );
};
