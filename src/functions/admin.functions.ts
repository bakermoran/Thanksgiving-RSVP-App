import * as eventService from "@/server/services/event";
import * as inviteGroupService from "@/server/services/inviteGroup";
import * as inviteeService from "@/server/services/invitee";
import * as obligationService from "@/server/services/obligation";
import * as rsvpService from "@/server/services/rsvp";
import {
  addInviteeSchema,
  addObligationCategorySchema,
  addObligationSchema,
  adminEventIdSchema,
  createEventSchema,
  destroyObligationCategorySchema,
  destroyObligationSchema,
  moveInviteeSchema,
  removeEventSchema,
  removeInviteGroupSchema,
  removeInviteeSchema,
  renameInviteeSchema,
  renameObligationCategorySchema,
  renameObligationSchema,
  reorderObligationCategoriesSchema,
  updateEventSchema,
} from "@/shared/schemas/admin";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { adminAuthMiddleware } from "./middleware";

export const getAdminEvents = createServerFn({
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

export const getAdminEvent = createServerFn({
  method: "GET",
})
  .middleware([adminAuthMiddleware])
  .validator(adminEventIdSchema)
  .handler(async ({ data }) => {
    const event = await eventService.get(data.id);
    if (!event) throw notFound();
    return event;
  });

export const getAdminGuests = createServerFn({
  method: "GET",
})
  .middleware([adminAuthMiddleware])
  .handler(async () => inviteGroupService.list());

export const getAdminObligations = createServerFn({
  method: "GET",
})
  .middleware([adminAuthMiddleware])
  .handler(async () => obligationService.listCategories());

export const addObligation = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(addObligationSchema)
  .handler(async ({ data }) => obligationService.createUnassigned(data));

export const addObligationCategory = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(addObligationCategorySchema)
  .handler(async ({ data }) => obligationService.createCategory(data));

export const renameObligationCategory = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(renameObligationCategorySchema)
  .handler(async ({ data }) => {
    const category = await obligationService.renameCategory(data);
    if (!category) throw notFound();
    return category;
  });

export const reorderObligationCategories = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(reorderObligationCategoriesSchema)
  .handler(async ({ data }) => obligationService.reorderCategories(data));

export const renameObligation = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(renameObligationSchema)
  .handler(async ({ data }) => {
    const obligation = await obligationService.rename(data);
    if (!obligation) throw notFound();
    return obligation;
  });

export const destroyObligationCategory = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(destroyObligationCategorySchema)
  .handler(async ({ data }) => {
    const category = await obligationService.destroyCategory(data);
    if (!category) throw notFound();
    return category;
  });

export const destroyObligation = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(destroyObligationSchema)
  .handler(async ({ data }: { data: { id: number } }) => {
    const obligation = await obligationService.destroy({
      id: data.id,
    });
    if (!obligation) throw notFound();
    return obligation;
  });

export const createEvent = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(createEventSchema)
  .handler(async ({ data }) => eventService.create(data));

export const removeEvent = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(removeEventSchema)
  .handler(async ({ data }) => {
    const event = await eventService.remove(data.id);
    if (!event) throw notFound();
    return event;
  });

export const updateEvent = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(updateEventSchema)
  .handler(async ({ data }) => {
    const event = await eventService.update(data);
    if (!event) throw notFound();
    return event;
  });

export const addInvitee = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(addInviteeSchema)
  .handler(async ({ data }) => inviteeService.add(data));

export const renameInvitee = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(renameInviteeSchema)
  .handler(async ({ data }) => {
    const invitee = await inviteeService.rename(data);
    if (!invitee) throw notFound();
    return invitee;
  });

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

export const removeInviteGroup = createServerFn({
  method: "POST",
})
  .middleware([adminAuthMiddleware])
  .validator(removeInviteGroupSchema)
  .handler(async ({ data }) => {
    const group = await inviteGroupService.remove(data.inviteGroupId);
    if (!group) throw notFound();
    return group;
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
