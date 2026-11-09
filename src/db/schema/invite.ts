import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-orm/zod";
import { z } from "zod";

import { baseColumns } from "./base";
import { createInviteeSchema, inviteesTable } from "./invitee";

export const inviteTable = sqliteTable("invites", {
  ...baseColumns,
  code: text("code").notNull(),
  redeemedAt: text("redeemed_at"),
  redeemedBy: int("redeemed_by").references(() => inviteesTable.id),
});

export const inviteSchema = createSelectSchema(inviteTable);
export type Invite = z.infer<typeof inviteSchema>;

export const createInviteSchema = z.object({
  code: z.string(),
});

export const getInviteSchema = inviteSchema.pick({
  code: true,
});

export const redeemInviteSchema = inviteSchema
  .pick({
    code: true,
  })
  .extend({
    invitee: createInviteeSchema,
  });
