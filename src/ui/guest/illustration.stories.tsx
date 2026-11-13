import { Matrix, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Illustration, type IllustrationName } from "./illustration";

type Animation = "none" | "wobble" | "bob";

const NAMES = keysOf<IllustrationName>({
  acorn: true,
  drumstick: true,
  "maple-leaf": true,
  "oak-leaf": true,
  pie: true,
  pumpkin: true,
  turkey: true,
});
const ANIMATIONS = keysOf<Animation>({ none: true, wobble: true, bob: true });

interface Args {
  names: IllustrationName[];
  animations: Animation[];
  height: number;
}

const meta = {
  title: "Guest/Illustration",
  args: {
    names: NAMES,
    animations: ANIMATIONS,
    height: 56,
  },
  argTypes: {
    names: { control: "check", options: NAMES },
    animations: { control: "check", options: ANIMATIONS },
    height: { control: { type: "range", min: 16, max: 160, step: 4 } },
  },
  render: ({ names, animations, height }) => (
    <Matrix
      rows={pick(NAMES, names)}
      cols={pick(ANIMATIONS, animations)}
      render={(name, animation) => (
        <Illustration
          name={name}
          animate={animation === "none" ? undefined : animation}
          style={{ height }}
        />
      )}
    />
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
