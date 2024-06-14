import { ICreateBook, IGetBooksWithFilterParams } from '#/@types/books';
import { api } from '../server';

export const getMarvelComicBooksWithFilter = async (params: { page: number; size: number }) => {
  try {
    return api.get('/book/marvelBooks', { params });
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
