import { db } from "@/db/client";

export function getEvents() {
  return db.query.eventsTable.findMany({
    orderBy: { id: "asc" },
  });
}

export function getEvent(id: number) {
  return db.query.eventsTable.findFirst({
    where: { id },
  });
}
