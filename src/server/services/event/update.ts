import * as eventRepository from "@/server/repositories/eventRepository";
import { fromDateTimeLocal } from "@/shared/date";
import type { UpdateEventInput } from "@/shared/schemas/admin";

export function update({ id, name, startTime, endTime }: UpdateEventInput) {
  return eventRepository.updateEvent(id, {
    name,
    startTime: fromDateTimeLocal(startTime),
    endTime: fromDateTimeLocal(endTime),
  });
}
