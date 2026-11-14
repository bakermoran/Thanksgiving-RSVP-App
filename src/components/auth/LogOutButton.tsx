import { logOut } from "@/functions/auth.functions";
import { Button } from "@/ui/guest/button";
import { getRouteApi, useRouter } from "@tanstack/react-router";

const rsvpLayout = getRouteApi("/_guest/$gatheringId/_rsvp");

export const LogOutButton = ({ name }: { name: string }) => {
  const router = useRouter();
  const params = rsvpLayout.useParams();

  const onClick = async () => {
    await logOut();
    router.clearCache();
    await router.navigate({ to: "/$gatheringId", params });
  };

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      Not {name}?
    </Button>
  );
};
