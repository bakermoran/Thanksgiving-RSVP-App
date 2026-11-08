import type { Event } from "@/db/schema/event";
import { EventProgress } from "@/features/events/components/EventProgress";
import { RsvpForm } from "@/features/rsvps/components/RsvpForm";
import { getEventRsvps } from "@/features/rsvps/rsvps.functions";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { Link } from "@/ui/link";
import { PageHeader } from "@/ui/page-header";
import { mapsLink, toAddressString } from "@/utils/address";
import { formatEventTime } from "@/utils/date";
import {
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

const EventDetail = ({ event }: { event: Event }) => {
  return (
    <h3 className="text-cocoa  mt-2 text-md font-bold">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-bark"
        href={mapsLink(event)}
      >
        {toAddressString(event)}
      </a>
      <p>{formatEventTime(event.time)}</p>
    </h3>
  );
};

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
      <PageHeader
        illustration={<EventProgress count={events.length} current={index} />}
        eyebrow={`Event ${index + 1} of ${events.length}`}
        title={event.name}
        detail={<EventDetail event={event} />}
        size="md"
      />

      <Card>
        <Illustration
          name="pumpkin"
          className="absolute -top-8 -right-3 w-16 rotate-12 sm:-right-10 sm:w-24"
        />
        <RsvpForm
          key={event.id}
          eventId={event.id}
          invitees={inviteGroup.invitees}
          rsvps={rsvps}
          submitLabel={next ? "Next" : "Review"}
          onSaved={onSaved}
        />
      </Card>

      {prev && (
        <div className="mt-8 text-center">
          <Link
            to="/events/$eventId"
            params={{ eventId: prev.id }}
            variant="text"
            className="text-lg"
          >
            <span aria-hidden>←</span> Back
          </Link>
        </div>
      )}
    </div>
  );
}
