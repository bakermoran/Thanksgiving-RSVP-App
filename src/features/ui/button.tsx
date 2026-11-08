type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white border-gray-300 rounded-md"
    />
  );
};
