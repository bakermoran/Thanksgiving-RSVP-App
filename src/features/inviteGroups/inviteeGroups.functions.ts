import { getInviteGroup } from "@/repositories/inviteGroupRepository";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { requireInviteGroupId } from "./inviteGroupAccess";

export const getMyInviteGroup = createServerFn({
  method: "GET",
}).handler(async () => {
  const inviteGroupId = requireInviteGroupId();

  const inviteGroup = await getInviteGroup(inviteGroupId);
  if (!inviteGroup) throw redirect({ to: "/" });

  return inviteGroup;
});
