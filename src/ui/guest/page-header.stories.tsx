import { Section, Sink, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Illustration, type IllustrationName } from "./illustration";
import { PageHeader } from "./page-header";

type TitleSize = NonNullable<React.ComponentProps<typeof PageHeader>["size"]>;

const SIZES = keysOf<TitleSize>({ md: true, lg: true, xl: true });
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
  sizes: TitleSize[];
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  illustration: IllustrationName | "none";
}

const meta = {
  title: "Guest/PageHeader",
  args: {
    sizes: SIZES,
    eyebrow: "You're invited",
    title: "Gobble Gobble",
    description: "Thursday, November 26 at Grandma's. Bring an appetite.",
    detail: "",
    illustration: "turkey",
  },
  argTypes: {
    sizes: { control: "check", options: SIZES },
    eyebrow: { control: "text" },
    title: { control: "text" },
    description: { control: "text", description: "Rendered as `children`" },
    detail: { control: "text" },
    illustration: { control: "select", options: ICONS },
  },
  render: ({ sizes, description, detail, illustration, ...props }) => (
    <Sink>
      {pick(SIZES, sizes).map((size) => (
        <Section key={size} title={`size: ${size}`}>
          <PageHeader
            {...props}
            size={size}
            className="mb-0"
            illustration={
              illustration !== "none" && (
                <Illustration
                  name={illustration}
                  animate="wobble"
                  className="mx-auto h-20"
                />
              )
            }
            detail={
              detail && (
                <p className="mt-3 font-semibold text-cocoa">{detail}</p>
              )
            }
          >
            {description || undefined}
          </PageHeader>
        </Section>
      ))}
    </Sink>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
