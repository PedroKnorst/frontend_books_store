import { TextareaHTMLAttributes, useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import clsx from 'clsx';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
}

const Textarea = ({ label, name, control, errors, className, ...props }: Props) => {
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
            className={clsx(
              'absolute top-2 px-1 font-[600] transition left-2',
              {
                '-translate-y-6 scale-75 -translate-x-4': moveLabel || field.value,
              },
              className,
            )}
            htmlFor={name}
          >
            {label}
          </label>
          <textarea
            className={clsx('border-[#133052] resize-none border rounded-md outline-none p-2', className, {
              'text-transparent placeholder:text-transparent': !moveLabel && !field.value,
            })}
            {...field}
            onFocus={onFocusLabel}
            onBlur={() => {
              field.onBlur();
              if (!field.value) setMoveLabel(false);
            }}
            {...props}
          />
          <p className="text-red-700 text-[12px] h-3">{errorMessage}</p>
        </div>
      )}
    />
  );
};

export default Textarea;
