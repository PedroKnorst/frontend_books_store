import { BookCategory, IBook } from '#/@types/books';
import Button from '#/components/atoms/Button';
import Loading from '#/components/atoms/Loading';
import { useCartContext } from '#/context/cartContext/useCartContext';
import { findBookById } from '#/services/books';
import { inputMasks } from '#/utils/inputMasks';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import { useEffect, useState } from 'react';

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
    <div className="flex gap-2">
      <span className="flex gap-2 items-center w-full h-[200px]">
        <img
          className="w-full h-[200px]"
          src={`${`http://localhost:3333/static/${book?.Image.path}`}`}
          alt={book?.title}
        />
      </span>
      <div className="flex gap-2 flex-col">
        <h2>{book?.title}</h2>
        <p>
          <span>Descrição: </span>
          {book?.description}
        </p>
        <p>
          <span>Autor: </span>
          {book?.author}
        </p>
        <p>
          <span>Personagem principal: </span>
          {book?.character}
        </p>
        <p>
          <span>Categoria: </span>
          {BookCategory[book?.category as unknown as keyof typeof BookCategory]}
        </p>
        <p>Preço: {book?.price ? inputMasks(book?.price, 'MONEY') : 'R$0,00'}</p>
        <p>Quantidade em estoque: {book?.storage}</p>
      </div>
      <div className="w-full mt-2">
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
