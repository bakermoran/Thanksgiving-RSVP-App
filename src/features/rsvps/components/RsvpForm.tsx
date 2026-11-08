import type { Invitee } from "@/db/schema/invitee";
import { saveRsvpsSchema } from "@/db/schema/rsvp";
import { saveRsvps } from "@/features/rsvps/rsvps.functions";
import { Button } from "@/features/ui/button";
import { Form } from "@/features/ui/form";
import { Radio } from "@/features/ui/radio";
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
    <Form form={form}>
      {invitees.map((invitee, index) => (
        <form.Field key={invitee.id} name={`rsvps[${index}].isAttending`}>
          {(field) => (
            <fieldset>
              <legend>
                {invitee.firstName} {invitee.lastName}
              </legend>
              <label>
                <Radio
                  name={`invitee-${invitee.id}`}
                  checked={field.state.value === true}
                  onChange={() => field.handleChange(true)}
                />
                Attending
              </label>
              <label>
                <Radio
                  name={`invitee-${invitee.id}`}
                  checked={field.state.value === false}
                  onChange={() => field.handleChange(false)}
                />
                Not attending
              </label>
            </fieldset>
          )}
        </form.Field>
      ))}

      {error && <p role="alert">{error}</p>}

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
              <p role="alert">Please fill out answers for everyone.</p>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </>
        )}
      </form.Subscribe>
    </Form>
  );
};
