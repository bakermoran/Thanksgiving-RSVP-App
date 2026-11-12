import * as inviteRepository from "@/server/repositories/inviteRepository";
import { randomBytes } from "node:crypto";

export function create({ createdBy }: { createdBy: number }) {
  const code = randomBytes(8).toString("hex");
  return inviteRepository.createInvite({ code, createdBy });
}
