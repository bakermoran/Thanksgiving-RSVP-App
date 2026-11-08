type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Radio = (props: RadioProps) => {
  return (
    <input
      {...props}
      type="radio"
    />
  );
};
