import { BadgeSelect } from "@/components/admin/BadgeSelect";
import { groupLabel } from "@/components/admin/groupLabel";
import { removeEvent, setRsvp } from "@/functions/admin.functions";
import { toAddressString } from "@/shared/address";
import { formatEventTimeRange } from "@/shared/date";
import {
  type Event,
  type InviteGroupWithInvitees,
  type Invitee,
} from "@/shared/types";
import { Button } from "@/ui/platform/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/platform/card";
import { ScrollArea } from "@/ui/platform/scroll-area";
import { Link, useRouter } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type Response = "attending" | "declined" | "none";

const RESPONSES: Record<
  Response,
  { label: string; isAttending: boolean | null; className: string }
> = {
  attending: {
    label: "Attending",
    isAttending: true,
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  },
  declined: {
    label: "Declined",
    isAttending: false,
    className: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  },
  none: {
    label: "No response",
    isAttending: null,
    className: "",
  },
};

const toResponse = (isAttending: boolean | undefined): Response =>
  isAttending === undefined ? "none" : isAttending ? "attending" : "declined";

const ResponseBadge = ({
  eventId,
  invitee,
  isAttending,
}: {
  eventId: number;
  invitee: Invitee;
  isAttending: boolean | undefined;
}) => {
  const router = useRouter();
  const [pending, setPending] = useState<Response | null>(null);
  const [error, setError] = useState(false);
  const current = pending ?? toResponse(isAttending);
  const fullName = `${invitee.firstName} ${invitee.lastName}`;

  const onChange = async (next: Response) => {
    setError(false);
    setPending(next);
    try {
      await setRsvp({
        data: {
          eventId,
          inviteeId: invitee.id,
          isAttending: RESPONSES[next].isAttending,
        },
      });
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setPending(null);
    }
  };

  return (
    <span className="flex items-center gap-2">
      {error && (
        <span role="alert" className="text-xs text-destructive">
          Couldn't save
        </span>
      )}
      <BadgeSelect
        label={RESPONSES[current].label}
        variant={current === "none" ? "outline" : "default"}
        className={RESPONSES[current].className}
        ariaLabel={`RSVP for ${fullName}`}
        value={current}
        isPending={pending !== null}
        onChange={(value) => onChange(value as Response)}
      >
        {Object.entries(RESPONSES).map(([value, { label }]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </BadgeSelect>
    </span>
  );
};

const Stat = ({ value, label }: { value: number; label: string }) => (
  <div className="rounded-lg bg-muted/50 px-3 py-2">
    <p className="text-2xl font-semibold tabular-nums">{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

interface AdminEventCardProps {
  event: Event;
  inviteGroups: InviteGroupWithInvitees[];
  responses: Map<number, boolean>;
}

export const AdminEventCard = ({
  event,
  inviteGroups,
  responses,
}: AdminEventCardProps) => {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRemove = async () => {
    if (
      !window.confirm(
        `Delete ${event.name}? Everyone's RSVPs for it are deleted too.`,
      )
    ) {
      return;
    }

    setError(null);
    setIsBusy(true);
    try {
      await removeEvent({ data: { id: event.id } });
      await router.invalidate();
    } catch (error) {
      console.error(error);
      setError("Couldn't delete that event. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  const invitees = inviteGroups.flatMap((g) => g.invitees);
  const attending = invitees.filter((i) => responses.get(i.id) === true);
  const declined = invitees.filter((i) => responses.get(i.id) === false);
  const pending = invitees.length - attending.length - declined.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{event.name}</CardTitle>
        <CardDescription>
          <span className="block">
            {formatEventTimeRange(event.startTime, event.endTime)}
          </span>
          <span className="block">{toAddressString(event)}</span>
        </CardDescription>
        <CardAction className="flex items-center gap-1">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/events/$eventId" params={{ eventId: event.id }}>
              <Pencil />
              Edit
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={isBusy}
            onClick={onRemove}
            aria-label={`Delete ${event.name}`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-5">
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="grid grid-cols-3 gap-2">
          <Stat value={attending.length} label="Attending" />
          <Stat value={declined.length} label="Declined" />
          <Stat value={pending} label="No response" />
        </div>

        <ScrollArea viewportClassName="max-h-96">
          <div className="space-y-4">
            {inviteGroups.map((group) => (
              <div key={group.id}>
                <p className="mb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {groupLabel(group)}
                </p>
                <ul className="divide-y">
                  {group.invitees.map((invitee) => (
                    <li
                      key={invitee.id}
                      className="flex items-center justify-between gap-3 py-1.5 text-sm"
                    >
                      <span>
                        {invitee.firstName} {invitee.lastName}
                      </span>
                      <ResponseBadge
                        eventId={event.id}
                        invitee={invitee}
                        isAttending={responses.get(invitee.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
