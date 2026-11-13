import { Matrix, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { type IllustrationName } from "./illustration";
import { RadioCard } from "./radio-card";

type Tone = React.ComponentProps<typeof RadioCard>["tone"];
type State = "unchecked" | "checked" | "disabled";

const TONES = keysOf<Tone>({ olive: true, cranberry: true });
const STATES = keysOf<State>({
  unchecked: true,
  checked: true,
  disabled: true,
});
const ICONS = keysOf<IllustrationName | "none">({
  none: true,
  acorn: true,
  drumstick: true,
  "maple-leaf": true,
  "oak-leaf": true,
  pie: true,
  pumpkin: true,
  turkey: true,
});

interface Args {
  tones: Tone[];
  states: State[];
  icon: IllustrationName | "none";
  label: string;
}

const meta = {
  title: "Guest/RadioCard",
  args: {
    tones: TONES,
    states: STATES,
    icon: "turkey",
    label: "Count me in",
  },
  argTypes: {
    tones: { control: "check", options: TONES },
    states: { control: "check", options: STATES },
    icon: { control: "select", options: ICONS },
    label: { control: "text" },
  },
  render: ({ tones, states, icon, label }) => (
    <Matrix
      rows={pick(TONES, tones)}
      cols={pick(STATES, states)}
      render={(tone, state) => (
        <RadioCard
          name={`radio-card-${tone}-${state}`}
          tone={tone}
          icon={icon === "none" ? undefined : icon}
          label={label}
          defaultChecked={state === "checked"}
          disabled={state === "disabled"}
          className="w-64"
        />
      )}
    />
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
