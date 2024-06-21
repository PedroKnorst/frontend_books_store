import { BookCategory } from '#/@types/books';
import Button from '#/components/atoms/Button';
import Input from '#/components/atoms/Input';
import Select from '#/components/atoms/Select';
import useFormControlValidation from '#/hooks/useFormControlValidation';
import clsx from 'clsx';
import { z } from 'zod';

interface Props {
  className?: string;
  onSearch: (data: SearchFormSchemaType) => void;
}

const searchFormSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  releaseDateBegin: z.string().optional(),
  releaseDateEnd: z.string().optional(),
});

const categroyOptions = () => {
  const labels = Object.values(BookCategory);
  const values = Object.keys(BookCategory);

  const options = labels.map((option, index) => ({ label: option, value: values[index] }));

  return options;
};

export type SearchFormSchemaType = z.infer<typeof searchFormSchema>;

const SearchForm = ({ className, onSearch }: Props) => {
  const { handleSubmit, inputUseFormHandler, reset, values } = useFormControlValidation({
    validationSchema: searchFormSchema,
    defaultValues: { search: '', category: '', releaseDateBegin: '', releaseDateEnd: '' },
  });

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className={clsx('w-full items-center justify-center gap-2 flex', className)}
    >
      <Input
        className="w-[400px]"
        label="Pesquisar"
        placeholder="Busque por titulo, autor ou personagem"
        {...inputUseFormHandler('search')}
      />
      <Select options={categroyOptions()} label="Categoria" {...inputUseFormHandler('category')} />
      <Input max={values['releaseDateEnd']} type="date" label="De" {...inputUseFormHandler('releaseDateBegin')} />
      <Input min={values['releaseDateBegin']} type="date" label="Até" {...inputUseFormHandler('releaseDateEnd')} />
      <Button type="submit">Filtrar</Button>
      <Button onClick={reset} type="button">
        Limpar filtro
      </Button>
    </form>
  );
};

export default SearchForm;
