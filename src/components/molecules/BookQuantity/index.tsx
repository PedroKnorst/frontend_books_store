import Loading from '#/components/atoms/Loading';
import { ThickArrowDownIcon, ThickArrowUpIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface Props {
  bookStorage: number;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  loading?: boolean;
}

const BooksQuantity = ({ bookStorage, quantity, decreaseQuantity, increaseQuantity, loading }: Props) => {
  return (
    <div className="flex gap-1 items-center text-black justify-between">
      <h4>Quantidade: </h4>
      {loading ? (
        <Loading className="max-w-3 max-h-3" />
      ) : (
        <span data-testid="quantity" className="font-[500]">
          {quantity}
        </span>
      )}
      <div>
        <span
          data-testid="upIcon"
          onClick={quantity >= bookStorage ? () => null : increaseQuantity}
          className={clsx({ 'opacity-30': quantity === bookStorage })}
        >
          <ThickArrowUpIcon
            height={20}
            width={20}
            className="text-black cursor-pointer hover:-translate-y-1 transition"
          />
        </span>
        <span
          data-testid="downIcon"
          onClick={quantity <= 1 ? () => null : decreaseQuantity}
          className={clsx({ 'opacity-30': quantity === 1 })}
        >
          <ThickArrowDownIcon height={20} width={20} className="hover:translate-y-1 cursor-pointer transition" />
        </span>
      </div>
    </div>
  );
};

export default BooksQuantity;
