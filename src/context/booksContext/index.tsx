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
  setTotal: (total: number) => void;
  getBooks: () => void;
  page: number;
  size: number;
};

export const BooksContext = createContext<TBooksContext>({} as TBooksContext);

const BooksStorage = ({ children }: { children: ReactElement }) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);

  useEffect(() => {
    getBooks();
  }, [page, size]);

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
      value={{ getBooks, books, loading, setBooks, setPage, setSize, total, page, size, setTotal }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksStorage };
