import type { Decorator, Preview } from "@storybook/react-vite";
import {
  RouterContextProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { cn } from "cn";

import "../src/style.css";

const router = createRouter({
  routeTree: createRootRoute(),
  history: createMemoryHistory(),
});

const withRouter: Decorator = (Story) => (
  <RouterContextProvider router={router}>
    <Story />
  </RouterContextProvider>
);

const withKitShell: Decorator = (Story, { title, globals }) => {
  if (!title.startsWith("Platform/")) {
    return (
      <div className="min-h-dvh p-8">
        <Story />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "platform min-h-dvh p-8",
        globals.platformTheme === "dark" && "dark",
      )}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withKitShell, withRouter],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  globalTypes: {
    platformTheme: {
      description: "Light/dark mode for the platform (admin) kit",
      toolbar: {
        title: "Platform theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { platformTheme: "light" },
};

export default preview;
