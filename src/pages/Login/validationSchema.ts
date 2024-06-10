import { z } from 'zod';

export const loginValidationSchema = z.object({
  email: z.string().nonempty('O email é obrigatório!').email('Insira um email válido'),
  password: z.string().nonempty('A senha é obrigatória!'),
});

export const loginValidationDefaultValues = {
  email: '',
  password: '',
};
