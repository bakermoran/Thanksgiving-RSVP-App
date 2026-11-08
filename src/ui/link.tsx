import { createLink } from "@tanstack/react-router";

import { type ButtonVariantProps, buttonVariants } from "./button";
import { cn } from "./cn";

const textLink =
  "inline-flex items-center gap-1 font-bold text-cocoa underline decoration-pumpkin decoration-wavy decoration-2 underline-offset-6 hover:text-cranberry";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  ref?: React.Ref<HTMLAnchorElement>;
} & (
    | {
        variant?: ButtonVariantProps["variant"];
        size?: ButtonVariantProps["size"];
      }
    | { variant: "text"; size?: never }
  );

const Anchor = ({
  variant = "secondary",
  size,
  className,
  ...props
}: AnchorProps) => (
  <a
    {...props}
    className={cn(
      variant === "text" ? textLink : buttonVariants({ variant, size }),
      className,
    )}
  />
);

export const Link = createLink(Anchor);
