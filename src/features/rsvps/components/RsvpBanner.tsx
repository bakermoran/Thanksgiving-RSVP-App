import { Illustration } from "@/ui/illustration";

export const RsvpBanner = () => (
  <div className="mx-auto mb-6 flex w-fit -rotate-1 items-center gap-2 rounded-full border-3 border-bark bg-cream py-1 pr-4 pl-1 shadow-chunky-sm">
    <Illustration name="turkey" className="h-10" />
    <span className="font-display text-xl text-cranberry">
      Thanksgiving RSVP
    </span>
  </div>
);
