import { authMiddleware } from "@/features/auth/auth.middleware";
import { getEvents as getEventsDb } from "@/repositories/eventsRepository";
import { createServerFn } from "@tanstack/react-start";

export const getEvents = createServerFn({
  method: "GET",
})
  .middleware([authMiddleware])
  .handler(async () => {
    return getEventsDb();
  });
