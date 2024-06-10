import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactElement } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  icon?: ReactElement;
  loading?: boolean;
}

const Button = ({ children, icon, loading, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'bg-red-600 shadow-md justify-center rounded-lg flex items-center hover:translate-x-[1px] hover:-translate-y-[1px] transition w-32 h-8 focus:outline-none focus:ring-0',
        {
          'cursor-wait opacity-40': loading,
        },
      )}
      {...props}
    >
      {icon}
      <span>{loading ? 'Carregando...' : children}</span>
    </button>
  );
};

export default Button;
