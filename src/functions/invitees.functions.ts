import { setSession } from "@/server/auth/guestSession";
import * as inviteeService from "@/server/services/invitee";
import { inviteeNameSchema } from "@/shared/schemas/invitees";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const getInvitee = createServerFn({
  method: "POST",
})
  .validator(inviteeNameSchema)
  .handler(async ({ data }) => {
    const invitee = await inviteeService.findByName(data);
    if (!invitee) throw notFound();

    setSession({ inviteeId: invitee.id, inviteGroupId: invitee.inviteGroupId });
    return invitee;
  });
