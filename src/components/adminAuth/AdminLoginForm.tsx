import { adminLogIn } from "@/functions/adminAuth.functions";
import { adminLoginSchema } from "@/shared/schemas/adminAuth";
import { Alert, AlertDescription } from "@/ui/platform/alert";
import { Button } from "@/ui/platform/button";
import { FieldError } from "@/ui/platform/field-error";
import { Form } from "@/ui/platform/form";
import { Input } from "@/ui/platform/input";
import { Label } from "@/ui/platform/label";
import { useForm } from "@tanstack/react-form";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const fields = [
  { name: "email", label: "Email", type: "email", autoComplete: "username" },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
  },
] as const;

interface AdminLoginFormProps {
  onSubmit: () => void;
}

export const AdminLoginForm = ({ onSubmit }: AdminLoginFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: adminLoginSchema },
    listeners: { onChange: () => setError(null) },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        const result = await adminLogIn({ data: value });
        if (!result.ok) {
          setError("That email and password don't match.");
          form.setFieldValue("password", "");
          return;
        }
        onSubmit();
      } catch (error) {
        console.error(error);
        setError("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <Form form={form} className="space-y-5">
      {fields.map(({ name, label, type, autoComplete }) => (
        <form.Field
          key={name}
          name={name}
          validators={{ onBlur: adminLoginSchema.shape[name] }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>{label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={type}
                autoComplete={autoComplete}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={field.state.meta.errors.length > 0}
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
      ))}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full"
          >
            {isSubmitting && <LoaderCircle className="animate-spin" />}
            Log in
          </Button>
        )}
      </form.Subscribe>
    </Form>
  );
};
