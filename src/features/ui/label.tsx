type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = (props: LabelProps) => {
  return <label {...props} />;
};
