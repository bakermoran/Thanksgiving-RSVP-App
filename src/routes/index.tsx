import { GetInviteeForm } from "@/features/invitees/components/GetInviteeForm";
import { Card } from "@/features/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  // getInvitee has set the invite-group cookie; /rsvp sends them to the first event.
  return (
    <main className="mx-auto w-full max-w-xl px-4 pt-8 pb-12">
      <header className="mb-10 text-center">
        <img
          src="/images/turkey.svg"
          alt=""
          className="mx-auto w-52 origin-bottom drop-shadow-[4px_4px_0_rgba(61,35,20,0.25)] motion-safe:animate-wobble sm:w-64"
        />
        <p className="eyebrow mt-4">You're invited to a</p>
        <h1 className="title-retro mt-1 text-6xl sm:text-7xl">
          Thanksgiving Feast!
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-lg font-medium text-cocoa">
          Gobble gobble! Look yourself up to RSVP for your whole crew.
        </p>
      </header>

      <Card>
        <GetInviteeForm onSubmit={() => navigate({ to: "/rsvp" })} />
      </Card>

      <div aria-hidden className="mt-8 flex items-end justify-center gap-6">
        <img src="/images/pumpkin.svg" alt="" className="w-16" />
        <img
          src="/images/acorn.svg"
          alt=""
          className="w-9 motion-safe:animate-bob"
        />
        <img src="/images/pie.svg" alt="" className="w-20" />
        <img
          src="/images/acorn.svg"
          alt=""
          className="w-9 motion-safe:animate-bob [animation-delay:-1.2s]"
        />
        <img src="/images/pumpkin.svg" alt="" className="w-16 -scale-x-100" />
      </div>
    </main>
  );
}
