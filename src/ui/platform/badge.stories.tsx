import { Matrix, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";

import { Badge, type badgeVariants } from "./badge";

type Variant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
type Element = "span" | "link";

const VARIANTS = keysOf<Variant>({
  default: true,
  secondary: true,
  outline: true,
  ghost: true,
  destructive: true,
  link: true,
});
const ELEMENTS = keysOf<Element>({ span: true, link: true });

type Args = Omit<React.ComponentProps<typeof Badge>, "variant"> & {
  variants: Variant[];
  elements: Element[];
  withIcon: boolean;
};

const meta = {
  title: "Platform/Badge",
  args: {
    variants: VARIANTS,
    elements: ELEMENTS,
    children: "Attending",
    withIcon: false,
  },
  argTypes: {
    variants: { control: "check", options: VARIANTS },
    elements: {
      control: "check",
      options: ELEMENTS,
      description: "`link` renders an <a> via asChild, which adds hover styles",
    },
    children: { control: "text" },
    withIcon: { control: "boolean" },
  },
  render: ({ variants, elements, withIcon, children, ...props }) => (
    <Matrix
      rows={pick(VARIANTS, variants)}
      cols={pick(ELEMENTS, elements)}
      render={(variant, element) => {
        const content = (
          <>
            {withIcon && <Check />}
            {children}
          </>
        );
        return element === "link" ? (
          <Badge {...props} variant={variant} asChild>
            <a href="#" onClick={(event) => event.preventDefault()}>
              {content}
            </a>
          </Badge>
        ) : (
          <Badge {...props} variant={variant}>
            {content}
          </Badge>
        );
      }}
    />
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
