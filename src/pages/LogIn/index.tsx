import { z } from 'zod';
import { loginValidationDefaultValues, loginValidationSchema } from './validationSchema';
import { useAuthContext } from '#/context/authContext/useAuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import Input from '#/components/atoms/Input';
import Button from '#/components/atoms/Button';
import useFormControlValidation from '#/hooks/useFormControlValidation';
import AuthContainer from '#/templates/AuthContainer';

type LoginValidationSchemaType = z.infer<typeof loginValidationSchema>;

const Login = () => {
  const { handleSubmit, inputUseFormHandler } = useFormControlValidation({
    validationSchema: loginValidationSchema,
    defaultValues: loginValidationDefaultValues,
  });
  const { signIn, loading } = useAuthContext();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginValidationSchemaType) => {
    const isSigned = await signIn(data);

    if (isSigned) navigate('/livros-marvel');
  };

  return (
    <AuthContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-yellow-500 rounded-lg py-8 sm:min-w-[400px] px-4 grid gap-6"
      >
        <Input
          className="bg-yellow-500 text-white border-b-white"
          labelClassName="text-white"
          {...inputUseFormHandler('email')}
          label="Email"
          type="email"
        />
        <Input
          className="bg-yellow-500 text-white border-b-white"
          labelClassName="text-white"
          {...inputUseFormHandler('password')}
          label="Senha"
        />
        <div className="flex flex-col gap-2">
          <Button loading={loading}>Entrar</Button>
          <NavLink to={'/cadastro'} className="text-red-600 text-center hover:text-red-500 transition font-[700]">
            Cadastre-se
          </NavLink>
        </div>
      </form>
    </AuthContainer>
  );
};

export default Login;
