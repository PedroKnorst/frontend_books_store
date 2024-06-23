import { IMarvelComicBook } from '#/@types/books';
import ComicBookCard from '#/components/atoms/ComicBookCard';
import Loading from '#/components/atoms/Loading';
import Modal from '#/components/atoms/Modal';
import BooksPagination from '#/components/molecules/BooksPagination';
import SearchForm, { SearchFormSchemaType } from '#/components/molecules/SearchForm';
import ViewComicBookModal from '#/components/molecules/ViewComicBookModal';
import { getMarvelComicBooksWithFilter } from '#/services/books';
import Container from '#/templates/Container';
import { useEffect, useState } from 'react';

const ComicBooksPage = () => {
  const [marvelBooks, setMarvelBooks] = useState<IMarvelComicBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [title, setTitle] = useState('');
  const [startYear, setStartYear] = useState('');

  useEffect(() => {
    onGetComicBooks();
  }, [page]);

  const onGetComicBooks = () => {
    setLoading(true);
    getMarvelComicBooksWithFilter({ page, size: 8, title, startYear })
      .then((res) => {
        setMarvelBooks(res.data.books);
        setTotal(res.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const onSearch = async ({ search, startYear }: SearchFormSchemaType) => {
    setLoading(true);

    const searchItem = search
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (startYear) setStartYear(startYear);
    if (search) setTitle(search);

    await getMarvelComicBooksWithFilter({
      page: 1,
      size: 8,
      title: searchItem,
      startYear: startYear,
    })
      .then((res) => {
        setMarvelBooks(res.data.books);
        setTotal(res.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <div className="bg-yellow-500 p-10 flex flex-col gap-6 mt-4 rounded-lg">
        <div className="flex w-full">
          <SearchForm comicBookFilter onSearch={onSearch} />
        </div>
        <div className="self-end">
          <BooksPagination total={total} page={page} setPage={setPage} size={6} />
        </div>
        <div className="grid grid-cols-4 gap-6">
          {loading ? (
            <Loading className="col-span-full" />
          ) : marvelBooks.length === 0 ? (
            <p>Não há livros</p>
          ) : (
            marvelBooks.map((book) => (
              <Modal key={book.id} triggerButton={<ComicBookCard imagePath={book.image} title={book.title} />}>
                <ViewComicBookModal comicBookId={book.id} />
              </Modal>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default ComicBooksPage;
