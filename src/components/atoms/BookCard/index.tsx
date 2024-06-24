import clsx from 'clsx';
import { ReactElement } from 'react';

interface Props {
  title: string;
  imagePath: string;
  className?: string;
  icon?: ReactElement;
}

const BookCard = ({ title, className, icon, imagePath }: Props) => {
  return (
    <div
      className={clsx(
        'p-4 h-[350px] justify-center items-center bg-white flex flex-col gap-2 text-black rounded-lg shadow-xl',
        className,
      )}
    >
      {icon}
      <div className="flex gap-2 text-center flex-col">
        <span className="h-[200px] flex justify-center">
          <img className="h-[200px]" src={`http://localhost:3333/static/${imagePath}`} alt={title} />
        </span>
        <h3 className="font-[600]">{title}</h3>
      </div>
    </div>
  );
};

export default BookCard;
