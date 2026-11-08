import { Input } from "./input";
import { Label } from "./label";

type FieldErrors = ReadonlyArray<{ message?: string } | string | undefined>;

const errorMessage = (error: FieldErrors[number]) =>
  typeof error === "string" ? error : error?.message;

export const FieldError = ({ errors }: { errors: FieldErrors }) => (
  <>
    {errors.map(errorMessage).map(
      (message) =>
        message && (
          <p
            key={message}
            role="alert"
            className="mt-1.5 text-sm font-semibold text-cranberry"
          >
            {message}
          </p>
        ),
    )}
  </>
);

type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  id: string;
  label: React.ReactNode;
  errors?: FieldErrors;
  onChange: (value: string) => void;
};

export const TextField = ({
  id,
  label,
  errors = [],
  onChange,
  ...props
}: TextFieldProps) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <Input
      type="text"
      {...props}
      id={id}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={errors.length > 0}
    />
    <FieldError errors={errors} />
  </div>
);
