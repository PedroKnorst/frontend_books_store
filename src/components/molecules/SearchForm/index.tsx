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
  comicBookFilter?: boolean;
}

const searchFormSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  releaseDateBegin: z.string().optional(),
  releaseDateEnd: z.string().optional(),
  startYear: z.string().optional(),
});

const categroyOptions = () => {
  const labels = Object.values(BookCategory);
  const values = Object.keys(BookCategory);

  const options = labels.map((option, index) => ({ label: option, value: values[index] }));

  return options;
};

export type SearchFormSchemaType = z.infer<typeof searchFormSchema>;

const SearchForm = ({ className, onSearch, comicBookFilter }: Props) => {
  const { handleSubmit, inputUseFormHandler, reset, values } = useFormControlValidation({
    validationSchema: searchFormSchema,
    defaultValues: { search: '', category: '', releaseDateBegin: '', releaseDateEnd: '', startYear: '' },
  });

  return (
    <form
      name="searchform"
      onSubmit={handleSubmit(onSearch)}
      className={clsx('w-full items-center justify-center gap-2 flex-wrap flex', className)}
    >
      <Input
        data-testid="search"
        className="w-[400px]"
        label="Pesquisar"
        placeholder={comicBookFilter ? 'Digite o nome do livro' : 'Busque por titulo, autor ou personagem'}
        {...inputUseFormHandler('search')}
      />
      {!comicBookFilter && (
        <Select
          data-testid="category"
          options={categroyOptions()}
          label="Categoria"
          {...inputUseFormHandler('category')}
        />
      )}
      {!comicBookFilter && (
        <Input
          data-testid="releaseDateBegin"
          max={values['releaseDateEnd']}
          type="date"
          label="De"
          {...inputUseFormHandler('releaseDateBegin')}
        />
      )}
      {!comicBookFilter && (
        <Input
          data-testid="releaseDateEnd"
          min={values['releaseDateBegin']}
          type="date"
          label="Até"
          {...inputUseFormHandler('releaseDateEnd')}
        />
      )}
      {comicBookFilter && (
        <Input
          data-testid="startYear"
          type="number"
          className="w-[200px]"
          min="0"
          max="9999"
          label="Ano de inicio"
          {...inputUseFormHandler('startYear')}
        />
      )}
      <Button type="submit">Filtrar</Button>
      <Button
        data-testid="cleanFilterButton"
        onClick={() => {
          reset();
          onSearch({});
        }}
        type="button"
      >
        Limpar filtro
      </Button>
    </form>
  );
};

export default SearchForm;
