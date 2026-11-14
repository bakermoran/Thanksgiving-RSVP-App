import { Cell, Row } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea } from "./scroll-area";

const GUESTS = Array.from({ length: 30 }, (_, i) => `Guest ${i + 1}`);

const meta = {
  title: "Platform/ScrollArea",
  render: () => (
    <Row>
      <Cell label="vertical">
        <ScrollArea className="h-64 w-56 rounded-md border">
          <ul className="divide-y p-3 text-sm">
            {GUESTS.map((guest) => (
              <li key={guest} className="py-1.5">
                {guest}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </Cell>
      <Cell label="max-height">
        <ScrollArea
          className="w-56 rounded-md border"
          viewportClassName="max-h-40"
        >
          <ul className="divide-y p-3 text-sm">
            {GUESTS.slice(0, 12).map((guest) => (
              <li key={guest} className="py-1.5">
                {guest}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </Cell>
    </Row>
  ),
} satisfies Meta;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
