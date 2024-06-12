import { ReactElement } from 'react';
import { LoginLazy, SignUpLazy } from './lazyComponents';
import Home from '#/pages/Home';

export interface IRoutes {
  path: string;
  component: ReactElement;
  accessPermission: string[];
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
];
