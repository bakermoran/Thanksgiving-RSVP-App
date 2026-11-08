import { RsvpForm } from "@/features/rsvps/components/RsvpForm";
import { getEventRsvps } from "@/features/rsvps/rsvps.functions";
import { Card } from "@/features/ui/card";
import { cn } from "@/features/ui/cn";
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
      <header className="mb-10 text-center">
        <ol aria-hidden className="mb-4 flex items-center justify-center gap-2">
          {events.map((e, i) => (
            <li
              key={e.id}
              className={cn(
                "rounded-full border-3 border-bark transition",
                i < index && "size-4 bg-olive",
                i === index && "size-6 bg-pumpkin shadow-chunky-sm",
                i > index && "size-4 bg-cream",
              )}
            />
          ))}
        </ol>
        <p className="eyebrow">
          Event {index + 1} of {events.length}
        </p>
        <h1 className="title-retro mt-2 text-5xl sm:text-6xl">{event.name}</h1>
      </header>

      <Card>
        <img
          src="/images/pumpkin.svg"
          alt=""
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
            className="inline-flex items-center gap-1 text-lg font-bold text-cocoa underline decoration-pumpkin decoration-wavy decoration-2 underline-offset-6 hover:text-cranberry"
          >
            <span aria-hidden>←</span> Back
          </Link>
        </div>
      )}
    </div>
  );
}
