import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { type z } from "zod";

import { baseColumns } from "./base";
import { type Invitee, inviteesTable } from "./invitee";

export const obligationsTable = sqliteTable(
  "obligations",
  {
    ...baseColumns,
    name: text().notNull(),
    inviteeId: int("invitee_id").references(() => inviteesTable.id),
    categoryId: int("category_id")
      .references(() => obligationCategoriesTable.id, { onDelete: "cascade" })
      .notNull(),
    sortOrder: int("sort_order").notNull(),
  },
  (table) => [
    uniqueIndex("idx_obligations_name").on(table.name),
    uniqueIndex("idx_obligations_sort_order").on(table.sortOrder),
  ],
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

export type ObligationWithInvitee = Obligation & {
  invitee: Invitee | null;
};
export type ObligationCategoryWithObligations = ObligationCategory & {
  obligations: ObligationWithInvitee[];
};
