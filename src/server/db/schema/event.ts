import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { type z } from "zod";

import { baseColumns } from "./base";
import { gatheringsTable } from "./gathering";

export const eventsTable = sqliteTable("events", {
  ...baseColumns,
  name: text().notNull(),
  startTime: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  endTime: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  address1: text().notNull(),
  address2: text(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
  gatheringId: int("gathering_id")
    .notNull()
    .references(() => gatheringsTable.id),
});

export const eventsSchema = createSelectSchema(eventsTable);
export type Event = z.infer<typeof eventsSchema>;
