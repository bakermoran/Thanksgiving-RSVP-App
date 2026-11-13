import { db } from "@/server/db/client";
import { eventsTable } from "@/server/db/schema/event";
import { rsvpsTable } from "@/server/db/schema/rsvp";
import type { Event } from "@/shared/types";
import { eq } from "drizzle-orm";

export function getEvents() {
  return db.query.eventsTable.findMany({
    orderBy: { startTime: "asc", id: "asc" },
  });
}

export function getEvent(id: number) {
  return db.query.eventsTable.findFirst({
    where: { id },
  });
}

export function createEvent(
  data: Omit<Event, "id" | "createdAt" | "updatedAt">,
) {
  return db.insert(eventsTable).values(data).returning().get();
}

// RSVPs reference the event with no cascade, so they go first, atomically.
export function deleteEvent(id: number) {
  return db.transaction((tx) => {
    tx.delete(rsvpsTable).where(eq(rsvpsTable.eventId, id)).run();

    return tx
      .delete(eventsTable)
      .where(eq(eventsTable.id, id))
      .returning()
      .get();
  });
}

export function updateEvent(
  id: number,
  data: Partial<Omit<Event, "id" | "createdAt" | "updatedAt">>,
) {
  return db
    .update(eventsTable)
    .set(data)
    .where(eq(eventsTable.id, id))
    .returning()
    .get();
}
