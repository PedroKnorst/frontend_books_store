import { z } from 'zod';
import { signUpValidationDefaultValues, signUpValidationSchema } from './validationSchema';
import { Profiles } from '#/@types/user';
import { useAuthContext } from '#/context/authContext/useAuthContext';
import Input from '#/components/atoms/Input';
import Select from '#/components/atoms/Select';
import Button from '#/components/atoms/Button';
import useFormControlValidation from '#/hooks/useFormControlValidation';
import AuthContainer from '#/templates/AuthContainer';
import { NavLink, useNavigate } from 'react-router-dom';

type SignUpValidationSchemaType = z.infer<typeof signUpValidationSchema>;

const selectOptions = [
  {
    label: 'Vendedor',
    value: 'SALESPERSON',
  },
  {
    label: 'Cliente',
    value: 'CLIENT',
  },
];

const SignUp = () => {
  const { handleSubmit, inputUseFormHandler } = useFormControlValidation({
    validationSchema: signUpValidationSchema,
    defaultValues: signUpValidationDefaultValues,
  });
  const { signUp, loading } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpValidationSchemaType) => {
    const isSigned = await signUp({ ...data, profile: data.profile as Profiles });
    if (isSigned) navigate('/livros-marvel');
  };

  return (
    <AuthContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-yellow-500 rounded-lg py-8 px-4 grid grid-cols-1 gap-6">
        <Input
          labelClassName="text-white"
          className="text-white bg-yellow-500 border-b-white"
          {...inputUseFormHandler('name')}
          label="Nome"
          type="name"
        />
        <Input
          labelClassName="text-white"
          className="text-white bg-yellow-500 border-b-white"
          {...inputUseFormHandler('email')}
          label="Email"
          type="email"
        />
        <Input
          labelClassName="text-white"
          className="text-white bg-yellow-500 border-b-white"
          {...inputUseFormHandler('phone')}
          label="Telefone"
          type="phone"
        />
        <Select
          labelClassName="text-white"
          className="text-white bg-yellow-500 border-b-white"
          {...inputUseFormHandler('profile')}
          options={selectOptions}
          label="Perfil"
        />
        <Input
          labelClassName="text-white"
          className="text-white bg-yellow-500 border-b-white"
          {...inputUseFormHandler('password')}
          label="Senha"
        />
        <Input
          labelClassName="text-white"
          className="text-white bg-yellow-500 border-b-white"
          {...inputUseFormHandler('confirmationPassword')}
          label="Confirmar senha"
        />
        <div className="flex flex-col sm:col-span-2 gap-2">
          <Button loading={loading}>Cadastrar</Button>
          <NavLink to={'/'} className="text-red-600 text-center hover:text-red-500 transition font-[700]">
            Ja possui cadastro? Faça login!
          </NavLink>
        </div>
      </form>
    </AuthContainer>
  );
};

export default SignUp;
