import { type PublicUser } from "@/server/db/schema/user";
import * as userRepository from "@/server/repositories/userRepository";

import { normalizeEmail } from "./email";
import { hashPassword, verifyPassword } from "./password";

let dummyHash: Promise<string> | undefined;

export async function verifyCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<PublicUser | null> {
  const user = await userRepository.getUserWithPasswordByEmail(
    normalizeEmail(email),
  );

  if (!user) {
    dummyHash ??= hashPassword("not-a-real-password");
    await verifyPassword(password, await dummyHash);
    return null;
  }

  if (!(await verifyPassword(password, user.password))) return null;

  const { password: _hash, ...publicUser } = user;
  return publicUser;
}
