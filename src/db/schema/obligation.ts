import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

import { baseColumns } from "./base";
import { inviteesTable } from "./invitee";

export const obligationsTable = sqliteTable(
  "obligations",
  {
    ...baseColumns,
    name: text().notNull(),
    inviteeId: int("invitee_id").references(() => inviteesTable.id),
    categoryId: int("category_id")
      .references(() => obligationCategoriesTable.id)
      .notNull(),
  },
  (table) => [uniqueIndex("idx_obligations_name").on(table.name)],
);

export const obligationCategoriesTable = sqliteTable(
  "obligation_categories",
  {
    ...baseColumns,
    name: text().notNull(),
    sortOrder: int("sort_order").notNull(),
  },
  (table) => [
    uniqueIndex("idx_obligations_category_name").on(table.name),
    uniqueIndex("idx_obligations_category_sort_order").on(table.sortOrder),
  ],
);

export const obligationsSchema = createSelectSchema(obligationsTable);
export type Obligation = z.infer<typeof obligationsSchema>;

export const obligationCategoriesSchema = createSelectSchema(
  obligationCategoriesTable,
);
export type ObligationCategory = z.infer<typeof obligationCategoriesSchema>;

export const createObligationSchema = z.object({
  name: z.string().min(1, "Add a name"),
  inviteeId: z.number().int().nullable(),
  categoryId: z.number().int(),
});

export const claimObligationSchema = z.object({
  id: z.number().int(),
  inviteeId: z.number().int(),
});

export const releaseObligationSchema = z.object({
  id: z.number().int(),
  inviteeId: z.number().int(),
});
