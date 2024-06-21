import { useAuthContext } from '#/context/authContext/useAuthContext';
import { useCartContext } from '#/context/cartContext/useCartContext';
import { MenuBook, ShoppingCart } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import marvelLogo from '#assets/marvel-logo.png';

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

  const client = user.clientId;
  const salesperson = user.salespersonId;

  return (
    <header className="w-full items-center justify-between flex p-8 bg-yellow-500 rounded-lg">
      <div className="flex items-center gap-2">
        <img src={marvelLogo} className="h-14 w-full" alt="Marvel Logo" />
        <MenuBook className="text-white" fontSize="large" />
      </div>
      <ul className="flex gap-10 w-full justify-center">
        {navList.map(
          (option) =>
            ((option.permission.includes('CLIENT') && client) ||
              (option.permission.includes('SALESPERSON') && salesperson)) && (
              <li key={option.path} className="cursor-pointer hover:font-[700] text-black relative">
                <NavLink to={option.path}>
                  {option.title === 'Carrinho' && cart && (
                    <span className="p-1 text-[8pt] flex items-center rounded absolute -top-5 -right-9 bg-[#dc143c] text-white">
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
