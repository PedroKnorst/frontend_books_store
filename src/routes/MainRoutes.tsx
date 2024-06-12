import LoadingPage from '#/helpers/LoadingPage';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRoutes, routes } from './Routes';
import { Profiles } from '#/@types/user';
import { useAuthContext } from '#/context/authContext/useAuthContext';
import DeniedPage from '#/helpers/DeniedPage';

interface IAuthenticateRoute {
  route: IRoutes;
  userProfile: Profiles;
}

const AuthenticateRoute = ({ route, userProfile }: IAuthenticateRoute) => {
  const client = userProfile === 'CLIENT';
  const salesperson = userProfile === 'SALESPERSON';

  if (client) {
    return route.component;
  } else if (salesperson) {
    return route.component;
  }

  return <DeniedPage />;
};

export const MainRoutes = () => {
  const { user } = useAuthContext();

  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={
                route.accessPermission.length === 0 ? (
                  route.component
                ) : (
                  <AuthenticateRoute route={route} userProfile={user.profile} />
                )
              }
              path={route.path}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
