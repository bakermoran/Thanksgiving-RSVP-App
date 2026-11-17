import { Badge } from "@/ui/platform/badge";
import { cn } from "cn";
import { ChevronDown } from "lucide-react";
import { type ComponentProps, type ReactNode } from "react";

interface BadgeSelectProps {
  label: ReactNode;
  variant?: ComponentProps<typeof Badge>["variant"];
  className?: string;
  ariaLabel: string;
  value: string;
  isPending: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
}

export const BadgeSelect = ({
  label,
  variant,
  className,
  ariaLabel,
  value,
  isPending,
  onChange,
  children,
}: BadgeSelectProps) => (
  <Badge
    variant={variant}
    className={cn(
      "relative cursor-pointer focus-within:ring-[3px] focus-within:ring-ring/50",
      isPending && "opacity-60",
      className,
    )}
  >
    {label}
    <ChevronDown />
    <select
      aria-label={ariaLabel}
      value={value}
      disabled={isPending}
      onChange={(e) => onChange(e.target.value)}
      className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-wait"
    >
      {children}
    </select>
  </Badge>
);
