import { EventDetailForm } from "@/components/admin/EventDetailForm";
import { getAdminEvent } from "@/functions/admin.functions";
import { toAddressString } from "@/shared/address";
import { formatEventTimeRange } from "@/shared/date";
import { Button } from "@/ui/platform/button";
import { Card, CardContent } from "@/ui/platform/card";
import { PageHeader } from "@/ui/platform/page-header";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/admin/_authed/events/$eventId")({
  params: {
    parse: (p) => ({
      eventId: z.coerce.number().int().parse(p.eventId),
    }),
    stringify: (p) => ({ eventId: String(p.eventId) }),
  },
  loader: ({ params }) => getAdminEvent({ data: { id: params.eventId } }),
  gcTime: 0,
  component: EventPage,
});

function EventPage() {
  const event = Route.useLoaderData();

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2">
        <Link to="/admin/events">
          <ArrowLeft />
          Events
        </Link>
      </Button>

      <PageHeader
        title={event.name}
        description={`${formatEventTimeRange(event.startTime, event.endTime)} · ${toAddressString(event)}`}
      />

      <Card className="max-w-xl">
        <CardContent>
          <EventDetailForm event={event} />
        </CardContent>
      </Card>
    </>
  );
}
