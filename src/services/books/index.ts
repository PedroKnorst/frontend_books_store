import { api } from '../server';

export const getMarvelComicBooksWithFilter = async () => {
  // colocar parametros
  try {
    return api.get('/book/marvelBooks', { params: { page: 1, size: 8 } });
  } catch (error) {
    return Promise.reject(error);
  }
};
