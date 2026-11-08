import { eventsTable } from "@/db/schema/event";
import { inviteGroupsTable } from "@/db/schema/inviteGroup";
import { inviteeAliasesTable, inviteesTable } from "@/db/schema/invitee";
import { obligationsTable } from "@/db/schema/obligation";
import { rsvpsTable } from "@/db/schema/rsvp";

export default {
  inviteGroupsTable,
  inviteesTable,
  inviteeAliasesTable,
  rsvpsTable,
  eventsTable,
  obligationsTable,
};
