import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";

import { Button } from "./button";
import { PageHeader } from "./page-header";

interface Args {
  title: string;
  description: string;
  showDescription: boolean;
  showActions: boolean;
}

const meta = {
  title: "Platform/PageHeader",
  args: {
    title: "Events",
    description: "Everything happening this year, sorted by start time.",
    showDescription: true,
    showActions: true,
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    showDescription: { control: "boolean" },
    showActions: { control: "boolean" },
  },
  render: ({ title, description, showDescription, showActions }) => (
    <PageHeader
      title={title}
      description={showDescription ? description : undefined}
      actions={
        showActions && (
          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
            <Button>
              <Plus />
              Add event
            </Button>
          </div>
        )
      }
    />
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
