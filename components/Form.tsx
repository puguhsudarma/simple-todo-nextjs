import React from 'react';

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: string;
  label: string;
}

const Input = (props: Props) => {
  const classField = props.error ? ' border border-red-500 border-1' : '';
  const classLabel = props.error ? ' text-red-500' : ' text-gray-700';

  return (
    <div>
      <label htmlFor={props.name} className={`font-bold text-md${classLabel}`}>
        {props.label}
      </label>
      <input
        {...props}
        id={props.name}
        name={props.name}
        className={`appearance-none w-full mt-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline${classField}`}
      />
      {props.error && <p className="text-red-500 text-xs mt-2">{props.error}</p>}
    </div>
  );
};

export default Input;
