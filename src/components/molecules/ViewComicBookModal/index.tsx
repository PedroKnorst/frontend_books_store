import { IMarvelComicBook } from '#/@types/books';
import Loading from '#/components/atoms/Loading';
import { getMarvelComicBooksWithFilter } from '#/services/books';
import { inputMasks } from '#/utils/inputMasks';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface Props {
  comicBookId?: string;
}

const ViewComicBookModal = ({ comicBookId }: Props) => {
  const [book, setBook] = useState<IMarvelComicBook>();
  const [loadingBook, setLoadingBook] = useState(false);

  useEffect(() => {
    getBook();
  }, [comicBookId]);

  const getBook = async () => {
    setLoadingBook(true);
    await getMarvelComicBooksWithFilter({ digitalId: comicBookId })
      .then((res) => {
        setBook(res.data.books[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingBook(false);
      });
  };

  return loadingBook ? (
    <Loading />
  ) : (
    <div className="grid grid-cols-2 gap-3">
      <img className="w-full h-full" src={book?.image} alt={book?.title} />
      <div className="flex justify-center gap-2 flex-col">
        <h2>{book?.title}</h2>
      </div>
      <div className="col-span-2 flex flex-col w-full">
        <p>
          <span>Descrição: </span>
          {book?.description || 'Não há descrição'}
        </p>
        <p>
          <span>Autores: </span>
          {book?.authors.length === 0
            ? 'Marvel'
            : book?.authors.map((author, index) => author + (book?.authors.length - 1 === index ? '' : ', '))}
        </p>
        <p>
          Personagens:{' '}
          {book?.characters.length === 0
            ? 'Não há personagens neste livro'
            : book?.characters.map(
                (character, index) => character + (book?.characters.length - 1 === index ? '' : ', '),
              )}
        </p>
        <p>
          <span>Data de lançamento: </span>
          {book?.publishDate ? format(book?.publishDate, 'dd/MM/yyyy') : 'Data desconhecida'}
        </p>
        <p>
          Preços:{' '}
          {book?.prices.map(
            (price, index) => inputMasks(price, 'MONEY') + (book?.prices.length - 1 === index ? '' : ', '),
          )}
        </p>
      </div>
    </div>
  );
};

export default ViewComicBookModal;
