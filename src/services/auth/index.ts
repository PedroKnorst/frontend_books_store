import { IAuthUser } from '#/@types/user';
import { server } from '../server';

export const AuthUser = async (data: IAuthUser) => {
  try {
    return server.post('/user/login', data);
  } catch (error) {
    return Promise.reject(error);
  }
};
