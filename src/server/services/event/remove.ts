import * as eventRepository from "@/server/repositories/eventRepository";

export function remove(id: number) {
  return eventRepository.deleteEvent(id);
}
