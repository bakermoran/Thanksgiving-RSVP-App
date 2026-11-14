import { ResponseBadge } from "@/components/rsvps/ResponseBadge";
import { mapsLink, toAddressString } from "@/shared/address";
import { formatEventTimeRange } from "@/shared/date";
import type { Event } from "@/shared/types";
import type { Invitee } from "@/shared/types";
import { Card } from "@/ui/guest/card";
import { Illustration } from "@/ui/guest/illustration";
import { Link } from "@/ui/guest/link";
import { ListItem } from "@/ui/guest/list";
import { getRouteApi } from "@tanstack/react-router";

const rsvpLayout = getRouteApi("/_guest/$gatheringId/_rsvp");

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
  const { gatheringId } = rsvpLayout.useParams();
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
        {formatEventTimeRange(event.startTime, event.endTime)}
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
          to="/$gatheringId/events/$eventId"
          params={{ gatheringId, eventId: event.id }}
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
