import { Cell, Row } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Label } from "./label";
import { NativeSelect } from "./native-select";

interface Args {
  label: string;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const meta = {
  title: "Platform/NativeSelect",
  args: {
    label: "Invite group",
    options: ["The Morans", "Neighbors", "Work friends"],
    onChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    options: { control: "object" },
    onChange: { table: { disable: true } },
  },
  render: ({ label, options, onChange }) => (
    <Row>
      {(["enabled", "disabled"] as const).map((state) => (
        <Cell key={state} label={state}>
          <div className="grid gap-2">
            <Label htmlFor={`native-select-${state}`}>{label}</Label>
            <NativeSelect
              id={`native-select-${state}`}
              disabled={state === "disabled"}
              onChange={onChange}
            >
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </NativeSelect>
          </div>
        </Cell>
      ))}
    </Row>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
