import { setSession } from "@/features/auth/session";
import { inviteeNameSchema } from "@/features/invitees/invitees.schemas";
import { getInviteeByNameWithGroup } from "@/repositories/inviteeRepository";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const getInvitee = createServerFn({
  method: "POST",
})
  .validator(inviteeNameSchema)
  .handler(async ({ data: { firstName, lastName } }) => {
    const invitee = await getInviteeByNameWithGroup({ firstName, lastName });

    if (!invitee) throw notFound();

    setSession({ inviteeId: invitee.id, inviteGroupId: invitee.inviteGroupId });
    return invitee;
  });
