import { type InviteGroupWithInvitees } from "@/db/schema/inviteGroup";

export const groupLabel = (group: InviteGroupWithInvitees) => {
  const lastNames = [...new Set(group.invitees.map((i) => i.lastName))];
  return lastNames.length
    ? `Group ${group.id} · ${lastNames.join(", ")}`
    : `Group ${group.id}`;
};
