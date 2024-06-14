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

const Select = ({ options, name, control, label, errors, className, ...props }: Props) => {
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
        <div className="relative grid mt-4 gap-1 text-black">
          <label
            className={clsx(
              'absolute top-2 bg-transparent px-1 transition left-2',
              {
                '-translate-y-6 scale-75 -translate-x-4': moveLabel || field.value,
              },
              className,
            )}
            htmlFor={name}
          >
            {label}
          </label>
          <select
            {...props}
            {...field}
            className={clsx('border-b-[#133052] bg-transparent border border-transparent outline-none p-2', className)}
            onFocus={onFocusLabel}
            onBlur={() => {
              field.onBlur();
              setMoveLabel(false);
            }}
          >
            <option disabled></option>
            {options.map((option) => (
              <option className="text-black" value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-red-700 text-[12px] h-3">{errorMessage}</p>
        </div>
      )}
    />
  );
};

export default Select;
