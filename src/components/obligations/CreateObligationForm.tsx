import { createObligation } from "@/functions/obligations.functions";
import { createObligationSchema } from "@/shared/schemas/obligations";
import { Alert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { FieldError } from "@/ui/text-field";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

interface CreateObligationFormProps {
  inviteeId: number;
  categoryId: number;
  categoryName: string;
}

export const CreateObligationForm = ({
  inviteeId,
  categoryId,
  categoryName,
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
        await createObligation({ data: { ...value, inviteeId, categoryId } });
        await router.invalidate();
        form.reset();
      } catch {
        setError("Something went wrong");
      }
    },
  });

  const inputId = `new-obligation-${categoryId}`;

  const singular = categoryName.toLowerCase().replace(/s$/, "");
  const article = /^[aeiou]/.test(singular) ? "an" : "a";

  return (
    <Form form={form} className="mt-3 space-y-3">
      <form.Field
        name="name"
        validators={{ onBlur: createObligationSchema.shape.name }}
      >
        {(field) => (
          <div>
            <Label htmlFor={inputId} className="sr-only">
              Add to {categoryName}
            </Label>
            <div className="flex gap-3">
              <Input
                type="text"
                id={inputId}
                name={field.name}
                placeholder={`Add ${article} ${singular}…`}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={field.state.meta.errors.length > 0}
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    loading={isSubmitting}
                  >
                    Add
                  </Button>
                )}
              </form.Subscribe>
            </div>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>
      {error && <Alert>{error}</Alert>}
    </Form>
  );
};
