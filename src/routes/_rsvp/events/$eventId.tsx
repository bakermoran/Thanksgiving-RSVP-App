import { EventProgress } from "@/components/events/EventProgress";
import { RsvpForm } from "@/components/rsvps/RsvpForm";
import {
  getEventRsvps,
  hasCompletedAllRsvps,
} from "@/functions/rsvps.functions";
import { mapsLink, toAddressString } from "@/shared/address";
import { formatEventTimeRange } from "@/shared/date";
import type { Event } from "@/shared/types";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { Link } from "@/ui/link";
import { PageHeader } from "@/ui/page-header";
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
  loader: async ({ params }) => {
    const [data, completedAll] = await Promise.all([
      getEventRsvps({ data: { id: params.eventId } }),
      hasCompletedAllRsvps(),
    ]);
    return { ...data, completedAll };
  },
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
      <p>{formatEventTimeRange(event.startTime, event.endTime)}</p>
    </h3>
  );
};

function EventPage() {
  const navigate = useNavigate();
  const { event, rsvps, completedAll } = Route.useLoaderData();
  const { inviteGroup, events } = rsvpLayout.useLoaderData();

  const index = events.findIndex((e) => e.id === event.id);
  const prev = events[index - 1];
  const next = events[index + 1];

  const onSaved = () => {
    if (next && !completedAll) {
      navigate({ to: "/events/$eventId", params: { eventId: next.id } });
    } else {
      navigate({ to: "/home" });
    }
  };

  const submitLabel = completedAll ? "Save" : next ? "Next" : "Review";

  const onProgressButtonClick = (id: number) => {
    navigate({ to: "/events/$eventId", params: { eventId: id } });
  };

  return (
    <div>
      <PageHeader
        illustration={
          <EventProgress
            events={events}
            current={index}
            onProgressButtonClick={onProgressButtonClick}
          />
        }
        eyebrow={`Event ${index + 1} of ${events.length}`}
        title={event.name}
        detail={
          <>
            <EventDetail event={event} />
          </>
        }
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
          submitLabel={submitLabel}
          onSaved={onSaved}
        />
      </Card>

      {prev && !completedAll && (
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
