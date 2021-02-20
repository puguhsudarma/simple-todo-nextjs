interface Props {
  onClick?(): void;
  label: string;
  type: 'button' | 'reset' | 'submit';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button = (props: Props) => {
  const disabled = props.disabled
    ? 'bg-gray-500 pointer-events-none'
    : 'bg-green-800 shadow hover:shadow-sm hover:bg-green-700';

  return (
    <button
      {...props}
      className={`${disabled} focus:outline-none text-white font-body text-sm font-bold py-3 rounded-md w-full ${props.className}`}
    >
      {props.loading ? (
        <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-5 w-5 m-auto" />
      ) : (
        props.label
      )}
    </button>
  );
};

export default Button;
