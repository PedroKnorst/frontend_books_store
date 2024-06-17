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
    const formData = new FormData();
    if (data.image) formData.append('image', data.image);
    formData.append('book', JSON.stringify(data));
    return api.post('/book/create', formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBook = async (data: IUpdateBook) => {
  try {
    const formData = new FormData();
    if (data.image) formData.append('image', data.image);
    formData.append('book', JSON.stringify(data));
    return api.put(`/book/${data.id}`, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
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
