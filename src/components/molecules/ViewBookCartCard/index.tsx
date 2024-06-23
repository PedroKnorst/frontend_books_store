import { useMessageContext } from '#/context/messageContext/useMessageContext';
import { updateBookCart } from '#/services/bookCart';
import { useState } from 'react';
import BooksQuantity from '../BookQuantity';
import { useCartContext } from '#/context/cartContext/useCartContext';
import Loading from '#/components/atoms/Loading';
import { RemoveShoppingCart } from '@mui/icons-material';

interface Props {
  bookStorage: number;
  bookInitialQuantity: number;
  bookCartId: string;
  bookId: string;
}

const ViewBookCartCard = ({ bookCartId, bookStorage, bookInitialQuantity, bookId }: Props) => {
  const [quantity, setQuantity] = useState(bookInitialQuantity);
  const [loading, setLoading] = useState(false);

  const { setMessage } = useMessageContext();
  const { manageBookToCart, loadingManageBookToCart } = useCartContext();

  const increaseQuantity = async () => {
    setLoading(true);
    await updateBookCart({ id: bookCartId, quantity: quantity + 1 })
      .then((res) => {
        setQuantity(res.data.quantity);
      })
      .catch((error) => {
        setMessage({
          content: `${error.response.data.message}`,
          severity: 'fail',
          title: 'Erro ao aumentar quantidade',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const decreaseQuantity = async () => {
    setLoading(true);
    await updateBookCart({ id: bookCartId, quantity: quantity - 1 })
      .then((res) => {
        setQuantity(res.data.quantity);
      })
      .catch((error) => {
        setMessage({
          content: `${error.response.data.message}`,
          severity: 'fail',
          title: 'Erro ao diminuir quantidade',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="self-end justify-between w-full flex">
      <BooksQuantity
        loading={loading}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        quantity={quantity}
        bookStorage={bookStorage}
      />
      {loadingManageBookToCart ? (
        <Loading className="max-w-4 max-h-4" />
      ) : (
        <RemoveShoppingCart
          onClick={() => manageBookToCart(bookId, true)}
          className="text-red-600 cursor-pointer hover:scale-110 transition"
        />
      )}
    </div>
  );
};

export default ViewBookCartCard;
