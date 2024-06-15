import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import clsx from 'clsx';

interface Props {
  title: string;
  description: string;
  author: string;
  character: string;
  className?: string;
}

const BookCard = ({ description, title, className }: Props) => {
  return (
    <div className={clsx('p-8 bg-white flex flex-col gap-2 text-black rounded-lg shadow-xl', className)}>
      <AddShoppingCartIcon className="self-end cursor-pointer hover:scale-110 transition" color="success" />
      <div className="grid gap-2">
        <h3 className="font-[600]">{title}</h3>
        <p className="max-w-44 truncate line-clamp-3">{description || 'A descrição deste livro esta indisponível.'}</p>
      </div>
    </div>
  );
};

export default BookCard;
