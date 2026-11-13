import { type Theme, useTheme } from "@/components/admin/theme";
import { Button } from "@/ui/platform/button";
import { cn } from "cn";
import { Monitor, Moon, Sun } from "lucide-react";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const satisfies ReadonlyArray<{
  value: Theme;
  label: string;
  icon: typeof Sun;
}>;

export const ThemeToggle = ({ className }: { className?: string }) => {
  const [theme, setTheme] = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center rounded-md border p-0.5",
        className,
      )}
    >
      {options.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          type="button"
          variant={theme === value ? "secondary" : "ghost"}
          size="icon-xs"
          aria-label={label}
          aria-pressed={theme === value}
          title={label}
          onClick={() => setTheme(value)}
        >
          <Icon />
        </Button>
      ))}
    </div>
  );
};
