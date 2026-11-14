"use client";

import { cn } from "cn";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import * as React from "react";

interface ScrollAreaProps extends React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
> {
  viewportClassName?: string;
  padForScrollbar?: boolean;
  viewportProps?: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport> &
    Record<`data-${string}`, string>;
}

function ScrollArea({
  className,
  viewportClassName,
  viewportProps,
  padForScrollbar = true,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn(
        "relative overflow-hidden",
        padForScrollbar &&
          "has-[>[data-slot=scroll-area-scrollbar][data-orientation=vertical]]:*:data-[slot=scroll-area-viewport]:pr-4",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        {...viewportProps}
        className={cn(
          "size-full rounded-[inherit] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>div]:block!",
          viewportClassName,
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      forceMount
      className={cn(
        "flex touch-none p-px transition-opacity duration-300 select-none data-[state=hidden]:opacity-0",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
