type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  form: { handleSubmit: () => unknown };
};

export const Form = ({ form, children, ...props }: FormProps) => (
  <form
    {...props}
    onSubmit={(e) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    }}
  >
    {children}
  </form>
);
