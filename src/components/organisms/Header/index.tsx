import { useAuthContext } from '#/context/authContext/useAuthContext';
import { useCartContext } from '#/context/cartContext/useCartContext';
import { ShoppingCart } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import marvelLogo from '#assets/marvel-logo.png';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import clsx from 'clsx';

const navList = [
  {
    title: 'Home',
    path: '/home',
    permission: ['CLIENT'],
  },
  {
    title: 'Livros Marvel',
    path: '/livros-marvel',
    permission: ['CLIENT', 'SALESPERSON'],
  },
  {
    title: 'Meus Livros',
    path: '/meus-livros',
    permission: ['SALESPERSON'],
  },
  {
    title: 'Minhas vendas',
    path: '/minhas-vendas',
    permission: ['SALESPERSON'],
  },
  {
    title: 'Carrinho',
    path: '/meu-carrinho',
    permission: ['CLIENT'],
  },
];

const Header = () => {
  const { user, logOut } = useAuthContext();
  const { cart } = useCartContext();
  const [menu, setMenu] = useState<boolean>(false);

  const client = user.clientId;
  const salesperson = user.salespersonId;

  const openMenu = () => {
    setMenu((previousValue) => !previousValue);
  };

  return (
    <header className="w-full relative items-center justify-between flex p-8 bg-yellow-500 rounded-lg">
      <div className="flex gap-2">
        <div className="flex w-full items-center md:hidden">
          <Cross1Icon
            onClick={openMenu}
            className={`h-7 w-7 ${menu ? 'rotate-180 scale-100' : 'scale-0'} absolute cursor-pointer duration-200`}
          />
          <HamburgerMenuIcon
            onClick={openMenu}
            className={`h-7 w-7 ${menu ? '-rotate-180 scale-0' : ''} cursor-pointer duration-200`}
          />
        </div>
        <img src={marvelLogo} className="h-14 w-full" alt="Marvel Logo" />
      </div>
      <ul
        className={clsx(
          {
            'scale-100 transform rounded-md opacity-100 max-md:bg-white max-md:p-5 max-md:shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)]':
              menu,
          },
          'z-10 scale-95 transform opacity-0 grid flex-wrap items-center justify-center gap-6 duration-100 ease-in-out max-md:absolute max-md:left-2 max-md:top-24 md:flex md:scale-100 md:opacity-100',
        )}
      >
        {navList.map(
          (option) =>
            ((option.permission.includes('CLIENT') && client) ||
              (option.permission.includes('SALESPERSON') && salesperson)) && (
              <li key={option.path} className="cursor-pointer hover:font-[700] text-black relative">
                <NavLink
                  className={
                    (clsx({ 'text-[#dc143c]': location.pathname.includes(option.path) }), 'max-md:text-black relative')
                  }
                  to={option.path}
                >
                  {option.title === 'Carrinho' && cart && (
                    <span className="p-1 text-[8pt] flex items-center rounded absolute  -top-5 -right-9 bg-[#dc143c] text-white">
                      <ShoppingCart className="max-h-[16px] max-w-[16px]" />
                      {cart?.BooksCart?.length}
                    </span>
                  )}
                  {option.title}
                </NavLink>
              </li>
            ),
        )}
      </ul>
      <NavLink onClick={logOut} to="/">
        Sair
      </NavLink>
    </header>
  );
};

export default Header;
