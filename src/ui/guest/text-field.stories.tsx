import { Cell, Row } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import { TextField } from "./text-field";

interface Args {
  label: string;
  placeholder: string;
  errors: string[];
  disabled: boolean;
  onChange: (value: string) => void;
}

const Field = ({
  id,
  errors,
  onChange,
  ...props
}: Omit<Args, "errors"> & { id: string; errors: string[] }) => {
  const [value, setValue] = useState("");
  return (
    <TextField
      {...props}
      id={id}
      value={value}
      errors={errors}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
};

const meta = {
  title: "Guest/TextField",
  args: {
    label: "What are you bringing?",
    placeholder: "Pumpkin pie",
    errors: ["Tell us what you're bringing", "Keep it under 40 characters"],
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    errors: {
      control: "object",
      description: "Shown in the “with errors” column",
    },
    disabled: { control: "boolean" },
    onChange: { table: { disable: true } },
  },
  render: ({ errors, ...props }) => (
    <Row>
      <Cell label="valid">
        <div className="w-72">
          <Field {...props} id="text-field-valid" errors={[]} />
        </div>
      </Cell>
      <Cell label="with errors">
        <div className="w-72">
          <Field {...props} id="text-field-errors" errors={errors} />
        </div>
      </Cell>
    </Row>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
