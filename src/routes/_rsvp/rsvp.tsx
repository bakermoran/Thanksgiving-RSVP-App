import { getEvents } from "@/features/events/events.functions";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_rsvp/rsvp")({
  beforeLoad: async () => {
    const [first] = await getEvents();
    if (!first) throw redirect({ to: "/summary" });

    throw redirect({
      to: "/events/$eventId",
      params: { eventId: first.id },
    });
  },
});
