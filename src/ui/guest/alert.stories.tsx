import { Section, Sink } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Alert } from "./alert";

interface Args {
  children: string;
  longMessage: string;
  showLong: boolean;
}

const meta = {
  title: "Guest/Alert",
  args: {
    children: "That invite code didn't work.",
    longMessage:
      "We couldn't save your RSVP. Check your connection and try again — if it keeps happening, text the host and they'll sort it out before the turkey's done.",
    showLong: true,
  },
  argTypes: {
    children: { control: "text", name: "message" },
    longMessage: { control: "text", description: "Wraps across lines" },
    showLong: { control: "boolean", name: "show long message" },
  },
  render: ({ children, longMessage, showLong }) => (
    <Sink>
      <Section title="Short">
        <Alert className="max-w-md">{children}</Alert>
      </Section>
      {showLong && (
        <Section title="Long (wrapping)">
          <Alert className="max-w-md">{longMessage}</Alert>
        </Section>
      )}
    </Sink>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
