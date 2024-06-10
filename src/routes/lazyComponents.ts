import { lazy } from 'react';

export const LoginLazy = lazy(() => import('#/pages/Auth/LogIn'));
export const SignUpLazy = lazy(() => import('#/pages/Auth/SignUp'));
