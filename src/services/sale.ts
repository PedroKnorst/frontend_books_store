import { ICreateSale } from '#/@types/sale';
import { api } from './server';

export const createSale = async (data: ICreateSale) => {
  try {
    return api.post('/sale/create', data);
  } catch (error) {
    return Promise.reject(error);
  }
};
