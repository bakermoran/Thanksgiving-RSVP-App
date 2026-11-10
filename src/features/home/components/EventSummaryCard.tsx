import type { Event } from "@/db/schema/event";
import type { Invitee } from "@/db/schema/invitee";
import { ResponseBadge } from "@/features/rsvps/components/ResponseBadge";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { Link } from "@/ui/link";
import { ListItem } from "@/ui/list";
import { mapsLink, toAddressString } from "@/utils/address";
import { formatEventTime } from "@/utils/date";

interface EventSummaryCardProps {
  event: Event;
  invitees: Invitee[];
  responses: Map<number, boolean>;
  tilt: "left" | "right";
}

export const EventSummaryCard = ({
  event,
  invitees,
  responses,
  tilt,
}: EventSummaryCardProps) => {
  const needsResponse = invitees.some((i) => !responses.has(i.id));

  return (
    <Card tilt={tilt} className="flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-3xl leading-tight text-cocoa">
          {event.name}
        </h3>
        <Illustration
          name={tilt === "right" ? "oak-leaf" : "maple-leaf"}
          className="w-9 shrink-0 rotate-12"
        />
      </div>

      <p className="mt-1 text-sm font-bold text-cocoa">
        {formatEventTime(event.startTime)} - {formatEventTime(event.endTime)}
      </p>
      <a
        href={mapsLink(event)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-cocoa underline decoration-harvest/50 underline-offset-4 hover:text-cranberry"
      >
        {toAddressString(event)}
      </a>

      <ul className="mt-4 mb-5">
        {invitees.map((invitee) => (
          <ListItem key={invitee.id} className="py-2 text-base">
            <span className="flex-1">{invitee.firstName}</span>
            <ResponseBadge isAttending={responses.get(invitee.id)} />
          </ListItem>
        ))}
      </ul>

      <div className="mt-auto">
        <Link
          to="/events/$eventId"
          params={{ eventId: event.id }}
          variant={needsResponse ? "primary" : "ghost"}
          size="sm"
        >
          {needsResponse ? (
            <>
              RSVP now <span aria-hidden>→</span>
            </>
          ) : (
            <>
              <span aria-hidden>✎</span> Change RSVP
            </>
          )}
        </Link>
      </div>
    </Card>
  );
};
