import { EventSummaryCard } from "@/components/home/EventSummaryCard";
import { Stat } from "@/components/home/Stat";
import { ObligationList } from "@/components/obligations/ObligationList";
import {
  getObligationCategories,
  getObligations,
} from "@/functions/obligations.functions";
import { getMyRsvps } from "@/functions/rsvps.functions";
import { Card } from "@/ui/card";
import { Illustration } from "@/ui/illustration";
import { PageHeader } from "@/ui/page-header";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

const rsvpLayout = getRouteApi("/_rsvp");

export const Route = createFileRoute("/_rsvp/home")({
  loader: async () => {
    const [obligations, categories, rsvps] = await Promise.all([
      getObligations(),
      getObligationCategories(),
      getMyRsvps(),
    ]);

    return { obligations, categories, rsvps };
  },
  gcTime: 0,
  component: Home,
});

const SectionHeading = ({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) => (
  <div className="mb-6">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="font-display text-4xl text-cranberry">{title}</h2>
  </div>
);

function Home() {
  const { inviteGroup, events } = rsvpLayout.useLoaderData();
  const { obligations, categories, rsvps } = Route.useLoaderData();
  const { inviteeId } = Route.useRouteContext().session;
  const { invitees } = inviteGroup;

  const me = invitees.find((i) => i.id === inviteeId);

  const responsesFor = (eventId: number) =>
    new Map(
      rsvps
        .filter((r) => r.eventId === eventId)
        .map((r) => [r.inviteeId, r.isAttending]),
    );

  const eventsResponded = events.filter((event) => {
    const responses = responsesFor(event.id);
    return invitees.every((i) => responses.has(i.id));
  }).length;
  const dishesClaimed = obligations.filter((o) => o.invitee).length;
  const myDishes = obligations.filter(
    (o) => o.invitee?.id === inviteeId,
  ).length;

  return (
    <div className="space-y-14">
      <PageHeader
        illustration={
          <Illustration name="pie" animate="wobble" className="mx-auto w-32" />
        }
        eyebrow="Here's what's cookin'"
        title={me ? `Hey, ${me.firstName}!` : "Welcome!"}
      />

      <Card tilt="right">
        <section
          aria-label="At a glance"
          className="grid grid-cols-3 divide-x-2 divide-dashed divide-harvest/40"
        >
          <Stat
            value={`${eventsResponded}/${events.length}`}
            label="events RSVP'd"
          />
          <Stat
            value={`${dishesClaimed}/${obligations.length}`}
            label="dishes claimed"
          />
          <Stat
            value={myDishes}
            label={
              myDishes === 1 ? "dish you're bringing" : "dishes you're bringing"
            }
          />
        </section>
      </Card>

      <section>
        <SectionHeading
          eyebrow="Mark your calendar"
          title="Schedule of events"
        />
        <div className="grid gap-8 sm:grid-cols-2">
          {events.map((event, i) => (
            <EventSummaryCard
              key={event.id}
              event={event}
              invitees={invitees}
              responses={responsesFor(event.id)}
              tilt={i % 2 ? "right" : "left"}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="What's on the menu"
          title="Who's bringing what"
        />
        <ObligationList
          obligations={obligations}
          categories={categories}
          inviteeId={inviteeId}
        />
      </section>
    </div>
  );
}
