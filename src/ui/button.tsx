import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base = [
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-3 border-bark transition-all duration-150",
  "hover:-translate-y-0.5",
  "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:rotate-0",
].join(" ");

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cranberry text-cream hover:bg-cranberry-dark disabled:hover:bg-cranberry",
  secondary:
    "bg-mustard text-bark hover:bg-pumpkin hover:text-cream disabled:hover:bg-mustard",
  ghost:
    "bg-cream text-cocoa hover:bg-parchment hover:text-cranberry disabled:hover:bg-cream",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-1 text-base font-bold shadow-chunky-sm",
  md: "px-5 py-1.5 font-bold shadow-chunky-sm",
  lg: "px-8 py-3 font-display text-2xl tracking-wide shadow-chunky hover:-rotate-1 active:rotate-0",
};

export interface ButtonVariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const buttonVariants = ({
  variant = "primary",
  size = "md",
}: ButtonVariantProps = {}) => cn(base, variants[variant], sizes[size]);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps;

export const Button = ({
  variant,
  size,
  type = "button",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
};
