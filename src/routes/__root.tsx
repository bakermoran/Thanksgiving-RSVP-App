import { Bunting } from "@/components/Bunting";
import { FallingLeaves } from "@/components/FallingLeaves";
import { NotFound } from "@/components/NotFound";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Gobble Gobble · Thanksgiving RSVP",
      },
    ],
    links: [
      { rel: "icon", href: "/images/turkey.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400..700&family=Lobster&family=Rye&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link href="/src/style.css" rel="stylesheet"></link>
      </head>
      <body className="flex min-h-dvh flex-col">
        <FallingLeaves />
        <Bunting />
        <div className="relative z-10 flex-1 overflow-x-clip">{children}</div>
        <footer className="relative z-10 flex items-center justify-center gap-2 py-6 text-sm font-medium text-cocoa">
          <img src="/images/pie.svg" alt="" className="h-6" />
          Made with extra gravy
          <img src="/images/pie.svg" alt="" className="h-6" />
        </footer>
        <Scripts />
      </body>
    </html>
  );
}
