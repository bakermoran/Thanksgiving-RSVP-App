import { db } from "@/db/client";

export async function getInviteeByNameWithGroup({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const withGroup = { inviteGroup: { with: { invitees: true } } } as const;

  const exact = await db.query.inviteesTable.findFirst({
    where: { firstName, lastName },
    with: withGroup,
  });
  if (exact) return exact;

  return db.query.inviteesTable.findFirst({
    where: { lastName, aliases: { alias: firstName } },
    with: withGroup,
  });
}
