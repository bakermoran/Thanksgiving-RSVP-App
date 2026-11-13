import { Matrix, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type VariantProps } from "class-variance-authority";
import { Plus } from "lucide-react";
import { fn } from "storybook/test";

import { Button, type buttonVariants } from "./button";

type Variant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type Size = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const VARIANTS = keysOf<Variant>({
  default: true,
  secondary: true,
  outline: true,
  ghost: true,
  destructive: true,
  link: true,
});
const SIZES = keysOf<Size>({
  xs: true,
  sm: true,
  default: true,
  lg: true,
  "icon-xs": true,
  "icon-sm": true,
  icon: true,
  "icon-lg": true,
});

type Args = Omit<React.ComponentProps<typeof Button>, "variant" | "size"> & {
  variants: Variant[];
  sizes: Size[];
  withIcon: boolean;
};

const meta = {
  title: "Platform/Button",
  args: {
    variants: VARIANTS,
    sizes: SIZES,
    children: "Add event",
    withIcon: true,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variants: { control: "check", options: VARIANTS },
    sizes: { control: "check", options: SIZES },
    children: { control: "text" },
    withIcon: {
      control: "boolean",
      description: "Leading icon on text sizes (icon sizes always show one)",
    },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    onClick: { table: { disable: true } },
  },
  render: ({ variants, sizes, withIcon, children, ...props }) => (
    <Matrix
      rows={pick(VARIANTS, variants)}
      cols={pick(SIZES, sizes)}
      render={(variant, size) =>
        size.startsWith("icon") ? (
          <Button
            {...props}
            variant={variant}
            size={size}
            aria-label={typeof children === "string" ? children : undefined}
          >
            <Plus />
          </Button>
        ) : (
          <Button {...props} variant={variant} size={size}>
            {withIcon && <Plus />}
            {children}
          </Button>
        )
      }
    />
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
