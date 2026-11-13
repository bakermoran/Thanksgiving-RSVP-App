import type { Meta, StoryObj } from "@storybook/react-vite";

import { Fieldset } from "./fieldset";
import { RadioCard } from "./radio-card";

interface Args {
  legend: string;
  disabled: boolean;
  yesLabel: string;
  noLabel: string;
}

const meta = {
  title: "Guest/Fieldset",
  args: {
    legend: "Thanksgiving dinner",
    disabled: false,
    yesLabel: "Count me in",
    noLabel: "Can't make it",
  },
  argTypes: {
    legend: { control: "text" },
    disabled: {
      control: "boolean",
      description: "Native fieldset disable — locks every input inside",
    },
    yesLabel: { control: "text" },
    noLabel: { control: "text" },
  },
  render: ({ legend, disabled, yesLabel, noLabel }) => (
    <Fieldset legend={legend} disabled={disabled} className="max-w-md">
      <div className="mt-3 grid gap-3">
        <RadioCard
          name="fieldset-demo"
          value="yes"
          tone="olive"
          icon="turkey"
          label={yesLabel}
        />
        <RadioCard
          name="fieldset-demo"
          value="no"
          tone="cranberry"
          icon="pie"
          label={noLabel}
        />
      </div>
    </Fieldset>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
