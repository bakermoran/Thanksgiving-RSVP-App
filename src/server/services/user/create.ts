import { type PublicUser } from "@/server/db/schema/user";
import * as userRepository from "@/server/repositories/userRepository";

import { normalizeEmail } from "./email";
import { hashPassword } from "./password";

export async function create({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<PublicUser> {
  return userRepository.insertUser({
    email: normalizeEmail(email),
    passwordHash: await hashPassword(password),
  });
}
