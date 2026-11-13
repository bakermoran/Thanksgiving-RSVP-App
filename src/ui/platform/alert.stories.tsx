import { Matrix, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

type Variant = NonNullable<React.ComponentProps<typeof Alert>["variant"]>;
type IconOption = "with icon" | "no icon";

const VARIANTS = keysOf<Variant>({ default: true, destructive: true });
const ICONS = keysOf<IconOption>({ "with icon": true, "no icon": true });

interface Args {
  variants: Variant[];
  icons: IconOption[];
  title: string;
  description: string;
  showTitle: boolean;
  showDescription: boolean;
}

const meta = {
  title: "Platform/Alert",
  args: {
    variants: VARIANTS,
    icons: ICONS,
    title: "Couldn't save event",
    description: "The start time must be before the end time.",
    showTitle: true,
    showDescription: true,
  },
  argTypes: {
    variants: { control: "check", options: VARIANTS },
    icons: { control: "check", options: ICONS },
    title: { control: "text" },
    description: { control: "text" },
    showTitle: { control: "boolean" },
    showDescription: { control: "boolean" },
  },
  render: ({
    variants,
    icons,
    title,
    description,
    showTitle,
    showDescription,
  }) => (
    <Matrix
      rows={pick(VARIANTS, variants)}
      cols={pick(ICONS, icons)}
      render={(variant, icon) => (
        <Alert variant={variant} className="w-96">
          {icon === "with icon" && <CircleAlert />}
          {showTitle && <AlertTitle>{title}</AlertTitle>}
          {showDescription && (
            <AlertDescription>{description}</AlertDescription>
          )}
        </Alert>
      )}
    />
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
