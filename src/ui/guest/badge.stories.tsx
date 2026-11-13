import { Cell, Row, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge, type BadgeVariant } from "./badge";

const VARIANTS = keysOf<BadgeVariant>({
  olive: true,
  cranberry: true,
  mustard: true,
  outline: true,
});

type Args = Omit<React.ComponentProps<typeof Badge>, "variant"> & {
  variants: BadgeVariant[];
};

const meta = {
  title: "Guest/Badge",
  args: {
    variants: VARIANTS,
    children: "Going",
  },
  argTypes: {
    variants: { control: "check", options: VARIANTS },
    children: { control: "text" },
  },
  render: ({ variants, ...props }) => (
    <Row>
      {pick(VARIANTS, variants).map((variant) => (
        <Cell key={variant} label={variant}>
          <Badge {...props} variant={variant} />
        </Cell>
      ))}
    </Row>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
