import { getEvents as getEventsDb } from "@/repositories/eventsRepository";
import { createServerFn } from "@tanstack/react-start";

export const getEvents = createServerFn({
  method: "GET",
}).handler(async () => {
  return getEventsDb();
});
