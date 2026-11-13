import { redeemInvite } from "@/functions/invite.functions";
import { inviteeNameSchema } from "@/shared/schemas/invitees";
import { Alert } from "@/ui/guest/alert";
import { Button } from "@/ui/guest/button";
import { Form } from "@/ui/guest/form";
import { TextField } from "@/ui/guest/text-field";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

interface CreateInviteeFormProps {
  onSubmit: () => void;
  code: string;
}

export const CreateInviteeForm = ({
  onSubmit,
  code,
}: CreateInviteeFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },

    validators: {
      onSubmit: inviteeNameSchema,
    },

    listeners: {
      onChange: () => setError(null),
    },

    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await redeemInvite({ data: { code, invitee: value } });
        onSubmit();
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Please try again.");
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

      {error && <Alert>{error}</Alert>}

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
            Join
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
};
