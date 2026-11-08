import schemas from "@/db/schema";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations({ ...schemas }, (r) => ({
  inviteGroupsTable: {
    invitees: r.many.inviteesTable({
      from: r.inviteGroupsTable.id,
      to: r.inviteesTable.inviteGroupId,
    }),
  },
  inviteesTable: {
    inviteGroup: r.one.inviteGroupsTable({
      from: r.inviteesTable.inviteGroupId,
      to: r.inviteGroupsTable.id,
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
  },
  eventsTable: {
    rsvps: r.many.rsvpsTable({
      from: r.eventsTable.id,
      to: r.rsvpsTable.eventId,
    }),
  },
}));
