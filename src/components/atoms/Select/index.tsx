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
  labelClassName?: string;
}

const Select = ({ options, name, control, label, errors, className, labelClassName, ...props }: Props) => {
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
        <div className="relative h-14 items-center mt-4 grid gap-1 text-black">
          <label
            className={clsx(
              'absolute top-2 px-1 font-[600] transition left-2',
              {
                '-translate-y-6 scale-75 -translate-x-4': moveLabel || field.value,
              },
              labelClassName,
            )}
            htmlFor={name}
          >
            {label}
          </label>
          <select
            {...props}
            {...field}
            className={clsx('border-b-[#133052] border border-transparent outline-none p-2', className, {
              'text-transparent placeholder:text-transparent': !moveLabel,
            })}
            onFocus={onFocusLabel}
            onBlur={() => {
              field.onBlur();
              if (!field.value) setMoveLabel(false);
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
