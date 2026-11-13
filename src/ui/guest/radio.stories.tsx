import { Cell, Row } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Radio } from "./radio";

interface Args {
  disabled: boolean;
}

const meta = {
  title: "Guest/Radio",
  args: { disabled: false },
  argTypes: { disabled: { control: "boolean" } },
  render: ({ disabled }) => (
    <Row>
      <Cell label="unchecked">
        <Radio name="radio-unchecked" disabled={disabled} />
      </Cell>
      <Cell label="checked">
        <Radio name="radio-checked" defaultChecked disabled={disabled} />
      </Cell>
      <Cell label="group">
        <div className="flex items-center gap-3">
          {["Light", "Dark", "Both"].map((meat, i) => (
            <label key={meat} className="flex items-center gap-2 font-semibold">
              <Radio
                name="radio-group"
                value={meat}
                defaultChecked={i === 0}
                disabled={disabled}
              />
              {meat}
            </label>
          ))}
        </div>
      </Cell>
    </Row>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
