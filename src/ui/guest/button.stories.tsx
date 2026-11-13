import { Matrix, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Button, type ButtonSize, type ButtonVariant } from "./button";

const VARIANTS = keysOf<ButtonVariant>({
  primary: true,
  secondary: true,
  ghost: true,
});
const SIZES = keysOf<ButtonSize>({ sm: true, md: true, lg: true });

type Args = Omit<React.ComponentProps<typeof Button>, "variant" | "size"> & {
  variants: ButtonVariant[];
  sizes: ButtonSize[];
  asyncClick: boolean;
};

const meta = {
  title: "Guest/Button",
  args: {
    variants: VARIANTS,
    sizes: SIZES,
    children: "Pass the gravy",
    disabled: false,
    loading: false,
    asyncClick: false,
    onClick: fn(),
  },
  argTypes: {
    variants: { control: "check", options: VARIANTS },
    sizes: { control: "check", options: SIZES },
    children: { control: "text" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    asyncClick: {
      control: "boolean",
      description:
        "Return a promise from onClick (1.5s) to see the built-in pending spinner",
    },
    onClick: { table: { disable: true } },
  },
  render: ({ variants, sizes, asyncClick, onClick, ...props }) => (
    <Matrix
      rows={pick(VARIANTS, variants)}
      cols={pick(SIZES, sizes)}
      render={(variant, size) => (
        <Button
          {...props}
          variant={variant}
          size={size}
          onClick={(event) => {
            onClick?.(event);
            if (asyncClick) {
              return new Promise((resolve) => setTimeout(resolve, 1500));
            }
          }}
        />
      )}
    />
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
