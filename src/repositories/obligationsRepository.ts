import { db } from "@/db/client";
import { obligationsTable } from "@/db/schema/obligation";
import { and, eq, isNull } from "drizzle-orm";

export function getObligations() {
  return db.query.obligationsTable.findMany({
    orderBy: { id: "asc" },
    with: { invitee: true },
  });
}

export function getObligationsForInviteGroup(inviteGroupId: number) {
  return db.query.obligationsTable.findMany({
    where: { invitee: { inviteGroupId } },
    orderBy: { id: "asc" },
  });
}

export async function claimObligation({
  id,
  inviteeId,
}: {
  id: number;
  inviteeId: number;
}) {
  const [claimed] = await db
    .update(obligationsTable)
    .set({ inviteeId })
    .where(and(eq(obligationsTable.id, id), isNull(obligationsTable.inviteeId)))
    .returning();

  return claimed;
}

export async function releaseObligation({
  id,
  inviteeId,
}: {
  id: number;
  inviteeId: number;
}) {
  const [claimed] = await db
    .update(obligationsTable)
    .set({ inviteeId: null })
    .where(
      and(
        eq(obligationsTable.id, id),
        eq(obligationsTable.inviteeId, inviteeId),
      ),
    )
    .returning();

  return claimed;
}
