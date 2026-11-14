import {
  Matrix,
  Section,
  Sink,
  keysOf,
  pick,
} from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { type ButtonSize, type ButtonVariant } from "./button";
import { Link } from "./link";

const VARIANTS = keysOf<ButtonVariant>({
  primary: true,
  secondary: true,
  ghost: true,
});
const SIZES = keysOf<ButtonSize>({ sm: true, md: true, lg: true });

interface Args {
  variants: ButtonVariant[];
  sizes: ButtonSize[];
  showText: boolean;
  children: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const meta = {
  title: "Guest/Link",
  args: {
    variants: VARIANTS,
    sizes: SIZES,
    showText: true,
    children: "See the menu",
    onClick: fn(),
  },
  argTypes: {
    variants: {
      control: "check",
      options: VARIANTS,
      description: "Button-styled variants",
    },
    sizes: { control: "check", options: SIZES },
    showText: {
      control: "boolean",
      description: 'Show the `variant="text"` inline link',
    },
    children: { control: "text" },
    onClick: { table: { disable: true } },
  },
  render: ({ variants, sizes, showText, children, onClick }) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      onClick(event);
    };
    return (
      <Sink>
        <Section title="Button variants">
          <Matrix
            rows={pick(VARIANTS, variants)}
            cols={pick(SIZES, sizes)}
            render={(variant, size) => (
              <Link
                to="/$gatheringId/home"
                params={{ gatheringId: "1" }}
                variant={variant}
                size={size}
                onClick={handleClick}
              >
                {children}
              </Link>
            )}
          />
        </Section>
        {showText && (
          <Section title="Text">
            <p className="text-lg">
              Not sure what to bring?{" "}
              <Link
                to="/$gatheringId/home"
                params={{ gatheringId: "1" }}
                variant="text"
                onClick={handleClick}
              >
                {children}
              </Link>
            </p>
          </Section>
        )}
      </Sink>
    );
  },
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
