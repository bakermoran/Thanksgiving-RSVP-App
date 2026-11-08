import type { Invitee } from "@/db/schema/invitee";
import { saveRsvpsSchema } from "@/db/schema/rsvp";
import { saveRsvps } from "@/features/rsvps/rsvps.functions";
import { Alert } from "@/features/ui/alert";
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
    <Form form={form} className="space-y-6">
      {invitees.map((invitee, index) => (
        <form.Field key={invitee.id} name={`rsvps[${index}].isAttending`}>
          {(field) => (
            <fieldset className="rounded-3xl border-3 border-bark bg-white/70 px-4 pt-2 pb-4 sm:px-5">
              <legend className="-ml-1 rounded-full border-3 border-bark bg-mustard px-4 py-0.5 text-lg font-bold shadow-chunky-sm">
                {invitee.firstName} {invitee.lastName}
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className={optionClass("has-checked:bg-olive")}>
                  <Radio
                    name={`invitee-${invitee.id}`}
                    checked={field.state.value === true}
                    onChange={() => field.handleChange(true)}
                  />
                  <span className="flex-1">Attending</span>
                  <img
                    src="/images/drumstick.svg"
                    alt=""
                    className="size-9 group-has-checked:motion-safe:animate-bob"
                  />
                </label>
                <label className={optionClass("has-checked:bg-cranberry")}>
                  <Radio
                    name={`invitee-${invitee.id}`}
                    checked={field.state.value === false}
                    onChange={() => field.handleChange(false)}
                  />
                  <span className="flex-1">Not attending</span>
                  <img
                    src="/images/oak-leaf.svg"
                    alt=""
                    className="h-9 group-has-checked:motion-safe:animate-bob"
                  />
                </label>
              </div>
            </fieldset>
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

const optionClass = (checkedBg: string) =>
  [
    "group flex cursor-pointer items-center gap-3 rounded-2xl border-3 border-bark bg-cream px-4 py-3 text-lg font-semibold shadow-chunky-sm transition",
    "hover:-translate-y-0.5 hover:bg-parchment",
    "has-checked:translate-x-[2px] has-checked:translate-y-[2px] has-checked:text-cream has-checked:shadow-none",
    "has-focus-visible:ring-4 has-focus-visible:ring-mustard",
    checkedBg,
  ].join(" ");
