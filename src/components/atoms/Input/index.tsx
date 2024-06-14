import { InputHTMLAttributes, useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import clsx from 'clsx';
import { inputMasks } from '#/utils/inputMasks';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
  mask?: 'MONEY';
  type?: string;
}

const Input = ({ label, name, control, errors, type = 'text', mask, ...props }: Props) => {
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
        <div className="relative mt-4 grid gap-1 text-black">
          <label
            className={clsx('absolute top-2 bg-white px-1 transition left-2', {
              '-translate-y-6 scale-75 -translate-x-4': moveLabel || field.value,
            })}
            htmlFor={name}
          >
            {label}
          </label>
          <input
            className="border-b-[#133052] border border-white outline-none p-2"
            {...field}
            onChange={(e) => {
              if (type === 'number') {
                field.onChange(e.target.valueAsNumber);
              } else {
                field.onChange(e.target.value);
              }
              if (mask) field.onChange(inputMasks(e.target.value, mask));
            }}
            defaultValue={mask ? inputMasks(field.value, mask) : field.value}
            onFocus={onFocusLabel}
            onBlur={() => {
              field.onBlur();
              setMoveLabel(false);
            }}
            type={type}
            {...props}
          />
          <p className="text-red-700 text-[12px] h-3">{errorMessage}</p>
        </div>
      )}
    />
  );
};

export default Input;
