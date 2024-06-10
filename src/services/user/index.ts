import { IAuthUser, ICreateUser } from '#/@types/user';
import { server } from '../server';

export const authUser = async (data: IAuthUser) => {
  try {
    return server.post('/user/login', data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createUser = async (data: ICreateUser) => {
  try {
    return server.post('/user/create', data);
  } catch (error) {
    return Promise.reject(error);
  }
};
