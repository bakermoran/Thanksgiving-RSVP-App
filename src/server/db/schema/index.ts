import { eventsTable } from "@/server/db/schema/event";
import { invitesTable } from "@/server/db/schema/invite";
import { inviteGroupsTable } from "@/server/db/schema/inviteGroup";
import { inviteeAliasesTable, inviteesTable } from "@/server/db/schema/invitee";
import {
  obligationCategoriesTable,
  obligationsTable,
} from "@/server/db/schema/obligation";
import { rsvpsTable } from "@/server/db/schema/rsvp";
import { usersTable } from "@/server/db/schema/user";

export default {
  usersTable,
  inviteGroupsTable,
  inviteesTable,
  inviteeAliasesTable,
  rsvpsTable,
  eventsTable,
  obligationsTable,
  invitesTable,
  obligationCategoriesTable,
};
