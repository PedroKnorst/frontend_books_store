import LoadingPage from '#/helpers/LoadingPage';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRoutes, routes } from './Routes';
import { IUser, Profiles } from '#/@types/user';
import { useAuthContext } from '#/context/authContext/useAuthContext';
import DeniedPage from '#/helpers/DeniedPage';

interface IAuthenticateRoute {
  route: IRoutes;
  user: IUser;
  accessPermission: Profiles[];
}

const AuthenticateRoute = ({ route, user, accessPermission }: IAuthenticateRoute) => {
  const client = user.clientId;
  const salesperson = user.salespersonId;

  if (accessPermission.includes('CLIENT') && client) {
    return route.component;
  } else if (accessPermission.includes('SALESPERSON') && salesperson) {
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
                  <AuthenticateRoute accessPermission={route.accessPermission} route={route} user={user} />
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
