import { Section, Sink, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Page } from "./page";

type PageWidth = NonNullable<React.ComponentProps<typeof Page>["width"]>;

const WIDTHS = keysOf<PageWidth>({ sm: true, md: true });

interface Args {
  widths: PageWidth[];
  content: string;
}

const meta = {
  title: "Guest/Page",
  args: {
    widths: WIDTHS,
    content: "Page content",
  },
  argTypes: {
    widths: { control: "check", options: WIDTHS },
    content: { control: "text" },
  },
  render: ({ widths, content }) => (
    <Sink>
      {pick(WIDTHS, widths).map((width) => (
        <Section key={width} title={`width: ${width}`}>
          <Page
            width={width}
            className="outline-2 outline-bark/40 outline-dashed"
          >
            <div className="rounded-2xl border-3 border-dashed border-bark bg-cream/80 p-6 text-center font-semibold">
              {content}
            </div>
          </Page>
        </Section>
      ))}
    </Sink>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
