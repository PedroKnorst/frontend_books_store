import { Add } from '@mui/icons-material';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';

interface Props {
  defaultValue?: string;
  name: string;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
  setFile: (e: File) => void;
}

const InputFile = ({ control, name, errors, setFile, defaultValue }: Props) => {
  const errorMessage = errors?.[name]?.message as string;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-[200px] flex items-center justify-center">
            {!defaultValue && (
              <input
                className="opacity-0 absolute h-full w-full cursor-pointer"
                {...field}
                value={''}
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    setFile(file);
                    if (file) {
                      const reader = new FileReader();

                      reader.onloadend = () => {
                        if (reader.result && !(reader.result instanceof ArrayBuffer)) {
                          field.onChange(reader.result);
                        }
                      };

                      reader.readAsDataURL(file);
                    }
                  }
                }}
                type="file"
                accept="image/*"
                id={name}
              />
            )}

            {field.value || defaultValue ? (
              <span className="flex gap-2 items-center w-full h-[200px]">
                <img
                  className="w-full h-[200px]"
                  src={`${field.value ? field.value : `http://localhost:3333/static/${defaultValue}`}`}
                  alt={name}
                />
              </span>
            ) : (
              <span className="flex">
                <Add />
                <p>Capa</p>
              </span>
            )}
          </div>
          <p className="text-red-700 text-[12px] h-3">{errorMessage}</p>
        </div>
      )}
    />
  );
};

export default InputFile;
