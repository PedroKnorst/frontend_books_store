import Loading from '#/components/atoms/Loading';
import { useMessageContext } from '#/context/messageContext/useMessageContext';
import { updateBookCart } from '#/services/bookCart';
import { ThickArrowDownIcon, ThickArrowUpIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
  bookCartId: string;
  bookStorage: number;
  bookInitialQuantity: number;
}

const BooksQuantity = ({ bookCartId, bookStorage, bookInitialQuantity }: Props) => {
  const [quantity, setQuantity] = useState(bookInitialQuantity);
  const [loading, setLoading] = useState(false);

  const { setMessage } = useMessageContext();

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
    <div className="flex gap-1 items-center text-black justify-between">
      <h4>Quantidade: </h4>
      {loading ? <Loading className="max-w-3 max-h-3" /> : <span className="font-[500]">{quantity}</span>}
      <div>
        <ThickArrowUpIcon
          height={20}
          width={20}
          className={clsx(
            'text-black cursor-pointer',
            { 'opacity-30': quantity === bookStorage },
            'hover:-translate-y-1 transition',
          )}
          onClick={quantity === bookStorage ? () => null : increaseQuantity}
        />
        <ThickArrowDownIcon
          height={20}
          width={20}
          className={clsx(
            'text-black cursor-pointer',
            { 'opacity-30': quantity === 1 },
            'hover:translate-y-1 transition',
          )}
          onClick={quantity === 1 ? () => null : decreaseQuantity}
        />
      </div>
    </div>
  );
};

export default BooksQuantity;
