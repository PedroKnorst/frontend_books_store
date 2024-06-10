import Input from '#/components/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginValidationDefaultValues, loginValidationSchema } from './validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type LoginValidationSchemaType = z.infer<typeof loginValidationSchema>;

const Login = () => {
  const {
    control,
    formState: { errors },
  } = useForm<LoginValidationSchemaType>({
    mode: 'all',
    resolver: zodResolver(loginValidationSchema),
    defaultValues: loginValidationDefaultValues,
  });

  const inputUseFormHandler = (name: keyof LoginValidationSchemaType) => ({
    control,
    errors,
    name,
  });

  return (
    <div className="bg-yellow-500 rounded-lg py-8 px-4 grid gap-6">
      <Input {...inputUseFormHandler('email')} label="Email" type="email" />
      <Input {...inputUseFormHandler('password')} label="Senha" />
    </div>
  );
};

export default Login;
