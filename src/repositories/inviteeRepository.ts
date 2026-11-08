import { db } from "@/db/client";

export function getInviteeByNameWithGroup(firstName: string, lastName: string) {
  return db.query.inviteesTable.findFirst({
    where: { firstName, lastName },
    with: {
      inviteGroup: {
        with: { invitees: true },
      },
    },
  });
}
