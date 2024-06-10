import Input from '#/components/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpValidationDefaultValues, signUpValidationSchema } from './validationSchema';
import Button from '#/components/Button';

type SignUpValidationSchemaType = z.infer<typeof signUpValidationSchema>;

const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpValidationSchemaType>({
    mode: 'all',
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: signUpValidationDefaultValues,
  });

  const inputUseFormHandler = (name: keyof SignUpValidationSchemaType) => ({
    control,
    errors,
    name,
  });

  const onSubmit = async (data: SignUpValidationSchemaType) => {};

  return (
    <div onSubmit={handleSubmit(onSubmit)} className="bg-yellow-500 rounded-lg py-8 px-4 grid gap-6">
      <Input {...inputUseFormHandler('name')} label="Nome" type="name" />
      <Input {...inputUseFormHandler('email')} label="Email" type="email" />
      <Input {...inputUseFormHandler('phone')} label="Telefone" type="phone" />
      <Input {...inputUseFormHandler('password')} label="Senha" />
      <Input {...inputUseFormHandler('confirmationPassword')} label="Confirmar senha" />
      <Button>Cadastre-se</Button>
    </div>
  );
};

export default SignUp;
