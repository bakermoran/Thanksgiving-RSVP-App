import { reset, seed } from "drizzle-seed";

import { db } from "./client";
import { eventsTable } from "./schema/event";
import { inviteGroupsTable } from "./schema/inviteGroup";
import { inviteesTable } from "./schema/invitee";
import { obligationsTable } from "./schema/obligation";
import { rsvpsTable } from "./schema/rsvp";

const schema = {
  inviteesTable,
  inviteGroupsTable,
  eventsTable,
  obligationsTable,
};

// Include rsvps in the reset so FK constraints don't block wiping invitees/events.
await reset(db, { ...schema, rsvpsTable });

await seed(db, schema, { seed: 1 }).refine((f) => ({
  inviteesTable: {
    count: 10,
    columns: {
      firstName: f.firstName(),
      lastName: f.lastName(),
      inviteGroupId: f.int({ minValue: 1, maxValue: 2 }),
      createdAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
      updatedAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
    },
  },
  inviteGroupsTable: {
    count: 2,
    columns: {
      createdAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
      updatedAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
    },
  },
  eventsTable: {
    count: 5,
    columns: {
      name: f.loremIpsum({ sentencesCount: 1 }),
      createdAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
      updatedAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
    },
  },
  obligationsTable: {
    count: 10,
    columns: {
      name: f.loremIpsum({ sentencesCount: 1 }),
      createdAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
      updatedAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
    },
  },
}));

console.log("Seeded local database");
