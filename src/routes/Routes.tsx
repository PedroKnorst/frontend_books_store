import { ReactElement } from 'react';
import { LoginLazy, SignUpLazy } from './lazyComponents';
import Home from '#/pages/Home';
import { Profiles } from '#/@types/user';
import ComicBooksPage from '#/pages/ComicBooksPage';
import MyBooks from '#/pages/MyBooks';
import { BooksStorage } from '#/context/booksContext';
import MySales from '#/pages/MySales';
import MyCart from '#/pages/MyCart';
import SalePage from '#/pages/SalePage';
import { CartStorage } from '#/context/cartContext';
import NotFoundPage from '#/helpers/NotFoundPage';

export interface IRoutes {
  path: string;
  component: ReactElement;
  accessPermission: Profiles[];
}

export const routes: IRoutes[] = [
  {
    path: '/',
    component: <LoginLazy />,
    accessPermission: [],
  },
  {
    path: '/cadastro',
    component: <SignUpLazy />,
    accessPermission: [],
  },
  {
    path: '/home',
    component: (
      <BooksStorage>
        <Home />
      </BooksStorage>
    ),
    accessPermission: ['CLIENT'],
  },
  {
    path: '/livros-marvel',
    component: <ComicBooksPage />,
    accessPermission: ['SALESPERSON', 'CLIENT'],
  },
  {
    path: '/meus-livros',
    component: (
      <BooksStorage>
        <MyBooks />
      </BooksStorage>
    ),
    accessPermission: ['SALESPERSON'],
  },
  {
    path: '/minhas-vendas',
    component: (
      <BooksStorage>
        <MySales />
      </BooksStorage>
    ),
    accessPermission: ['SALESPERSON'],
  },
  {
    path: '/meu-carrinho',
    component: (
      <CartStorage>
        <MyCart />
      </CartStorage>
    ),
    accessPermission: ['CLIENT'],
  },
  {
    path: '/meu-carrinho/finalizar-compra',
    component: (
      <CartStorage>
        <SalePage />
      </CartStorage>
    ),
    accessPermission: ['CLIENT'],
  },
  {
    path: '*',
    component: <NotFoundPage />,
    accessPermission: [],
  },
];
