import { ICreateBook, IGetBooksWithFilterParams, IUpdateBook } from '#/@types/books';
import { api } from './server';

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

export const updateBook = async (data: IUpdateBook) => {
  try {
    return api.put(`/book/${data.id}`, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findBookById = async (id: string) => {
  try {
    return api.get(`/book/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
