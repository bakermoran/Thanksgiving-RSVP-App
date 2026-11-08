import { getInviteeSchema } from "@/db/schema/invitee";
import { grantInviteGroupAccess } from "@/features/inviteGroups/inviteGroupAccess";
import {
  grantInviteeAccess,
  requireInviteeId,
} from "@/features/invitees/inviteeAccess";
import { getInviteeByNameWithGroup } from "@/repositories/inviteeRepository";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const getInvitee = createServerFn({
  method: "POST",
})
  .validator(getInviteeSchema)
  .handler(async ({ data: { firstName, lastName } }) => {
    const invitee = await getInviteeByNameWithGroup({ firstName, lastName });

    if (!invitee) throw notFound();

    grantInviteGroupAccess(invitee.inviteGroupId);
    grantInviteeAccess(invitee.id);
    return invitee;
  });

export const getMyInviteeId = createServerFn({
  method: "GET",
}).handler(async () => requireInviteeId());
