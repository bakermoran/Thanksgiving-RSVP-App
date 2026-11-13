import { addObligation } from "@/functions/admin.functions";
import { addObligationSchema } from "@/shared/schemas/admin";
import { Button } from "@/ui/platform/button";
import { FieldError } from "@/ui/platform/field-error";
import { Form } from "@/ui/platform/form";
import { Input } from "@/ui/platform/input";
import { Label } from "@/ui/platform/label";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";

export const AddObligationForm = ({
  categoryId,
  categoryName,
}: {
  categoryId: number;
  categoryName: string;
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const inputId = `new-obligation-${categoryId}`;

  const singular = categoryName.toLowerCase().replace(/s$/, "");
  const article = /^[aeiou]/.test(singular) ? "an" : "a";

  const form = useForm({
    defaultValues: { name: "" },
    validators: { onSubmit: addObligationSchema.pick({ name: true }) },
    listeners: { onChange: () => setError(null) },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await addObligation({ data: { ...value, categoryId } });
        form.reset();
        await router.invalidate();
      } catch (error) {
        console.error(error);
        setError("Couldn't add it. Please try again.");
      }
    },
  });

  return (
    <Form form={form} className="w-full space-y-2">
      <form.Field name="name">
        {(field) => (
          <div className="space-y-1">
            <Label htmlFor={inputId} className="sr-only">
              Add to {categoryName}
            </Label>
            <div className="flex gap-2">
              <Input
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
                    variant="secondary"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <Plus />
                    )}
                    Add
                  </Button>
                )}
              </form.Subscribe>
            </div>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </Form>
  );
};
