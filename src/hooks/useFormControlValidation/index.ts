import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
  validationSchema: any;
  defaultValues: Object;
}

const useFormControlValidation = ({ validationSchema, defaultValues }: Props) => {
  type ValidationSchemaType = z.infer<typeof validationSchema>;
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ValidationSchemaType>({
    mode: 'all',
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const inputUseFormHandler = (name: keyof ValidationSchemaType) => ({
    control,
    errors,
    name: name as string,
  });

  return { inputUseFormHandler, handleSubmit };
};

export default useFormControlValidation;
