import BookCard from '#/components/atoms/BookCard';
import Loading from '#/components/atoms/Loading';
import BooksPagination from '#/components/molecules/BooksPagination';
import { useBooksContext } from '#/context/booksContext/useBooksContext';
import Container from '#/templates/Container';
import { useEffect } from 'react';

const Home = () => {
  const { books, loading, setSize } = useBooksContext();

  useEffect(() => {
    setSize(6);
  }, []);

  return (
    <Container>
      <div className="bg-yellow-500 p-10 flex flex-col gap-6 mt-4 rounded-lg">
        <div className="self-end">
          <BooksPagination />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {loading ? <Loading /> : books.map((book) => <BookCard {...book} key={book.id} />)}
        </div>
      </div>
    </Container>
  );
};

export default Home;
