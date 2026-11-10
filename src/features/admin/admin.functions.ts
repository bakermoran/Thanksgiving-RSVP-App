import { adminAuthMiddleware } from "@/features/adminAuth/adminAuth.middleware";
import { getEvents } from "@/repositories/eventRepository";
import { getAllInviteGroups } from "@/repositories/inviteGroupRepository";
import {
  createInvitee,
  deleteInvitee,
  moveInvitee as moveInviteeDb,
} from "@/repositories/inviteeRepository";
import { getAllRsvps } from "@/repositories/rsvpRepository";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import {
  addInviteeSchema,
  moveInviteeSchema,
  removeInviteeSchema,
} from "./admin.schemas";

export const getAdminDashboard = createServerFn({
  method: "GET",
})
  .middleware([adminAuthMiddleware])
  .handler(async () => {
    const [events, inviteGroups, rsvps] = await Promise.all([
      getEvents(),
      getAllInviteGroups(),
      getAllRsvps(),
    ]);
    return { events, inviteGroups, rsvps };
  });

export const addInvitee = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(addInviteeSchema)
  .handler(async ({ data }) => createInvitee(data));

export const moveInvitee = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(moveInviteeSchema)
  .handler(async ({ data }) => {
    const invitee = await moveInviteeDb(data);
    if (!invitee) throw notFound();
    return invitee;
  });

export const removeInvitee = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(removeInviteeSchema)
  .handler(async ({ data }) => {
    const invitee = await deleteInvitee(data.inviteeId);
    if (!invitee) throw notFound();
    return invitee;
  });
