import useFormControlValidation from '#/hooks/useFormControlValidation';
import { z } from 'zod';
import { createBookModalDefaultValues, createBookModalSchema } from './validationSchema';
import Input from '#/components/atoms/Input';
import { useAuthContext } from '#/context/authContext/useAuthContext';
import { createBook } from '#/services/books';
import { useState } from 'react';
import Button from '#/components/atoms/Button';
import Select from '#/components/atoms/Select';
import { BookCategory } from '#/@types/books';
import { useBooksContext } from '#/context/booksContext/useBooksContext';

interface Props {
  setOpenModal: (e: boolean) => void;
}

type CreateBookModalSchemaType = z.infer<typeof createBookModalSchema>;

const categories = Object.keys(BookCategory).map((category) => ({
  label: BookCategory[category as keyof typeof BookCategory],
  value: category,
}));

const CreateBookModal = ({ setOpenModal }: Props) => {
  const { handleSubmit, inputUseFormHandler } = useFormControlValidation({
    validationSchema: createBookModalSchema,
    defaultValues: createBookModalDefaultValues,
  });
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  const { setBooks, books } = useBooksContext();

  const onSubmit = async (data: CreateBookModalSchemaType) => {
    if (user.salespersonId) {
      setLoading(true);
      await createBook({
        ...data,
        price: parseFloat(data.price.replace('R$ ', '').replace(',', '.')),
        salespersonId: user.salespersonId,
        category: data.category as BookCategory,
      })
        .then((res) => {
          setBooks([res.data, ...books]);
          setOpenModal(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <Input className="bg-white" label="Título *" {...inputUseFormHandler('title')} />
      <Input className="bg-white" label="Descrição *" {...inputUseFormHandler('description')} />
      <Input className="bg-white" label="Autor *" {...inputUseFormHandler('author')} />
      <Input className="bg-white" label="Personagem *" {...inputUseFormHandler('character')} />
      <Input className="bg-white" mask="MONEY" label="Preço *" {...inputUseFormHandler('price')} />
      <Input className="bg-white" type="number" label="Quantidade em estoque *" {...inputUseFormHandler('storage')} />
      <Select className="bg-white" options={categories} label="Categoria * " {...inputUseFormHandler('category')} />
      <Input className="bg-white" type="date" label="Data de lançamento" {...inputUseFormHandler('publishDate')} />
      <Button className="col-span-2" loading={loading}>
        Cadastrar
      </Button>
    </form>
  );
};

export default CreateBookModal;
