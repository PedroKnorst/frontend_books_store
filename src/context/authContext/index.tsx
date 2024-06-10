import { IAuthUser, IUser } from '#/@types/user';
import { AuthUser } from '#/services/auth';
import { ReactElement, createContext, useState } from 'react';

type TUserContext = {
  user: IUser;
  signIn: (data: IAuthUser) => Promise<boolean>;
  loading: boolean;
};

export const UserContext = createContext<TUserContext>({} as TUserContext);

const UserStorage = ({ children }: { children: ReactElement }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as IUser);

  const signIn = async (data: IAuthUser) => {
    let isSigned: boolean = false;
    setLoading(true);

    await AuthUser(data)
      .then((res) => {
        const { user, token } = res.data;

        setUser(user);

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', user);
        isSigned = true;
      })
      .catch((error) => {
        console.log(error.message);
        isSigned = false;
      })
      .finally(() => {
        setLoading(false);
      });

    return isSigned;
  };

  return <UserContext.Provider value={{ user, signIn, loading }}>{children}</UserContext.Provider>;
};

export { UserStorage };
