import { api } from './server';

export const addOrRemoveBookOfCart = ({ bookId, deleteBook }: { bookId: string; deleteBook?: boolean }) => {
  try {
    return api.put(`/cart/book/${bookId}`, { deleteBook });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findCartById = (clientId: string) => {
  try {
    return api.get(`/cart/client/${clientId}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
