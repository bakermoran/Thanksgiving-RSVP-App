import { sql } from "drizzle-orm";
import { check, int, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { type z } from "zod";

import { baseColumns } from "./base";
import { eventsTable } from "./event";
import { inviteesTable } from "./invitee";

export const rsvpsTable = sqliteTable(
  "rsvps",
  {
    ...baseColumns,
    eventId: int("event_id")
      .notNull()
      .references(() => eventsTable.id),
    inviteeId: int("invitee_id")
      .notNull()
      .references(() => inviteesTable.id),
    isAttending: int("is_attending", { mode: "boolean" }).notNull(),
  },
  (table) => [
    check("rsvps_is_attending_bool", sql`${table.isAttending} IN (0, 1)`),
    uniqueIndex("uq_rsvps_event_invitee").on(table.eventId, table.inviteeId),
  ],
);

export const rsvpsSchema = createSelectSchema(rsvpsTable);
export type Rsvp = z.infer<typeof rsvpsSchema>;
