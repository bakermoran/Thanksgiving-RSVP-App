type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return <input {...props} className="border-2 border-gray-300 rounded-md" />;
};
