import { z } from 'zod';

export const saleValidationSchema = z.object({
  street: z.string().min(1, 'A rua é obrigatória'),
  neighborhood: z.string().min(1, 'O bairro é obrigatório'),
  city: z.string().min(1, 'A cidade é obrigatória'),
  state: z.string().min(1, 'O estado é obrigatório'),
  cep: z.string().min(1, 'O CEP é obrigatório'),
  streetNumber: z.string({ required_error: 'O número da residência é obrigatório' }),
  cardNumber: z.string().min(1, 'O número do cartão é obrigatório'),
  cvc: z.string({ required_error: 'O CVC do cartão é obrigatório' }),
  validity: z.string().min(1, 'A data de validade é obrigatória'),
});
