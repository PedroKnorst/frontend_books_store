import { IBook } from '#/@types/books';
import { getBooksWithFilter } from '#/services/books';
import { ReactElement, createContext, useEffect, useState } from 'react';

type TBooksContext = {
  books: IBook[];
  loading: boolean;
  setBooks: (books: IBook[]) => void
};

export const BooksContext = createContext<TBooksContext>({} as TBooksContext);

const BooksStorage = ({ children }: { children: ReactElement }) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setLoading(true);

    await getBooksWithFilter({ page: 1, size: 5 })
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return <BooksContext.Provider value={{ books, loading, setBooks }}>{children}</BooksContext.Provider>;
};

export { BooksStorage };
