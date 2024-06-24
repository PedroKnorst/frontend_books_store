import { BookCategory } from '#/@types/books';
import BookCard from '#/components/atoms/BookCard';
import Loading from '#/components/atoms/Loading';
import Modal from '#/components/atoms/Modal';
import BooksPagination from '#/components/molecules/BooksPagination';
import SearchForm, { SearchFormSchemaType } from '#/components/molecules/SearchForm';
import ViewBookModal from '#/components/molecules/ViewBookModal';
import { useBooksContext } from '#/context/booksContext/useBooksContext';
import { getBooksWithFilter } from '#/services/books';
import Container from '#/templates/Container';

const Home = () => {
  const { books, loading, setTotal, setBooks, page, setPage, size, total } = useBooksContext();

  const onSearch = async ({ search, category, releaseDateBegin, releaseDateEnd }: SearchFormSchemaType) => {
    const searchItem = search
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    await getBooksWithFilter({
      page: 1,
      size: 8,
      author: searchItem,
      category: category as BookCategory,
      character: searchItem,
      title: searchItem,
      publishDateEnds: releaseDateEnd,
      publishDateStarts: releaseDateBegin,
    }).then((res) => {
      setBooks(res.data.books);
      setTotal(res.data.total);
    });
  };

  return (
    <Container>
      <div className="bg-yellow-500 p-10 flex flex-col gap-6 mt-4 rounded-lg">
        <div className="flex w-full">
          <SearchForm onSearch={onSearch} />
        </div>
        <div className="self-end">
          <BooksPagination page={page} setPage={setPage} size={size} total={total} />
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {loading ? (
            <Loading />
          ) : books.length === 0 ? (
            <h2 className="col-span-2">Não há livros disponiveis para compra</h2>
          ) : (
            books.map((book) => (
              <Modal
                key={book.id}
                triggerButton={<BookCard imagePath={book.Image.path} className="text-left" {...book} />}
              >
                <ViewBookModal bookId={book.id} />
              </Modal>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Home;
