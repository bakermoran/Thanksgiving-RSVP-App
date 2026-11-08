import type { Invitee } from "@/db/schema/invitee";
import { saveRsvpsSchema } from "@/db/schema/rsvp";
import { saveRsvps } from "@/features/rsvps/rsvps.functions";
import { Alert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Fieldset } from "@/ui/fieldset";
import { Form } from "@/ui/form";
import { RadioCard } from "@/ui/radio-card";
import { useForm } from "@tanstack/react-form-start";
import { useState } from "react";

interface RsvpFormProps {
  eventId: number;
  invitees: Invitee[];
  rsvps: { inviteeId: number; isAttending: boolean }[];
  submitLabel: string;
  onSaved: () => void;
}

export const RsvpForm = ({
  eventId,
  invitees,
  rsvps,
  submitLabel,
  onSaved,
}: RsvpFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const existing = new Map(rsvps.map((r) => [r.inviteeId, r.isAttending]));

  const form = useForm({
    defaultValues: {
      eventId,
      rsvps: invitees.map((i) => ({
        inviteeId: i.id,
        isAttending: existing.get(i.id) as boolean | undefined,
      })),
    },

    validators: {
      onSubmit: saveRsvpsSchema,
    },

    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await saveRsvps({ data: saveRsvpsSchema.parse(value) });
        onSaved();
      } catch {
        setError("Couldn't save your RSVPs. Please try again.");
      }
    },
  });

  return (
    <Form form={form} className="space-y-6">
      {invitees.map((invitee, index) => (
        <form.Field key={invitee.id} name={`rsvps[${index}].isAttending`}>
          {(field) => (
            <Fieldset legend={`${invitee.firstName} ${invitee.lastName}`}>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <RadioCard
                  label="Attending"
                  tone="olive"
                  icon="drumstick"
                  name={`invitee-${invitee.id}`}
                  checked={field.state.value === true}
                  onChange={() => field.handleChange(true)}
                />
                <RadioCard
                  label="Not attending"
                  tone="cranberry"
                  icon="oak-leaf"
                  name={`invitee-${invitee.id}`}
                  checked={field.state.value === false}
                  onChange={() => field.handleChange(false)}
                />
              </div>
            </Fieldset>
          )}
        </form.Field>
      ))}

      {error && <Alert>{error}</Alert>}

      <form.Subscribe
        selector={(state) => ({
          isSubmitting: state.isSubmitting,
          showMissing:
            state.submissionAttempts > 0 &&
            state.values.rsvps.some((r) => r.isAttending === undefined),
        })}
      >
        {({ isSubmitting, showMissing }) => (
          <>
            {showMissing && (
              <Alert>Please fill out answers for everyone.</Alert>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full sm:ml-auto sm:flex sm:w-fit"
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </>
        )}
      </form.Subscribe>
    </Form>
  );
};
