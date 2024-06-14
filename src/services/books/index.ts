import { ICreateBook, IGetBooksWithFilterParams } from '#/@types/books';
import { api } from '../server';

export const getMarvelComicBooksWithFilter = async () => {
  // colocar parametros
  try {
    return api.get('/book/marvelBooks', { params: { page: 1, size: 8 } });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getBooksWithFilter = async (params: IGetBooksWithFilterParams) => {
  try {
    return api.get('/book', { params });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createBook = async (data: ICreateBook) => {
  try {
    return api.post('/book/create', data);
  } catch (error) {
    return Promise.reject(error);
  }
};
