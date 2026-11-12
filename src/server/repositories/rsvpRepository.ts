import { db } from "@/server/db/client";
import { inviteesTable } from "@/server/db/schema/invitee";
import { rsvpsTable } from "@/server/db/schema/rsvp";
import { and, eq, sql } from "drizzle-orm";

export async function getRsvpsForInviteGroup({
  inviteGroupId,
  eventId,
}: {
  inviteGroupId: number;
  eventId?: number;
}) {
  return db
    .select({
      eventId: rsvpsTable.eventId,
      inviteeId: rsvpsTable.inviteeId,
      isAttending: rsvpsTable.isAttending,
    })
    .from(rsvpsTable)
    .innerJoin(inviteesTable, eq(rsvpsTable.inviteeId, inviteesTable.id))
    .where(
      and(
        eq(inviteesTable.inviteGroupId, inviteGroupId),
        eventId === undefined ? undefined : eq(rsvpsTable.eventId, eventId),
      ),
    );
}

export async function upsertRsvps(
  rows: { eventId: number; inviteeId: number; isAttending: boolean }[],
) {
  if (rows.length === 0) return;

  await db
    .insert(rsvpsTable)
    .values(rows)
    .onConflictDoUpdate({
      target: [rsvpsTable.eventId, rsvpsTable.inviteeId],
      set: {
        isAttending: sql`excluded.is_attending`,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      },
    });
}

export function getAllRsvps() {
  return db
    .select({
      eventId: rsvpsTable.eventId,
      inviteeId: rsvpsTable.inviteeId,
      isAttending: rsvpsTable.isAttending,
    })
    .from(rsvpsTable);
}
