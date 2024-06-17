import useFormControlValidation from '#/hooks/useFormControlValidation';
import { z } from 'zod';
import { createBookModalDefaultValues, createBookModalSchema } from './validationSchema';
import Input from '#/components/atoms/Input';
import { useAuthContext } from '#/context/authContext/useAuthContext';
import { createBook, updateBook } from '#/services/books';
import { useState } from 'react';
import Button from '#/components/atoms/Button';
import Select from '#/components/atoms/Select';
import { BookCategory, IBook } from '#/@types/books';
import { useBooksContext } from '#/context/booksContext/useBooksContext';
import { useMessageContext } from '#/context/messageContext/useMessageContext';
import { isFloat } from '#/utils/checkNumberFloat';
import InputFile from '#/components/atoms/InputFile';

interface Props {
  setOpenModal: (e: boolean) => void;
  updatedBook?: IBook;
}

type CreateBookModalSchemaType = z.infer<typeof createBookModalSchema>;

const categories = Object.keys(BookCategory).map((category) => ({
  label: BookCategory[category as keyof typeof BookCategory],
  value: category,
}));

const CreateBookModal = ({ setOpenModal, updatedBook }: Props) => {
  const { handleSubmit, inputUseFormHandler, values } = useFormControlValidation({
    validationSchema: createBookModalSchema,
    defaultValues: updatedBook
      ? {
          ...updatedBook,
          publishDate: updatedBook.publishDate.slice(0, 10),
          price: isFloat(updatedBook.price) ? updatedBook.price.toString() : updatedBook.price.toString() + '00',
        }
      : createBookModalDefaultValues,
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();

  console.log({ values });

  const { user } = useAuthContext();
  const { getBooks } = useBooksContext();
  const { setMessage } = useMessageContext();

  console.log();

  const onSubmit = async (data: CreateBookModalSchemaType) => {
    if (user.salespersonId) {
      setLoading(true);

      if (updatedBook) {
        await updateBook({
          ...data,
          id: updatedBook.id,
          category: data.category as BookCategory,
          price: parseFloat(data.price.replace('R$ ', '').replace(',', '.')),
          image: file,
        })
          .then(() => {
            getBooks();
            setOpenModal(false);
            setMessage({ content: 'Livro atualizado com sucesso', severity: 'success', title: 'Sucesso!' });
          })
          .catch((error) => {
            setMessage({
              content: `${error.response.data.message}`,
              severity: 'fail',
              title: 'Erro!',
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        await createBook({
          ...data,
          price: parseFloat(data.price.replace('R$ ', '').replace(',', '.')),
          salespersonId: user.salespersonId,
          category: data.category as BookCategory,
          image: file,
        })
          .then(() => {
            getBooks();
            setOpenModal(false);
            setMessage({ content: 'O livro foi cadastrado com sucesso', severity: 'success', title: 'Sucesso!' });
          })
          .catch((error) => {
            setMessage({
              content: `${error.response.data.message}`,
              severity: 'fail',
              title: 'Erro!',
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <div className="row-span-3 flex justify-center">
        <InputFile defaultValue={updatedBook?.Image.path} setFile={setFile} {...inputUseFormHandler('image')} />
      </div>
      <Input className="bg-white" label="Título *" {...inputUseFormHandler('title')} />
      <Input className="bg-white" label="Descrição *" {...inputUseFormHandler('description')} />
      <Input className="bg-white" label="Autor *" {...inputUseFormHandler('author')} />
      <Input className="bg-white" label="Personagem *" {...inputUseFormHandler('character')} />
      <Input className="bg-white" mask="MONEY" label="Preço *" {...inputUseFormHandler('price')} />
      <Input className="bg-white" type="number" label="Quantidade em estoque *" {...inputUseFormHandler('storage')} />
      <Select className="bg-white" options={categories} label="Categoria * " {...inputUseFormHandler('category')} />
      <Input className="bg-white" type="date" label="Data de lançamento" {...inputUseFormHandler('publishDate')} />
      <Button className="col-span-2" loading={loading}>
        {updatedBook ? 'Confirmar' : 'Cadastrar'}
      </Button>
    </form>
  );
};

export default CreateBookModal;
