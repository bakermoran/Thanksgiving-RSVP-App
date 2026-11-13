import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";
import { ListItem } from "./list";

interface Args {
  items: string[];
  showBadges: boolean;
}

const meta = {
  title: "Guest/List",
  args: {
    items: ["Turkey", "Mashed potatoes", "Green bean casserole", "Pecan pie"],
    showBadges: true,
  },
  argTypes: {
    items: { control: "object" },
    showBadges: { control: "boolean" },
  },
  render: ({ items, showBadges }) => (
    <ul className="max-w-md">
      {items.map((item, i) => (
        <ListItem key={`${item}-${i}`}>
          <span className="flex-1">{item}</span>
          {showBadges && (
            <Badge variant={i % 2 ? "outline" : "olive"}>
              {i % 2 ? "Open" : "Claimed"}
            </Badge>
          )}
        </ListItem>
      ))}
    </ul>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
