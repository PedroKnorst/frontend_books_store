import { ReactElement } from 'react';
import {
  ComicBooksPageLazy,
  HomeLazy,
  LoginLazy,
  MyBooksLazy,
  MyCartLazy,
  MySalesLazy,
  NotFoundPageLazy,
  SalePageLazy,
  SignUpLazy,
} from './lazyComponents';
import { Profiles } from '#/@types/user';
import { BooksStorage } from '#/context/booksContext';
import { CartStorage } from '#/context/cartContext';

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
        <HomeLazy />
      </BooksStorage>
    ),
    accessPermission: ['CLIENT'],
  },
  {
    path: '/livros-marvel',
    component: <ComicBooksPageLazy />,
    accessPermission: ['SALESPERSON', 'CLIENT'],
  },
  {
    path: '/meus-livros',
    component: (
      <BooksStorage>
        <MyBooksLazy />
      </BooksStorage>
    ),
    accessPermission: ['SALESPERSON'],
  },
  {
    path: '/minhas-vendas',
    component: (
      <BooksStorage>
        <MySalesLazy />
      </BooksStorage>
    ),
    accessPermission: ['SALESPERSON'],
  },
  {
    path: '/meu-carrinho',
    component: (
      <CartStorage>
        <MyCartLazy />
      </CartStorage>
    ),
    accessPermission: ['CLIENT'],
  },
  {
    path: '/meu-carrinho/finalizar-compra',
    component: (
      <CartStorage>
        <SalePageLazy />
      </CartStorage>
    ),
    accessPermission: ['CLIENT'],
  },
  {
    path: '*',
    component: <NotFoundPageLazy />,
    accessPermission: [],
  },
];
