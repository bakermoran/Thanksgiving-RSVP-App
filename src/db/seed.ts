import { createUser } from "@/repositories/userRepository";
import { reset, seed } from "drizzle-seed";

import { db } from "./client";
import { eventsTable } from "./schema/event";
import { inviteGroupsTable } from "./schema/inviteGroup";
import { inviteesTable } from "./schema/invitee";
import {
  obligationCategoriesTable,
  obligationsTable,
} from "./schema/obligation";
import { rsvpsTable } from "./schema/rsvp";
import { usersTable } from "./schema/user";

const schema = {
  inviteesTable,
  inviteGroupsTable,
  eventsTable,
  obligationsTable,
  obligationCategoriesTable,
};

// Include rsvps in the reset so FK constraints don't block wiping invitees/events.
await reset(db, { ...schema, rsvpsTable, usersTable });

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
      startTime: f.timestamp({ min: new Date(2020, 0, 1), max: new Date() }),
      endTime: f.timestamp({ min: new Date(2020, 0, 1), max: new Date() }),
      address1: f.streetAddress(),
      address2: undefined,
      city: f.city(),
      state: f.state(),
      zip: f.postcode(),
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
  obligationCategoriesTable: {
    count: 3,
    columns: {
      name: f.loremIpsum({ sentencesCount: 1 }),
      sortOrder: f.int({ minValue: 1, maxValue: 100, isUnique: true }),
      createdAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
      updatedAt: f.date({ minDate: new Date(2020, 0, 1), maxDate: new Date() }),
    },
  },
}));

// Users go through createUser so the password is hashed like in prod.
const admin = await createUser({
  email: "admin@example.com",
  password: "gobblegobble",
});

console.log("Seeded local database");
console.log(`Admin login: ${admin.email} / gobblegobble`);
