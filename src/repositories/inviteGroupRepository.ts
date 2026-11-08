import { db } from "@/db/client";

export function getInviteGroup(inviteGroupId: number) {
  return db.query.inviteGroupsTable.findFirst({
    where: { id: inviteGroupId },
    with: { invitees: true },
  });
}
