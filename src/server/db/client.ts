import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { relations } from "./relations";

export const db = drizzle({
  client: new Database(process.env.DB_FILE_NAME!),
  relations,
});
