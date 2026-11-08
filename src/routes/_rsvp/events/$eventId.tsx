import { RsvpForm } from "@/features/rsvps/components/RsvpForm";
import { getEventRsvps } from "@/features/rsvps/rsvps.functions";
import {
  Link,
  createFileRoute,
  getRouteApi,
  useNavigate,
} from "@tanstack/react-router";
import { z } from "zod";

const rsvpLayout = getRouteApi("/_rsvp");

export const Route = createFileRoute("/_rsvp/events/$eventId")({
  params: {
    parse: (p) => ({
      eventId: z.coerce.number().int().parse(p.eventId),
    }),
    stringify: (p) => ({ eventId: String(p.eventId) }),
  },
  loader: ({ params }) => getEventRsvps({ data: { id: params.eventId } }),
  gcTime: 0,
  component: EventPage,
});

function EventPage() {
  const navigate = useNavigate();
  const { event, rsvps } = Route.useLoaderData();
  const { inviteGroup, events } = rsvpLayout.useLoaderData();

  const index = events.findIndex((e) => e.id === event.id);
  const prev = events[index - 1];
  const next = events[index + 1];

  const onSaved = () => {
    if (next) {
      navigate({ to: "/events/$eventId", params: { eventId: next.id } });
    } else {
      navigate({ to: "/summary" });
    }
  };

  return (
    <div>
      <h1>{event.name}</h1>

      <RsvpForm
        key={event.id}
        eventId={event.id}
        invitees={inviteGroup.invitees}
        rsvps={rsvps}
        submitLabel={next ? "Next event" : "Review"}
        onSaved={onSaved}
      />

      {prev && (
        <Link to="/events/$eventId" params={{ eventId: prev.id }}>
          Back
        </Link>
      )}
    </div>
  );
}
