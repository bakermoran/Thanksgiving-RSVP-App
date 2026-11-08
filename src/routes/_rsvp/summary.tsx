import { Link, createFileRoute, getRouteApi } from "@tanstack/react-router";

const rsvpLayout = getRouteApi("/_rsvp");

export const Route = createFileRoute("/_rsvp/summary")({
  component: Summary,
});

function Summary() {
  const { inviteGroup, events } = rsvpLayout.useLoaderData();

  return (
    <div>
      <h1>Your RSVPs</h1>

      {events.map((event) => (
        <section key={event.id}>
          <h2>{event.name}</h2>
          <ul>
            {inviteGroup.invitees.map((invitee) => {
              return (
                <li key={invitee.id}>
                  {invitee.firstName} {invitee.lastName}:{" "}
                </li>
              );
            })}
          </ul>
          <Link to="/events/$eventId" params={{ eventId: event.id }}>
            Edit
          </Link>
        </section>
      ))}
    </div>
  );
}
