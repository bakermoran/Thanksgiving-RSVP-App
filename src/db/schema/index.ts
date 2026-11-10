import { eventsTable } from "@/db/schema/event";
import { inviteTable } from "@/db/schema/invite";
import { inviteGroupsTable } from "@/db/schema/inviteGroup";
import { inviteeAliasesTable, inviteesTable } from "@/db/schema/invitee";
import {
  obligationCategoriesTable,
  obligationsTable,
} from "@/db/schema/obligation";
import { rsvpsTable } from "@/db/schema/rsvp";

export default {
  inviteGroupsTable,
  inviteesTable,
  inviteeAliasesTable,
  rsvpsTable,
  eventsTable,
  obligationsTable,
  inviteTable,
  obligationCategoriesTable,
};
