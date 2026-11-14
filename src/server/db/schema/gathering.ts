import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { type z } from "zod";

import { baseColumns } from "./base";

export const gatheringsTable = sqliteTable("gatherings", {
  ...baseColumns,
  name: text().notNull(),
});

export const gatheringsSchema = createSelectSchema(gatheringsTable);
export type Gathering = z.infer<typeof gatheringsSchema>;
