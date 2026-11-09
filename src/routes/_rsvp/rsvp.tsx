import { getEvents } from "@/features/events/events.functions";
import { hasCompletedAllRsvps } from "@/features/rsvps/rsvps.functions";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_rsvp/rsvp")({
  beforeLoad: async () => {
    const [[first], completed] = await Promise.all([
      getEvents(),
      hasCompletedAllRsvps(),
    ]);
    if (!first || completed) throw redirect({ to: "/home" });

    throw redirect({
      to: "/events/$eventId",
      params: { eventId: first.id },
    });
  },
});
