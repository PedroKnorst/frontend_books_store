import { IMarvelComicBook } from '#/@types/books';
import ComicBookCard from '#/components/atoms/ComicBookCard';
import Loading from '#/components/atoms/Loading';
import BooksPagination from '#/components/molecules/BooksPagination';
import { getMarvelComicBooksWithFilter } from '#/services/books';
import Container from '#/templates/Container';
import { useEffect, useState } from 'react';

const ComicBooksPage = () => {
  const [marvelBooks, setMarvelBooks] = useState<IMarvelComicBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    getMarvelComicBooksWithFilter({ page, size: 6 })
      .then((res) => {
        console.log(res.data.books);

        setMarvelBooks(res.data.books);
        setTotal(res.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <Container>
      <div className="bg-yellow-500 p-10 flex flex-col gap-6 mt-4 rounded-lg">
        <div className="self-end">
          <BooksPagination optionalTotal={total} optionalPage={page} optionalSetPage={setPage} optionalSize={6} />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {loading ? (
            <Loading className="col-span-full" />
          ) : marvelBooks.length === 0 ? (
            <p>Não há livros</p>
          ) : (
            marvelBooks.map((book) => (
              <ComicBookCard
                imagePath={book.image}
                authors={book.authors}
                characters={book.characters}
                description={book.description}
                title={book.title}
              />
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default ComicBooksPage;
