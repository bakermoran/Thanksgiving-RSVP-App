import * as eventService from "@/server/services/event";
import { createServerFn } from "@tanstack/react-start";

import { authMiddleware } from "./middleware";

export const getEvents = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => eventService.list());
