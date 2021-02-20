interface Props {
  onClick?(): void;
  label: string;
  type: 'button' | 'reset' | 'submit';
}

const Button = (props: Props) => {
  return (
    <button
      {...props}
      className="bg-green-800 hover:bg-green-700 focus:outline-none text-white font-body text-sm font-bold px-10 py-3 rounded-md w-full md:w-min"
    >
      {props.label}
    </button>
  );
};

export default Button;
