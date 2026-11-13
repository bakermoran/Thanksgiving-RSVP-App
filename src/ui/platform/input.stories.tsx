import { Matrix, keysOf, pick } from "@/ui/storybook/kitchen-sink";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";
import { Label } from "./label";

type State = "default" | "filled" | "invalid" | "disabled";
type InputType =
  "text" | "email" | "password" | "number" | "date" | "datetime-local" | "file";

const STATES = keysOf<State>({
  default: true,
  filled: true,
  invalid: true,
  disabled: true,
});
const TYPES = keysOf<InputType>({
  text: true,
  email: true,
  password: true,
  number: true,
  date: true,
  "datetime-local": true,
  file: true,
});

const SAMPLE_VALUES: Record<InputType, string | undefined> = {
  text: "Thanksgiving dinner",
  email: "host@example.com",
  password: "cranberry",
  number: "12",
  date: "2026-11-26",
  "datetime-local": "2026-11-26T16:00",
  file: undefined,
};

interface Args {
  types: InputType[];
  states: State[];
  label: string;
  placeholder: string;
  showLabel: boolean;
}

const meta = {
  title: "Platform/Input",
  args: {
    types: TYPES,
    states: STATES,
    label: "Event name",
    placeholder: "Friendsgiving",
    showLabel: true,
  },
  argTypes: {
    types: { control: "check", options: TYPES },
    states: { control: "check", options: STATES },
    label: { control: "text" },
    placeholder: { control: "text" },
    showLabel: {
      control: "boolean",
      description: "Pair each input with a Label",
    },
  },
  render: ({ types, states, label, placeholder, showLabel }) => (
    <Matrix
      rows={pick(TYPES, types)}
      cols={pick(STATES, states)}
      render={(type, state) => {
        const id = `input-${type}-${state}`;
        return (
          <div className="grid w-56 gap-2">
            {showLabel && <Label htmlFor={id}>{label}</Label>}
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              defaultValue={
                state === "default" ? undefined : SAMPLE_VALUES[type]
              }
              aria-invalid={state === "invalid" || undefined}
              disabled={state === "disabled"}
            />
          </div>
        );
      }}
    />
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
