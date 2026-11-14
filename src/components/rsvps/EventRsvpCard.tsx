import type { Event } from "@/shared/types";
import type { Invitee } from "@/shared/types";
import { Card } from "@/ui/guest/card";
import { Illustration } from "@/ui/guest/illustration";
import { Link } from "@/ui/guest/link";
import { ListItem } from "@/ui/guest/list";
import { getRouteApi } from "@tanstack/react-router";

import { ResponseBadge } from "./ResponseBadge";

const rsvpLayout = getRouteApi("/_guest/$gatheringId/_rsvp");

interface EventRsvpCardProps {
  event: Event;
  invitees: Invitee[];
  responses: Map<number, boolean>;
  tilt: "left" | "right";
}

export const EventRsvpCard = ({
  event,
  invitees,
  responses,
  tilt,
}: EventRsvpCardProps) => {
  const { gatheringId } = rsvpLayout.useParams();

  return (
    <Card tilt={tilt}>
      <section>
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-display text-3xl leading-tight text-cocoa">
            {event.name}
          </h2>
          <Illustration
            name={tilt === "right" ? "oak-leaf" : "maple-leaf"}
            className="w-10 shrink-0 rotate-12"
          />
        </div>
        <ul className="mb-5">
          {invitees.map((invitee) => (
            <ListItem key={invitee.id}>
              <span className="flex-1">
                {invitee.firstName} {invitee.lastName}
              </span>
              <ResponseBadge isAttending={responses.get(invitee.id)} />
            </ListItem>
          ))}
        </ul>
        <Link
          to="/$gatheringId/events/$eventId"
          params={{ gatheringId, eventId: event.id }}
        >
          <span aria-hidden>✎</span> Edit
        </Link>
      </section>
    </Card>
  );
};
