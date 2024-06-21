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
              'absolute top-2 px-1 transition left-2',
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
            className="border-[#133052] resize-none min-h-16 border outline-none rounded-md max-w-60 min-w-32 p-2"
            {...field}
            onFocus={onFocusLabel}
            onBlur={() => {
              field.onBlur();
              setMoveLabel(false);
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
