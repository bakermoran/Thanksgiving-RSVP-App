import { getInviteeSchema } from "@/db/schema/invitee";
import { getInvitee } from "@/features/invitees/invitees.functions";
import { Alert, fieldErrorClass } from "@/features/ui/alert";
import { Button } from "@/features/ui/button";
import { Form } from "@/features/ui/form";
import { Input } from "@/features/ui/input";
import { Label } from "@/features/ui/label";
import { useForm } from "@tanstack/react-form";
import { isNotFound } from "@tanstack/react-router";
import { useState } from "react";

interface GetInviteeFormProps {
  onSubmit: (inviteGroupId: number) => void;
}

export const GetInviteeForm = ({ onSubmit }: GetInviteeFormProps) => {
  const [lookupError, setLookupError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },

    validators: {
      onSubmit: getInviteeSchema,
    },

    listeners: {
      onChange: () => setLookupError(null),
    },

    onSubmit: async ({ value }) => {
      setLookupError(null);
      try {
        const invitee = await getInvitee({ data: value });
        onSubmit(invitee.inviteGroupId);
      } catch (error) {
        if (isNotFound(error)) {
          setLookupError(
            "We couldn't find anyone with that name. Check the spelling and try again.",
          );
        } else {
          setLookupError("Something went wrong. Please try again.");
        }
      }
    },
  });

  return (
    <Form form={form} className="space-y-6">
      <form.Field
        name="firstName"
        validators={{ onBlur: getInviteeSchema.shape.firstName }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>First name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
            />

            {field.state.meta.errors.map((error) => (
              <p key={error?.message} role="alert" className={fieldErrorClass}>
                {error?.message}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field
        name="lastName"
        validators={{ onBlur: getInviteeSchema.shape.lastName }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Last name</Label>
            <Input
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
            />

            {field.state.meta.errors.map((error) => (
              <p key={error?.message} role="alert" className={fieldErrorClass}>
                {error?.message}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      {lookupError && <Alert>{lookupError}</Alert>}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Searching..." : "Search"}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
};
