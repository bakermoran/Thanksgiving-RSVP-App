import { useState } from "react";

import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base = [
  "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-3 border-bark transition-all duration-150",
  "hover:-translate-y-0.5",
  "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mustard",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:rotate-0",
  "aria-busy:cursor-wait aria-busy:opacity-100",
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

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> &
  ButtonVariantProps & {
    loading?: boolean;
    onClick?: (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => void | Promise<unknown>;
  };

export const Button = ({
  variant,
  size,
  type = "button",
  className,
  loading = false,
  disabled,
  onClick,
  children,
  ...props
}: ButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const isLoading = loading || isPending;

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const result = onClick?.(event);
    if (!(result instanceof Promise)) return;
    setIsPending(true);
    try {
      await result;
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type={type}
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2",
          isLoading && "opacity-0",
        )}
      >
        {children}
      </span>
      {isLoading && (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="size-[1em] animate-spin rounded-full border-2 border-current border-t-transparent" />
        </span>
      )}
    </button>
  );
};
