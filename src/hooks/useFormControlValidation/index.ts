import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  validationSchema: any;
  defaultValues?: Object;
}

const useFormControlValidation = ({ validationSchema, defaultValues }: Props) => {
  type ValidationSchemaType = z.infer<typeof validationSchema>;
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<ValidationSchemaType>({
    mode: 'all',
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const values = getValues();

  const inputUseFormHandler = (name: keyof ValidationSchemaType) => ({
    control,
    errors,
    name: name as string,
  });

  return { inputUseFormHandler, handleSubmit, values, reset };
};

export default useFormControlValidation;
