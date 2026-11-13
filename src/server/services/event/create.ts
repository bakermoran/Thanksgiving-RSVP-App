import * as eventRepository from "@/server/repositories/eventRepository";
import { fromDateTimeLocal } from "@/shared/date";
import type { CreateEventInput } from "@/shared/schemas/admin";

export function create({
  startTime,
  endTime,
  address2,
  ...event
}: CreateEventInput) {
  return eventRepository.createEvent({
    ...event,
    address2: address2 || null,
    startTime: fromDateTimeLocal(startTime),
    endTime: fromDateTimeLocal(endTime),
  });
}
