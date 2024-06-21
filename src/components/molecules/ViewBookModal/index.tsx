import { BookCategory, IBook } from '#/@types/books';
import Button from '#/components/atoms/Button';
import Loading from '#/components/atoms/Loading';
import { useCartContext } from '#/context/cartContext/useCartContext';
import { findBookById } from '#/services/books';
import { inputMasks } from '#/utils/inputMasks';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Props {
  bookId: string;
}

const ViewBookModal = ({ bookId }: Props) => {
  const [book, setBook] = useState<IBook>();
  const [loadingBook, setLoadingBook] = useState(false);

  const { manageBookToCart, loadingManageBookToCart } = useCartContext();

  useEffect(() => {
    getBook();
  }, [bookId]);

  const getBook = async () => {
    setLoadingBook(true);
    await findBookById(bookId)
      .then((res) => {
        setBook(res.data);
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
      <img className="w-full h-full" src={`${`http://localhost:3333/static/${book?.Image.path}`}`} alt={book?.title} />
      <div className="flex justify-center gap-2 flex-col">
        <h2>{book?.title}</h2>
        <p>
          <span>Descrição: </span>
          {book?.description}
        </p>
      </div>
      <div className="col-span-2 flex flex-col w-full">
        <p>
          <span>Autor: </span>
          {book?.author}
        </p>
        <p>
          <span>Personagem principal: </span>
          {book?.character}
        </p>
        <p>
          <span>Data de lançamento: </span>
          {book?.publishDate ? format(book?.publishDate, 'dd/MM/yyyy') : 'Data desconhecida'}
        </p>
        <p>
          <span>Categoria: </span>
          {BookCategory[book?.category as unknown as keyof typeof BookCategory]}
        </p>
        <p>Preço: {book?.price ? inputMasks(book?.price, 'MONEY') : 'R$0,00'}</p>
        <p>Quantidade em estoque: {book?.storage}</p>
      </div>
      <div className="w-full col-span-2 mt-2">
        <Button
          className="w-full"
          loading={loadingManageBookToCart}
          onClick={() => manageBookToCart(bookId)}
          icon={<AddShoppingCart />}
        >
          Colocar no carrinho
        </Button>
      </div>
    </div>
  );
};

export default ViewBookModal;
