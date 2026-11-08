import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

import { baseColumns } from "./base";

export const eventsTable = sqliteTable("events", {
  ...baseColumns,
  name: text().notNull(),
  time: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  address1: text().notNull(),
  address2: text(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
});

export const eventsSchema = createSelectSchema(eventsTable);
export type Event = z.infer<typeof eventsSchema>;

export const getEventSchema = eventsSchema.pick({
  id: true,
});
