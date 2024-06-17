import { z } from 'zod';

export const createBookModalSchema = z.object({
  title: z.string().min(1, 'O Título é obrigatório!'),
  description: z.string().min(1, 'A descrição é obrigatória!'),
  author: z.string().min(1, 'O Autor é obrigatório!'),
  character: z.string().min(1, 'O Personagem é obrigatório!'),
  price: z.string().min(0, 'O Preço não deve ser menor que 0!'),
  storage: z
    .number({ invalid_type_error: 'O Estoque deve ser maior que 0!' })
    .min(1, 'O Estoque deve ser maior que 0!'),
  category: z.string().min(1, 'A Categoria é obrigatória!'),
  publishDate: z.string().optional(),
  image: z.string({ required_error: 'A imagem é obrigatória!' }),
});

export const createBookModalDefaultValues = {
  title: '',
  description: '',
  author: '',
  character: '',
  price: '0',
  storage: 1,
  category: '',
  publishDate: '',
  image: undefined,
};
