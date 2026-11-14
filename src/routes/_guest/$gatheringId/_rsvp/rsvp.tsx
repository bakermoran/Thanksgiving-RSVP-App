import { getEvents } from "@/functions/events.functions";
import { hasCompletedAllRsvps } from "@/functions/rsvps.functions";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/$gatheringId/_rsvp/rsvp")({
  beforeLoad: async ({ params }) => {
    const [[first], completed] = await Promise.all([
      getEvents(),
      hasCompletedAllRsvps(),
    ]);
    if (!first || completed)
      throw redirect({ to: "/$gatheringId/home", params });

    throw redirect({
      to: "/$gatheringId/events/$eventId",
      params: { ...params, eventId: first.id },
    });
  },
});
