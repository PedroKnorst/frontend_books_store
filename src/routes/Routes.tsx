import { ReactElement } from 'react';
import { LoginLazy, SignUpLazy } from './lazyComponents';

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
];
