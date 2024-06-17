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
        <>
          <div className="cursor-pointer relative w-40 h-full flex items-center border-yellow-500 border-2 justify-center">
            <input
              className="opacity-0 absolute h-full w-full cursor-pointer"
              {...field}
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

            {field.value ? (
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
        </>
      )}
    />
  );
};

export default InputFile;
