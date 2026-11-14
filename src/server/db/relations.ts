import schemas from "@/server/db/schema";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations({ ...schemas }, (r) => ({
  gatheringsTable: {
    invitees: r.many.inviteesTable({
      from: r.gatheringsTable.id,
      to: r.inviteesTable.gatheringId,
    }),
    events: r.many.eventsTable({
      from: r.gatheringsTable.id,
      to: r.eventsTable.gatheringId,
    }),
    rsvps: r.many.rsvpsTable({
      from: r.gatheringsTable.id,
      to: r.rsvpsTable.gatheringId,
    }),
    obligations: r.many.obligationsTable({
      from: r.gatheringsTable.id,
      to: r.obligationsTable.gatheringId,
    }),
    obligationCategories: r.many.obligationCategoriesTable({
      from: r.gatheringsTable.id,
      to: r.obligationCategoriesTable.gatheringId,
    }),
    invites: r.many.invitesTable({
      from: r.gatheringsTable.id,
      to: r.invitesTable.gatheringId,
    }),
    inviteGroups: r.many.inviteGroupsTable({
      from: r.gatheringsTable.id,
      to: r.inviteGroupsTable.gatheringId,
    }),
  },
  inviteGroupsTable: {
    invitees: r.many.inviteesTable({
      from: r.inviteGroupsTable.id,
      to: r.inviteesTable.inviteGroupId,
    }),
    gathering: r.one.gatheringsTable({
      from: r.inviteGroupsTable.gatheringId,
      to: r.gatheringsTable.id,
      optional: false,
    }),
  },
  inviteesTable: {
    inviteGroup: r.one.inviteGroupsTable({
      from: r.inviteesTable.inviteGroupId,
      to: r.inviteGroupsTable.id,
      optional: false,
    }),
    obligations: r.many.obligationsTable({
      from: r.inviteesTable.id,
      to: r.obligationsTable.inviteeId,
    }),
    aliases: r.many.inviteeAliasesTable({
      from: r.inviteesTable.id,
      to: r.inviteeAliasesTable.inviteeId,
    }),
    gathering: r.one.gatheringsTable({
      from: r.inviteesTable.gatheringId,
      to: r.gatheringsTable.id,
      optional: false,
    }),
  },
  rsvpsTable: {
    invitee: r.one.inviteesTable({
      from: r.rsvpsTable.inviteeId,
      to: r.inviteesTable.id,
      optional: false,
    }),
    event: r.one.eventsTable({
      from: r.rsvpsTable.eventId,
      to: r.eventsTable.id,
      optional: false,
    }),
    gathering: r.one.gatheringsTable({
      from: r.rsvpsTable.gatheringId,
      to: r.gatheringsTable.id,
      optional: false,
    }),
  },
  eventsTable: {
    rsvps: r.many.rsvpsTable({
      from: r.eventsTable.id,
      to: r.rsvpsTable.eventId,
    }),
    gathering: r.one.gatheringsTable({
      from: r.eventsTable.gatheringId,
      to: r.gatheringsTable.id,
      optional: false,
    }),
  },
  inviteeAliasesTable: {
    invitee: r.one.inviteesTable({
      from: r.inviteeAliasesTable.inviteeId,
      to: r.inviteesTable.id,
      optional: false,
    }),
  },
  obligationsTable: {
    invitee: r.one.inviteesTable({
      from: r.obligationsTable.inviteeId,
      to: r.inviteesTable.id,
    }),
    gathering: r.one.gatheringsTable({
      from: r.obligationsTable.gatheringId,
      to: r.gatheringsTable.id,
      optional: false,
    }),
    category: r.one.obligationCategoriesTable({
      from: r.obligationsTable.categoryId,
      to: r.obligationCategoriesTable.id,
    }),
  },
  obligationCategoriesTable: {
    obligations: r.many.obligationsTable({
      from: r.obligationCategoriesTable.id,
      to: r.obligationsTable.categoryId,
    }),
    gathering: r.one.gatheringsTable({
      from: r.obligationCategoriesTable.gatheringId,
      to: r.gatheringsTable.id,
      optional: false,
    }),
  },
  usersTable: {},
}));
