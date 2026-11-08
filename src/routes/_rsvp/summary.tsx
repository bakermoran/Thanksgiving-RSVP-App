import { EventRsvpCard } from "@/features/rsvps/components/EventRsvpCard";
import { getMyRsvps } from "@/features/rsvps/rsvps.functions";
import { Illustration } from "@/ui/illustration";
import { Link } from "@/ui/link";
import { PageHeader } from "@/ui/page-header";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

const rsvpLayout = getRouteApi("/_rsvp");

export const Route = createFileRoute("/_rsvp/summary")({
  loader: () => getMyRsvps(),
  gcTime: 0,
  component: Summary,
});

function Summary() {
  const { inviteGroup, events } = rsvpLayout.useLoaderData();
  const rsvps = Route.useLoaderData();

  const responsesFor = (eventId: number) =>
    new Map(
      rsvps
        .filter((r) => r.eventId === eventId)
        .map((r) => [r.inviteeId, r.isAttending]),
    );

  return (
    <div>
      <PageHeader
        illustration={
          <Illustration name="pie" animate="wobble" className="mx-auto w-36" />
        }
        eyebrow="Here's what's cookin'"
        title="Your RSVPs"
      />

      <div className="mb-12 flex justify-center">
        <Link to="/recipes" className="-rotate-1 text-lg hover:rotate-0">
          <Illustration name="drumstick" className="h-6" />
          Who's bringing what?
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="space-y-8">
        {events.map((event, i) => (
          <EventRsvpCard
            key={event.id}
            event={event}
            invitees={inviteGroup.invitees}
            responses={responsesFor(event.id)}
            tilt={i % 2 ? "right" : "left"}
          />
        ))}
      </div>
    </div>
  );
}
