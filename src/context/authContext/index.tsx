import { IAuthUser, ICreateUser, IUser } from '#/@types/user';
import { authUser, createUser } from '#/services/user';
import { ReactElement, createContext, useEffect, useState } from 'react';
import { useMessageContext } from '../messageContext/useMessageContext';

type TUserContext = {
  user: IUser;
  signIn: (data: IAuthUser) => Promise<boolean>;
  signUp: (data: ICreateUser) => Promise<boolean>;
  logOut: () => void;
  loading: boolean;
  token: string;
};

export const UserContext = createContext<TUserContext>({} as TUserContext);

const UserStorage = ({ children }: { children: ReactElement }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as IUser);
  const [token, setToken] = useState<string>('');
  const { setMessage } = useMessageContext();

  useEffect(() => {
    if (sessionStorage.getItem('user')) setUser(JSON.parse(sessionStorage.getItem('user') as string));
    if (sessionStorage.getItem('token')) setToken(sessionStorage.getItem('token') as string);
  }, []);

  const signIn = async (data: IAuthUser) => {
    let isSigned: boolean = false;
    setLoading(true);

    await authUser(data)
      .then((res) => {
        const { user, token } = res.data;

        setUser(user);
        setToken(token);

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        isSigned = true;
      })
      .catch((error) => {
        console.log({ error });
        setMessage({ content: `${error.response.data.message}`, severity: 'fail', title: 'Erro' });
        isSigned = false;
      })
      .finally(() => {
        setLoading(false);
      });

    return isSigned;
  };

  const signUp = async (data: ICreateUser) => {
    let isSigned: boolean = false;
    setLoading(true);

    await createUser(data)
      .then((res) => {
        const { user, token } = res.data;

        setUser(user);
        setToken(token);

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        isSigned = true;
      })
      .catch((error) => {
        console.log({ error });
        setMessage({ content: `${error.response.data.message}`, severity: 'fail', title: 'Erro' });
        isSigned = false;
      })
      .finally(() => {
        setLoading(false);
      });

    return isSigned;
  };

  const logOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, signIn, loading, signUp, token, logOut }}>{children}</UserContext.Provider>
  );
};

export { UserStorage };
