import clsx from 'clsx';
import { SelectHTMLAttributes, useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';

export interface ISelectOption {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: ISelectOption[];
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
  name: string;
  label: string;
}

const Select = ({ options, name, control, label, errors, ...props }: Props) => {
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
          <select
            {...props}
            {...field}
            className={clsx('border-[#133052] border outline-none rounded-md max-w-60 min-w-32 p-2', props.className)}
            onFocus={onFocusLabel}
            onBlur={() => {
              field.onBlur();
              setMoveLabel(false);
            }}
          >
            <option disabled></option>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        </div>
      )}
    />
  );
};

export default Select;
