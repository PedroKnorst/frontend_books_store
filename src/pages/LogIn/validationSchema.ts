import { z } from 'zod';

export const loginValidationSchema = z.object({
  email: z.string().min(1, 'O email é obrigatório!').email('Insira um email válido'),
  password: z.string().min(1, 'A senha é obrigatória!'),
});

export const loginValidationDefaultValues = {
  email: '',
  password: '',
};
