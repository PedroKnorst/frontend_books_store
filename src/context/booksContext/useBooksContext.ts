import { useContext } from 'react';
import { BooksContext } from '.';

const useBooksContext = () => {
  const context = useContext(BooksContext);

  return context;
};

export { useBooksContext };
