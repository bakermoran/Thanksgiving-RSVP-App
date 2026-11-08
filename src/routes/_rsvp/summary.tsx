import { getMyRsvps } from "@/features/rsvps/rsvps.functions";
import { Card } from "@/features/ui/card";
import { cn } from "@/features/ui/cn";
import { Link, createFileRoute, getRouteApi } from "@tanstack/react-router";

const rsvpLayout = getRouteApi("/_rsvp");

export const Route = createFileRoute("/_rsvp/summary")({
  loader: () => getMyRsvps(),
  gcTime: 0,
  component: Summary,
});

const rsvpKey = (eventId: number, inviteeId: number) =>
  `${eventId}:${inviteeId}`;

function Summary() {
  const { inviteGroup, events } = rsvpLayout.useLoaderData();
  const rsvps = Route.useLoaderData();

  const responses = new Map<string, boolean>(
    rsvps.map((r) => [rsvpKey(r.eventId, r.inviteeId), r.isAttending]),
  );

  return (
    <div>
      <header className="mb-10 text-center">
        <img
          src="/images/pie.svg"
          alt=""
          className="mx-auto w-36 motion-safe:animate-wobble"
        />
        <p className="eyebrow mt-3">Here's what's cookin'</p>
        <h1 className="title-retro mt-2 text-6xl">Your RSVPs</h1>
      </header>

      <div className="space-y-8">
        {events.map((event, i) => (
          <Card
            key={event.id}
            className={i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"}
          >
            <section>
              <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="font-display text-3xl leading-tight text-cocoa">
                  {event.name}
                </h2>
                <img
                  src={
                    i % 2 ? "/images/oak-leaf.svg" : "/images/maple-leaf.svg"
                  }
                  alt=""
                  className="w-10 shrink-0 rotate-12"
                />
              </div>
              <ul className="mb-5">
                {inviteGroup.invitees.map((invitee) => {
                  const isAttending = responses.get(
                    rsvpKey(event.id, invitee.id),
                  );
                  return (
                    <li
                      key={invitee.id}
                      className="flex items-center gap-3 border-b-2 border-dashed border-harvest/40 py-2 text-lg font-medium last:border-b-0"
                    >
                      <img
                        src="/images/acorn.svg"
                        alt=""
                        className="h-5 shrink-0"
                      />
                      <span className="flex-1">
                        {invitee.firstName} {invitee.lastName}
                      </span>
                      <ResponseBadge isAttending={isAttending} />
                    </li>
                  );
                })}
              </ul>
              <Link
                to="/events/$eventId"
                params={{ eventId: event.id }}
                className="inline-flex items-center gap-2 rounded-full border-3 border-bark bg-mustard px-5 py-1.5 font-bold shadow-chunky-sm transition hover:-translate-y-0.5 hover:bg-pumpkin hover:text-cream active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                <span aria-hidden>✎</span> Edit
              </Link>
            </section>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ResponseBadge({ isAttending }: { isAttending: boolean | undefined }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border-3 border-bark px-3 py-0.5 text-base font-bold",
        isAttending === true && "bg-olive text-cream",
        isAttending === false && "bg-cranberry text-cream",
        isAttending === undefined && "border-dashed bg-cream text-cocoa",
      )}
    >
      {isAttending === undefined
        ? "No response"
        : isAttending
          ? "Attending"
          : "Not attending"}
    </span>
  );
}
