import { cn } from "./cn";
import { Illustration, type IllustrationName } from "./illustration";
import { Radio } from "./radio";

type RadioCardTone = "olive" | "cranberry";

const tones: Record<RadioCardTone, string> = {
  olive: "has-checked:bg-olive",
  cranberry: "has-checked:bg-cranberry",
};

type RadioCardProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label: React.ReactNode;
  tone: RadioCardTone;
  icon?: IllustrationName;
};

export const RadioCard = ({
  label,
  tone,
  icon,
  className,
  ...props
}: RadioCardProps) => (
  <label
    className={cn(
      "group flex cursor-pointer items-center gap-3 rounded-2xl border-3 border-bark bg-cream px-4 py-3 text-lg font-semibold shadow-chunky-sm transition",
      "hover:-translate-y-0.5 hover:bg-parchment",
      "has-checked:translate-x-0.5 has-checked:translate-y-0.5 has-checked:text-cream has-checked:shadow-none",
      "has-focus-visible:ring-4 has-focus-visible:ring-mustard",
      "has-disabled:cursor-not-allowed has-disabled:opacity-80 has-disabled:hover:translate-y-0 has-disabled:hover:bg-cream",
      tones[tone],
      className,
    )}
  >
    <Radio {...props} />
    <span className="flex-1">{label}</span>
    {icon && (
      <Illustration
        name={icon}
        className="h-9 group-has-checked:motion-safe:animate-bob"
      />
    )}
  </label>
);
