import { Button } from "@/ui/button";

import { createInvite } from "./invite.functions";

export const InviteButton = () => {
  const redemptionUrl = "https://my-thanksgiving-event.com/redeem";
  const onClick = async () => {
    const { code } = await createInvite();
    window.open(
      `sms:?body=Come to my Thanksgiving event: ${redemptionUrl}?code=${code}`,
    );
  };

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      Invite someone
    </Button>
  );
};
