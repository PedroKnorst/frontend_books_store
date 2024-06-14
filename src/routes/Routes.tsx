import { ReactElement } from 'react';
import { LoginLazy, SignUpLazy } from './lazyComponents';
import Home from '#/pages/Home';
import { Profiles } from '#/@types/user';
import ComicBooksPage from '#/pages/ComicBooksPage';
import MySales from '#/pages/MySales';
import { BooksStorage } from '#/context/booksContext';

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
    component: <Home />,
    accessPermission: ['SALESPERSON', 'CLIENT'],
  },
  {
    path: '/livros-marvel',
    component: <ComicBooksPage />,
    accessPermission: ['SALESPERSON', 'CLIENT'],
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
];
