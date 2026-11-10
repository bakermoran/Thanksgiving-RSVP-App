import { db } from "@/db/client";
import { type SQLWrapper, sql } from "drizzle-orm";

const equalsIgnoreCase = (column: SQLWrapper, value: string) =>
  sql`lower(${column}) = lower(${value})`;

export async function getInviteeByNameWithGroup({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const withGroup = { inviteGroup: { with: { invitees: true } } } as const;

  const exact = await db.query.inviteesTable.findFirst({
    where: {
      RAW: (t) =>
        sql`${equalsIgnoreCase(t.firstName, firstName)} and ${equalsIgnoreCase(t.lastName, lastName)}`,
    },
    with: withGroup,
  });
  if (exact) return exact;

  return db.query.inviteesTable.findFirst({
    where: {
      RAW: (t) => equalsIgnoreCase(t.lastName, lastName),
      aliases: { RAW: (t) => equalsIgnoreCase(t.alias, firstName) },
    },
    with: withGroup,
  });
}

export function getInvitee(id: number) {
  return db.query.inviteesTable.findFirst({ where: { id } });
}
