import { db } from "@/db/client";
import { inviteTable } from "@/db/schema/invite";
import { inviteGroupsTable } from "@/db/schema/inviteGroup";
import { createInviteeSchema, inviteesTable } from "@/db/schema/invitee";
import { and, eq, isNull } from "drizzle-orm";
import { z } from "zod";

export async function validateInvite(code: string) {
  const invite = db
    .select()
    .from(inviteTable)
    .where(
      and(
        eq(inviteTable.code, code),
        isNull(inviteTable.redeemedAt),
        isNull(inviteTable.redeemedBy),
      ),
    )
    .get();
  return !!invite;
}

export async function createInvite(code: string) {
  return db.insert(inviteTable).values({ code }).returning().get();
}

export async function redeemInvite(
  code: string,
  invitee: z.infer<typeof createInviteeSchema>,
) {
  return db.transaction((tx) => {
    const group = tx
      .insert(inviteGroupsTable)
      .values({})
      .returning({ id: inviteGroupsTable.id })
      .get();

    const newInvitee = tx
      .insert(inviteesTable)
      .values({ ...invitee, inviteGroupId: group.id })
      .returning()
      .get();

    const redeemed = tx
      .update(inviteTable)
      .set({ redeemedAt: new Date().toISOString(), redeemedBy: newInvitee.id })
      .where(and(eq(inviteTable.code, code), isNull(inviteTable.redeemedAt)))
      .returning({ id: inviteTable.id })
      .get();

    if (!redeemed) {
      tx.rollback();
    }

    return newInvitee;
  });
}
