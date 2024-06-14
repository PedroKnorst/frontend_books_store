import { useBooksContext } from '#/context/booksContext/useBooksContext';
import { ThickArrowLeftIcon, ThickArrowRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface Props {
  optionalPage?: number;
  optionalSetPage?: (page: number) => void;
  optionalSize?: number;
  optionalTotal?: number;
}

const BooksPagination = ({ optionalPage, optionalSetPage, optionalSize, optionalTotal }: Props) => {
  const { page, setPage, size, total } = useBooksContext();

  const currentPage = optionalPage || page;
  const currentSetPage = optionalSetPage || setPage;
  const currentSize = optionalSize || size;
  const currentTotal = optionalTotal || total;

  const totalPages = !Number.isNaN(Math.ceil(currentTotal / currentSize)) ? Math.ceil(currentTotal / currentSize) : 0;

  const setNextPage = () => {
    currentSetPage(currentPage + 1);
  };

  const setPastPage = () => {
    currentSetPage(currentPage - 1);
  };

  return (
    <div className="flex gap-1 text-black items-center justify-between">
      <ThickArrowLeftIcon
        height={20}
        width={20}
        className={clsx(
          'text-black cursor-pointer',
          { 'opacity-30': currentPage === 1 || currentPage === 0 },
          'hover:-translate-x-1 transition',
        )}
        onClick={currentPage === 1 || currentPage === 0 ? () => null : setPastPage}
      />
      <span className="font-[500]">
        {currentPage} de {totalPages}
      </span>
      <ThickArrowRightIcon
        height={20}
        width={20}
        className={clsx(
          'text-black cursor-pointer',
          { 'opacity-30': currentPage === totalPages || totalPages === 0 },
          'hover:translate-x-1 transition',
        )}
        onClick={currentPage === totalPages || totalPages === 0 ? () => null : setNextPage}
      />
    </div>
  );
};

export default BooksPagination;
