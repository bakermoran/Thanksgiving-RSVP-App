import { db } from "@/server/db/client";

export function getInviteGroup(inviteGroupId: number) {
  return db.query.inviteGroupsTable.findFirst({
    where: { id: inviteGroupId },
    with: { invitees: true },
  });
}

export function getAllInviteGroups() {
  return db.query.inviteGroupsTable.findMany({
    orderBy: { id: "asc" },
    with: {
      invitees: { orderBy: { lastName: "asc", firstName: "asc" } },
    },
  });
}
