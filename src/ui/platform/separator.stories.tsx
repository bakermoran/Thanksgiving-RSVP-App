import { Cell, Row, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./separator";

type Orientation = "horizontal" | "vertical";

const ORIENTATIONS = keysOf<Orientation>({ horizontal: true, vertical: true });

interface Args {
  orientations: Orientation[];
  decorative: boolean;
}

const meta = {
  title: "Platform/Separator",
  args: {
    orientations: ORIENTATIONS,
    decorative: true,
  },
  argTypes: {
    orientations: { control: "check", options: ORIENTATIONS },
    decorative: {
      control: "boolean",
      description: "When false, exposed to assistive tech as role=separator",
    },
  },
  render: ({ orientations, decorative }) => (
    <Row>
      {pick(ORIENTATIONS, orientations).map((orientation) => (
        <Cell key={orientation} label={orientation}>
          {orientation === "horizontal" ? (
            <div className="w-64 text-sm">
              <p className="font-medium">Thanksgiving dinner</p>
              <p className="text-muted-foreground">Thu, Nov 26</p>
              <Separator decorative={decorative} className="my-4" />
              <p>12 attending</p>
            </div>
          ) : (
            <div className="flex h-5 items-center gap-4 text-sm">
              <span>Events</span>
              <Separator decorative={decorative} orientation="vertical" />
              <span>Guests</span>
              <Separator decorative={decorative} orientation="vertical" />
              <span>Obligations</span>
            </div>
          )}
        </Cell>
      ))}
    </Row>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
