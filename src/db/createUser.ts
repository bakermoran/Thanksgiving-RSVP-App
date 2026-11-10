import { createUser } from "@/repositories/userRepository";

const MIN_PASSWORD_LENGTH = 12;

const [email] = process.argv.slice(2);
if (!email) {
  console.error("Usage: bun run user:create <email>");
  process.exit(1);
}

// Read from stdin rather than argv so the password stays out of shell history.
const password = prompt("Password:");
if (!password || password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  process.exit(1);
}

try {
  const user = await createUser({ email, password });
  console.log(`Created admin user ${user.email} (id ${user.id})`);
} catch (error) {
  if (String(error).includes("UNIQUE constraint failed")) {
    console.error(`A user with email ${email} already exists.`);
  } else {
    console.error(error);
  }
  process.exit(1);
}
