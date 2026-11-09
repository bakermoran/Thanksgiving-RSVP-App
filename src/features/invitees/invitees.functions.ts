import { getInviteeSchema } from "@/db/schema/invitee";
import { setSession } from "@/features/auth/session";
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

    setSession({ inviteeId: invitee.id, inviteGroupId: invitee.inviteGroupId });
    return invitee;
  });
