import { ThickArrowLeftIcon, ThickArrowRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

interface Props {
  page: number;
  setPage: (page: number) => void;
  size: number;
  total: number;
}

const BooksPagination = ({ page, setPage, size, total }: Props) => {
  const totalPages = !Number.isNaN(Math.ceil(total / size)) ? Math.ceil(total / size) : 0;

  const setNextPage = () => {
    setPage(page + 1);
  };

  const setPastPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex gap-1 text-black items-center justify-between">
      <span
        data-testid="leftIcon"
        onClick={page === 1 || page === 0 ? () => null : setPastPage}
        className={clsx({ 'opacity-30': page === 1 || page === 0 })}
      >
        <ThickArrowLeftIcon
          height={20}
          width={20}
          className={clsx('text-black cursor-pointer', 'hover:-translate-x-1 transition')}
        />
      </span>
      <span data-testid="paginationCounter" className="font-[500]">
        {page} de {totalPages}
      </span>
      <span
        data-testid="rightIcon"
        onClick={page === totalPages || totalPages === 0 ? () => null : setNextPage}
        className={clsx({ 'opacity-30': page === totalPages || totalPages === 0 })}
      >
        <ThickArrowRightIcon
          height={20}
          width={20}
          className={clsx('text-black cursor-pointer', 'hover:translate-x-1 transition')}
        />
      </span>
    </div>
  );
};

export default BooksPagination;
