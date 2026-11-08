import { cn } from "@/utils/ui/cn";
import {
  Link as BaseLink,
  LinkProps as BaseLinkProps,
} from "@tanstack/react-router";

interface LinkProps extends BaseLinkProps {
  className?: string;
}

export const Link = (props: LinkProps) => (
  <BaseLink
    {...props}
    className={cn(
      "inline-flex items-center gap-2 rounded-full border-3 border-bark bg-mustard px-5 py-1.5 font-bold shadow-chunky-sm transition hover:-translate-y-0.5 hover:bg-pumpkin hover:text-cream active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
      props.className,
    )}
  >
    {props.children}
  </BaseLink>
);
