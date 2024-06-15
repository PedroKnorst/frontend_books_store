import { IAuthUser, ICreateUser } from '#/@types/user';
import { api } from './server';

export const authUser = async (data: IAuthUser) => {
  try {
    return api.post('/user/login', data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createUser = async (data: ICreateUser) => {
  try {
    return api.post('/user/create', data);
  } catch (error) {
    return Promise.reject(error);
  }
};
