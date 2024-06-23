import { lazy } from 'react';

export const LoginLazy = lazy(() => import('#/pages/LogIn'));
export const SignUpLazy = lazy(() => import('#/pages/SignUp'));
export const HomeLazy = lazy(() => import('#/pages/Home'));
export const ComicBooksPageLazy = lazy(() => import('#/pages/ComicBooksPage'));
export const MyBooksLazy = lazy(() => import('#/pages/MyBooks'));
export const MyCartLazy = lazy(() => import('#/pages/MyCart'));
export const MySalesLazy = lazy(() => import('#/pages/MySales'));
export const SalePageLazy = lazy(() => import('#/pages/SalePage'));
export const NotFoundPageLazy = lazy(() => import('#/helpers/NotFoundPage'));
