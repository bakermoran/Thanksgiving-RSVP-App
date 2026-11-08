import { cn } from "../../utils/ui/cn";

type AlertProps = React.HTMLAttributes<HTMLParagraphElement>;

export const Alert = ({ className, children, ...props }: AlertProps) => {
  return (
    <p
      role="alert"
      {...props}
      className={cn(
        "flex items-start gap-2 rounded-2xl border-3 border-cranberry bg-red-50 px-4 py-3 font-semibold text-cranberry",
        className,
      )}
    >
      <span aria-hidden className="text-xl leading-none">
        🦃
      </span>
      <span>{children}</span>
    </p>
  );
};

/** Inline error under a single field. */
export const fieldErrorClass = "mt-1.5 text-sm font-semibold text-cranberry";
