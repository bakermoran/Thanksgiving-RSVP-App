import * as eventService from "@/server/services/event";
import * as inviteGroupService from "@/server/services/inviteGroup";
import * as inviteeService from "@/server/services/invitee";
import * as rsvpService from "@/server/services/rsvp";
import {
  addInviteeSchema,
  moveInviteeSchema,
  removeInviteeSchema,
} from "@/shared/schemas/admin";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { adminAuthMiddleware } from "./middleware";

export const getAdminDashboard = createServerFn({
  method: "GET",
})
  .middleware([adminAuthMiddleware])
  .handler(async () => {
    const [events, inviteGroups, rsvps] = await Promise.all([
      eventService.list(),
      inviteGroupService.list(),
      rsvpService.listAll(),
    ]);
    return { events, inviteGroups, rsvps };
  });

export const addInvitee = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(addInviteeSchema)
  .handler(async ({ data }) => inviteeService.add(data));

export const moveInvitee = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(moveInviteeSchema)
  .handler(async ({ data }) => {
    const invitee = await inviteeService.move(data);
    if (!invitee) throw notFound();
    return invitee;
  });

export const removeInvitee = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(removeInviteeSchema)
  .handler(async ({ data }) => {
    const invitee = await inviteeService.remove(data.inviteeId);
    if (!invitee) throw notFound();
    return invitee;
  });
