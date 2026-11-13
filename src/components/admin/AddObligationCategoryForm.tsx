import { addObligationCategory } from "@/functions/admin.functions";
import { addObligationCategorySchema } from "@/shared/schemas/admin";
import { Button } from "@/ui/platform/button";
import { FieldError } from "@/ui/platform/field-error";
import { Form } from "@/ui/platform/form";
import { Input } from "@/ui/platform/input";
import { Label } from "@/ui/platform/label";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";

export const AddObligationCategoryForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const inputId = "new-obligation-category";

  const form = useForm({
    defaultValues: { name: "" },
    validators: { onSubmit: addObligationCategorySchema },
    listeners: { onChange: () => setError(null) },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await addObligationCategory({ data: value });
        form.reset();
        await router.invalidate();
      } catch (error) {
        console.error(error);
        setError("Couldn't add that category. It may already exist.");
      }
    },
  });

  return (
    <Form form={form} className="w-full space-y-2">
      <form.Field name="name">
        {(field) => (
          <div className="space-y-1">
            <Label htmlFor={inputId} className="sr-only">
              Category name
            </Label>
            <div className="flex gap-2">
              <Input
                id={inputId}
                name={field.name}
                placeholder="Category name…"
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
                    Create
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
