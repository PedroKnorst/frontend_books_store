import { IBook } from '#/@types/books';
import { getBooksWithFilter } from '#/services/books';
import { ReactElement, createContext, useEffect, useState } from 'react';

type TBooksContext = {
  books: IBook[];
  total: number;
  loading: boolean;
  setBooks: (books: IBook[]) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  page: number;
  size: number;
};

export const BooksContext = createContext<TBooksContext>({} as TBooksContext);

const BooksStorage = ({ children }: { children: ReactElement }) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);

  useEffect(() => {
    getBooks();
  }, [page, size]);

  useEffect(() => {
    setPage(total > 0 ? 1 : 0);
  }, [books])

  const getBooks = async () => {
    setLoading(true);

    await getBooksWithFilter({ page: total === 0 ? 1 : page, size })
      .then((res) => {
        setBooks(res.data.books);
        setTotal(res.data.total);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        setBooks,
        setPage,
        setSize,
        total,
        page,
        size,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksStorage };
