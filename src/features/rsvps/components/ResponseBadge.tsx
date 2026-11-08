import { Badge } from "@/ui/badge";

export const ResponseBadge = ({
  isAttending,
}: {
  isAttending: boolean | undefined;
}) => {
  if (isAttending === undefined) {
    return <Badge variant="outline">No response</Badge>;
  }
  return isAttending ? (
    <Badge variant="olive">Attending</Badge>
  ) : (
    <Badge variant="cranberry">Not attending</Badge>
  );
};
