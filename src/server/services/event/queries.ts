import * as eventRepository from "@/server/repositories/eventRepository";

export function list() {
  return eventRepository.getEvents();
}

export function get(id: number) {
  return eventRepository.getEvent(id);
}
