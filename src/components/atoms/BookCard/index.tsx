import clsx from 'clsx';
import { ReactElement } from 'react';

interface Props {
  title: string;
  description: string;
  author: string;
  character: string;
  className?: string;
  icon?: ReactElement;
}

const BookCard = ({ description, title, className, icon }: Props) => {
  return (
    <div className={clsx('p-8 bg-white flex flex-col gap-2 text-black rounded-lg shadow-xl', className)}>
      {icon}
      <div className="grid gap-2">
        <h3 className="font-[600]">{title}</h3>
        <p className="truncate line-clamp-3">{description || 'A descrição deste livro esta indisponível.'}</p>
      </div>
    </div>
  );
};

export default BookCard;
