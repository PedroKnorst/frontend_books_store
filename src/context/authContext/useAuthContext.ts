import { useContext } from 'react';
import { UserContext } from '.';

const useAuthContext = () => {
  const context = useContext(UserContext);

  return context;
};

export { useAuthContext };
