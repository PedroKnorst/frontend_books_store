import LoadingPage from '#/helpers/LoadingPage';
import { Suspense } from 'react';

export const MainRoutes = () => {
  return <Suspense fallback={<LoadingPage />}></Suspense>;
};
