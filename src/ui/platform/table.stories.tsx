import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const GUESTS = [
  { name: "Aunt Linda", group: "The Morans", response: "Attending" },
  { name: "Uncle Rick", group: "The Morans", response: "Declined" },
  { name: "Priya", group: "Neighbors", response: "Attending" },
  { name: "Sam", group: "Work friends", response: "No response" },
  { name: "Jordan", group: "Neighbors", response: "Attending" },
  { name: "Grandma", group: "The Morans", response: "Attending" },
  { name: "Theo", group: "Work friends", response: "Declined" },
  { name: "Mia", group: "Neighbors", response: "No response" },
];

const badgeVariant = (response: string) =>
  response === "Attending"
    ? "default"
    : response === "Declined"
      ? "destructive"
      : "outline";

interface Args {
  rows: number;
  selectedRow: number;
  showCaption: boolean;
  caption: string;
  showFooter: boolean;
}

const meta = {
  title: "Platform/Table",
  args: {
    rows: 5,
    selectedRow: 1,
    showCaption: true,
    caption: "Guest list for Thanksgiving dinner",
    showFooter: true,
  },
  argTypes: {
    rows: { control: { type: "range", min: 0, max: GUESTS.length, step: 1 } },
    selectedRow: {
      control: { type: "range", min: -1, max: GUESTS.length - 1, step: 1 },
      description: 'Row with data-state="selected" (-1 for none)',
    },
    showCaption: { control: "boolean" },
    caption: { control: "text" },
    showFooter: { control: "boolean" },
  },
  render: ({ rows, selectedRow, showCaption, caption, showFooter }) => {
    const guests = GUESTS.slice(0, rows);
    return (
      <Table className="max-w-2xl">
        {showCaption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Group</TableHead>
            <TableHead className="text-right">Response</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest, i) => (
            <TableRow
              key={guest.name}
              data-state={i === selectedRow ? "selected" : undefined}
            >
              <TableCell className="font-medium">{guest.name}</TableCell>
              <TableCell>{guest.group}</TableCell>
              <TableCell className="text-right">
                <Badge variant={badgeVariant(guest.response)}>
                  {guest.response}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {showFooter && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Attending</TableCell>
              <TableCell className="text-right">
                {guests.filter((g) => g.response === "Attending").length} of{" "}
                {guests.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    );
  },
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
