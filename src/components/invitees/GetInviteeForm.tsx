import { getInvitee } from "@/functions/invitees.functions";
import { inviteeNameSchema } from "@/shared/schemas/invitees";
import { Alert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";
import { TextField } from "@/ui/text-field";
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
      onSubmit: inviteeNameSchema,
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
        validators={{ onBlur: inviteeNameSchema.shape.firstName }}
      >
        {(field) => (
          <TextField
            label="First name"
            id={field.name}
            name={field.name}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors}
          />
        )}
      </form.Field>

      <form.Field
        name="lastName"
        validators={{ onBlur: inviteeNameSchema.shape.lastName }}
      >
        {(field) => (
          <TextField
            label="Last name"
            id={field.name}
            name={field.name}
            value={field.state.value}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            errors={field.state.meta.errors}
          />
        )}
      </form.Field>

      {lookupError && <Alert>{lookupError}</Alert>}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            loading={isSubmitting}
            className="w-full"
          >
            Search
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
};
