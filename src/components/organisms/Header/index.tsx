import { useAuthContext } from '#/context/authContext/useAuthContext';
import { NavLink } from 'react-router-dom';

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

  const client = user.clientId;
  const salesperson = user.salespersonId;

  return (
    <header className="w-full justify-between flex p-8 bg-yellow-500 rounded-lg">
      <h2 className="min-w-[100px]">Loja de livros</h2>
      <ul className="flex gap-10 w-full justify-center">
        {navList.map(
          (option) =>
            ((option.permission.includes('CLIENT') && client) ||
              (option.permission.includes('SALESPERSON') && salesperson)) && (
              <li key={option.path} className="cursor-pointer hover:font-[700] text-black">
                <NavLink to={option.path}>{option.title}</NavLink>
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
