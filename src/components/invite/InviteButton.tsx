import { createInvite } from "@/functions/invite.functions";
import { Button } from "@/ui/guest/button";

export const InviteButton = () => {
  const onClick = async () => {
    const { code } = await createInvite();
    const redemptionUrl = new URL("/redeem", window.location.origin);
    redemptionUrl.searchParams.set("code", code);
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
