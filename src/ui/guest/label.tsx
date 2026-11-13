import { cn } from "./cn";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className={cn("mb-1.5 block text-lg font-semibold text-cocoa", className)}
    />
  );
};
