import { db } from "@/db/client";
import { type PublicUser, usersTable } from "@/db/schema/user";
import { hashPassword, verifyPassword } from "@/utils/password";

const normalizeEmail = (email: string) => email.trim().toLowerCase();
let dummyHash: Promise<string> | undefined;

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<PublicUser> {
  const { password: _hash, ...user } = db
    .insert(usersTable)
    .values({
      email: normalizeEmail(email),
      password: await hashPassword(password),
    })
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

export async function verifyUserCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<PublicUser | null> {
  const user = await db.query.usersTable.findFirst({
    where: { email: normalizeEmail(email) },
  });

  if (!user) {
    dummyHash ??= hashPassword("not-a-real-password");
    await verifyPassword(password, await dummyHash);
    return null;
  }

  if (!(await verifyPassword(password, user.password))) return null;

  const { password: _hash, ...publicUser } = user;
  return publicUser;
}
