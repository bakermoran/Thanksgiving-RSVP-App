import { getInviteeSchema } from "@/db/schema/invitee";
import { grantInviteGroupAccess } from "@/features/inviteGroups/inviteGroupAccess";
import { getInviteeByNameWithGroup } from "@/repositories/inviteeRepository";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const getInvitee = createServerFn({
  method: "POST",
})
  .validator(getInviteeSchema)
  .handler(async ({ data }) => {
    const invitee = await getInviteeByNameWithGroup(
      data.firstName,
      data.lastName,
    );

    if (!invitee) throw notFound();

    grantInviteGroupAccess(invitee.inviteGroupId);
    return invitee;
  });
