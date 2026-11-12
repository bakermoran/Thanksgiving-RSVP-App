import { db } from "@/server/db/client";
import { type PublicUser, usersTable } from "@/server/db/schema/user";

export function insertUser({
  email,
  passwordHash,
}: {
  email: string;
  passwordHash: string;
}): PublicUser {
  const { password: _hash, ...user } = db
    .insert(usersTable)
    .values({ email, password: passwordHash })
    .returning()
    .get();
  return user;
}

export function getUser(id: number): Promise<PublicUser | undefined> {
  return db.query.usersTable.findFirst({
    where: { id },
    columns: { password: false },
  });
}

export function getUserWithPasswordByEmail(email: string) {
  return db.query.usersTable.findFirst({ where: { email } });
}
