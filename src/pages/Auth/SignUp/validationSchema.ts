import { z } from 'zod';

export const signUpValidationSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório!'),
    email: z.string().min(1, 'O email é obrigatório!'),
    password: z.string().min(1, 'A senha é obrigatório!'),
    confirmationPassword: z.string().min(1, 'Confirme sua senha!'),
    phone: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmationPassword, { message: 'As senhas não coincidem!' });

export const signUpValidationDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmationPassword: '',
  phone: '',
};
