import * as userRepository from "@/server/repositories/userRepository";

export function get(id: number) {
  return userRepository.getUser(id);
}
