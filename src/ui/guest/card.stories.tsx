import { Cell, Row, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./card";

type CardTilt = NonNullable<React.ComponentProps<typeof Card>["tilt"]>;

const TILTS = keysOf<CardTilt>({ none: true, left: true, right: true });

interface Args {
  tilts: CardTilt[];
  heading: string;
  body: string;
}

const meta = {
  title: "Guest/Card",
  args: {
    tilts: TILTS,
    heading: "Grandma's stuffing",
    body: "Day-old bread, celery, onion, sage, and more butter than anyone wants to admit.",
  },
  argTypes: {
    tilts: { control: "check", options: TILTS },
    heading: { control: "text" },
    body: { control: "text" },
  },
  render: ({ tilts, heading, body }) => (
    <Row>
      {pick(TILTS, tilts).map((tilt) => (
        <Cell key={tilt} label={`tilt: ${tilt}`}>
          <Card tilt={tilt} className="mt-4 w-80">
            <h3 className="font-display text-3xl text-cranberry">{heading}</h3>
            <p className="mt-3 text-lg">{body}</p>
          </Card>
        </Cell>
      ))}
    </Row>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
