import { InputHTMLAttributes, useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import clsx from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
  type?: string;
}

const Input = ({ label, name, control, errors, type = 'text', ...props }: Props) => {
  const [moveLabel, setMoveLabel] = useState(false);
  const errorMessage = errors?.[name]?.message as string;

  const onFocusLabel = () => {
    setMoveLabel(true);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="relative grid gap-2">
          <label
            className={clsx('absolute top-2 transition left-2', {
              '-translate-y-8 -translate-x-2': moveLabel || field.value,
            })}
            htmlFor={name}
          >
            {label}
          </label>
          <input
            className="border-[#133052] border outline-none rounded-md max-w-60 min-w-32 p-2"
            {...field}
            onFocus={onFocusLabel}
            onBlur={() => {
              field.onBlur();
              setMoveLabel(false);
            }}
            type={type}
            {...props}
          />
          {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        </div>
      )}
    />
  );
};

export default Input;
