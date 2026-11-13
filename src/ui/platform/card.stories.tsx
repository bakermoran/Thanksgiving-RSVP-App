import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

interface Args {
  title: string;
  description: string;
  content: string;
  showHeader: boolean;
  showDescription: boolean;
  showAction: boolean;
  showContent: boolean;
  showFooter: boolean;
  headerBorder: boolean;
  footerBorder: boolean;
}

const meta = {
  title: "Platform/Card",
  args: {
    title: "Thanksgiving dinner",
    description: "Thu, Nov 26 · 4:00 PM",
    content: "12 attending, 3 declined, 5 haven't responded.",
    showHeader: true,
    showDescription: true,
    showAction: true,
    showContent: true,
    showFooter: true,
    headerBorder: false,
    footerBorder: false,
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    content: { control: "text" },
    showHeader: { control: "boolean" },
    showDescription: { control: "boolean" },
    showAction: { control: "boolean" },
    showContent: { control: "boolean" },
    showFooter: { control: "boolean" },
    headerBorder: {
      control: "boolean",
      description: "`.border-b` on CardHeader adds bottom padding",
    },
    footerBorder: {
      control: "boolean",
      description: "`.border-t` on CardFooter adds top padding",
    },
  },
  render: (args) => (
    <Card className="max-w-md">
      {args.showHeader && (
        <CardHeader className={args.headerBorder ? "border-b" : undefined}>
          <CardTitle>{args.title}</CardTitle>
          {args.showDescription && (
            <CardDescription>{args.description}</CardDescription>
          )}
          {args.showAction && (
            <CardAction>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </CardAction>
          )}
        </CardHeader>
      )}
      {args.showContent && (
        <CardContent>
          <p className="text-sm">{args.content}</p>
        </CardContent>
      )}
      {args.showFooter && (
        <CardFooter className={args.footerBorder ? "gap-2 border-t" : "gap-2"}>
          <Button size="sm">Save</Button>
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  ),
} satisfies Meta<Args>;

export default meta;

export const KitchenSink: StoryObj<typeof meta> = {};
