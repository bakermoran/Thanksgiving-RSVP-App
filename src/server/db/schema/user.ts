import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { type z } from "zod";

import { baseColumns } from "./base";

export const usersTable = sqliteTable(
  "users",
  {
    ...baseColumns,
    email: text("email").notNull(),
    password: text("password").notNull(),
  },
  (table) => [uniqueIndex("idx_users_email").on(table.email)],
);

export const usersSchema = createSelectSchema(usersTable);
export type User = z.infer<typeof usersSchema>;
export type PublicUser = Omit<User, "password">;
