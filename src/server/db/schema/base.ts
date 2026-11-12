import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

export const baseColumns = {
  id: int().primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
};

export const baseOmit = { id: true, createdAt: true, updatedAt: true } as const;
