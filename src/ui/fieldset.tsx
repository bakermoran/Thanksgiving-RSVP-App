import { cn } from "./cn";

type FieldsetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend: React.ReactNode;
};

export const Fieldset = ({
  legend,
  className,
  children,
  ...props
}: FieldsetProps) => (
  <fieldset
    {...props}
    className={cn(
      "rounded-3xl border-3 border-bark bg-white/70 px-4 pt-2 pb-4 sm:px-5",
      className,
    )}
  >
    <legend className="-ml-1 rounded-full border-3 border-bark bg-mustard px-4 py-0.5 text-lg font-bold shadow-chunky-sm">
      {legend}
    </legend>
    {children}
  </fieldset>
);
