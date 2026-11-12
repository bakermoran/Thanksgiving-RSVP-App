import { type InviteGroupWithInvitees } from "@/shared/types";

export const groupLabel = (group: InviteGroupWithInvitees) => {
  const lastNames = [...new Set(group.invitees.map((i) => i.lastName))];
  return lastNames.length
    ? `Group ${group.id} · ${lastNames.join(", ")}`
    : `Group ${group.id}`;
};
