import { createInvite } from "@/functions/invite.functions";
import { Button } from "@/ui/guest/button";
import { getRouteApi, useRouter } from "@tanstack/react-router";

const rsvpLayout = getRouteApi("/_guest/$gatheringId/_rsvp");

export const InviteButton = () => {
  const router = useRouter();
  const params = rsvpLayout.useParams();

  const onClick = async () => {
    const { code } = await createInvite();
    const { href } = router.buildLocation({
      to: "/$gatheringId/redeem",
      params,
      search: { code },
    });
    const redemptionUrl = new URL(href, window.location.origin);
    window.open(
      `sms:?body=Come to my Thanksgiving event: ${encodeURIComponent(redemptionUrl.toString())}`,
    );
  };

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      Invite someone
    </Button>
  );
};
