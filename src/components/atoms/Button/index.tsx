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
      {...props}
      className={clsx(
        'border shadow-md justify-center rounded-lg flex items-center transition min-w-32 p-3 h-8 font-[600]',
        'hover:translate-x-[1px] hover:-translate-y-[1px] hover:bg-white hover:text-red-600',
        'focus:outline-none focus:ring-0',
        'bg-red-600 border-red-600 text-white',
        {
          'cursor-wait opacity-40': loading,
        },
        props.className,
      )}
    >
      {icon}
      <span>{loading ? 'Carregando...' : children}</span>
    </button>
  );
};

export default Button;
