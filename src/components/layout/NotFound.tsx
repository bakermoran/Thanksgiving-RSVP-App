import { Illustration } from "@/ui/guest/illustration";
import { Link } from "@/ui/guest/link";
import { Page } from "@/ui/guest/page";
import { PageHeader } from "@/ui/guest/page-header";

export const NotFound = () => {
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
      <Link to="/" variant="text">
        Back to the feast
      </Link>
    </Page>
  );
};
