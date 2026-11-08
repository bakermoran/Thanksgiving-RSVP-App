import { createObligationSchema } from "@/db/schema/obligation";
import { createObligation } from "@/features/obligations/obligations.functions";
import { Alert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";
import { TextField } from "@/ui/text-field";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

interface CreateObligationFormProps {
  inviteeId: number;
}

export const CreateObligationForm = ({
  inviteeId,
}: CreateObligationFormProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
    },

    validators: {
      onSubmit: createObligationSchema.pick({ name: true }),
    },

    listeners: {
      onChange: () => setError(null),
    },

    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await createObligation({ data: { ...value, inviteeId } });
        await router.invalidate();
        form.reset();
      } catch (error) {
        setError("Something went wrong");
      }
    },
  });

  return (
    <Form form={form} className="space-y-6">
      <form.Field
        name="name"
        validators={{ onBlur: createObligationSchema.shape.name }}
      >
        {(field) => (
          <TextField
            label="Add a dish"
            id={field.name}
            placeholder="e.g., Mashed Potatoes"
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
            disabled={!canSubmit || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
};
