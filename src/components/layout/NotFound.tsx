import { Illustration } from "@/ui/guest/illustration";
import { Link } from "@/ui/guest/link";
import { Page } from "@/ui/guest/page";
import { PageHeader } from "@/ui/guest/page-header";
import { useParams } from "@tanstack/react-router";

export const NotFound = () => {
  const { gatheringId } = useParams({ strict: false });

  return (
    <Page width="sm" className="pt-16 text-center">
      <PageHeader
        illustration={
          <Illustration
            name="turkey"
            animate="wobble"
            className="mx-auto w-44"
          />
        }
        eyebrow="Well, butter my biscuits"
        title="404"
        size="xl"
      >
        Not Found — this turkey flew the coop.
      </PageHeader>
      {gatheringId && (
        <Link to="/$gatheringId" params={{ gatheringId }} variant="text">
          Back to the feast
        </Link>
      )}
    </Page>
  );
};
