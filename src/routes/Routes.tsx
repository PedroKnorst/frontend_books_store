import { ReactElement } from 'react';
import { LoginLazy } from './lazyComponents';

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
];
