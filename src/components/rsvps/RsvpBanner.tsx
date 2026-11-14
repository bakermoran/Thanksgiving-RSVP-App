import { Illustration } from "@/ui/guest/illustration";
import { Link, getRouteApi } from "@tanstack/react-router";

const rsvpLayout = getRouteApi("/_guest/$gatheringId/_rsvp");

export const RsvpBanner = () => {
  const params = rsvpLayout.useParams();

  return (
    <div className="mx-auto mb-6 flex w-fit -rotate-1 items-center gap-2 rounded-full border-3 border-bark bg-cream py-1 pr-4 pl-1 shadow-chunky-sm">
      <Illustration name="turkey" className="h-10" />
      <Link
        className="font-display text-xl text-cranberry"
        to="/$gatheringId/home"
        params={params}
      >
        Thanksgiving RSVP
      </Link>
    </div>
  );
};
