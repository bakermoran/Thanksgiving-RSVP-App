import type { Meta, StoryObj } from "@storybook/react-vite";

import { FieldError } from "./field-error";
import { Input } from "./input";
import { Label } from "./label";

interface Args {
  errors: string[];
  label: string;
}

const meta = {
  title: "Platform/FieldError",
  args: {
    label: "Event name",
    errors: ["Name is required", "Name must be under 80 characters"],
  },
  argTypes: {
    label: { control: "text" },
    errors: { control: "object" },
  },
  render: ({ errors, label }) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="field-error-demo">{label}</Label>
      <Input id="field-error-demo" aria-invalid={errors.length > 0} />
      <FieldError errors={errors} />
    </div>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
