import { IUpdateBookCart } from '#/@types/books';
import { api } from './server';

export const updateBookCart = (data: IUpdateBookCart) => {
  try {
    return api.put(`/bookCart/${data.id}`, data);
  } catch (error) {
    return Promise.reject(error);
  }
};
