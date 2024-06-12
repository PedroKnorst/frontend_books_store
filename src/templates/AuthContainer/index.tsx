import { ReactElement } from 'react';

const AuthContainer = ({ children }: { children: ReactElement }) => {
  return <div className="flex items-center h-[100vh] justify-center w-full">{children}</div>;
};

export default AuthContainer;
