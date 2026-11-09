import { Event } from "@/db/schema/event";
import { InviteGroupWithInvitees } from "@/db/schema/inviteGroup";
import { Rsvp } from "@/db/schema/rsvp";
import { EventRsvpCard } from "@/features/rsvps/components/EventRsvpCard";
import { Button } from "@/ui/button";
import { useState } from "react";

interface EventCarouselProps {
  events: Event[];
  rsvps: Pick<Rsvp, "eventId" | "inviteeId" | "isAttending">[];
  inviteGroup: InviteGroupWithInvitees;
}

export const EventCarousel = ({
  events,
  rsvps,
  inviteGroup,
}: EventCarouselProps) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const selectedEvent = events[selectedEventIndex];

  const responsesFor = (eventId: number) =>
    new Map(
      rsvps
        .filter((r) => r.eventId === eventId)
        .map((r) => [r.inviteeId, r.isAttending]),
    );

  return (
    <div className="flex flex-row gap-x-8">
      <div className="flex items-center">
        <Button
          onClick={() =>
            setSelectedEventIndex(
              (selectedEventIndex - 1 + events.length) % events.length,
            )
          }
        >
          Previous
        </Button>
      </div>
      <EventRsvpCard
        event={selectedEvent}
        invitees={inviteGroup.invitees}
        responses={responsesFor(selectedEvent.id)}
        tilt={selectedEventIndex % 2 ? "right" : "left"}
      />
      <div className="flex items-center">
        <Button
          onClick={() =>
            setSelectedEventIndex((selectedEventIndex + 1) % events.length)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};
