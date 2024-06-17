import { ICart } from './cart';
import { ISalesperson } from './salesperson';

export enum BookCategory {
  HORROR = 'Terror',
  ROMANCE = 'Romance',
  SCIENCEFICTION = 'Ficção Científica',
  REMAKE = 'Reeleitura',
  CRIME = 'Crime',
  INFANTIL = 'Infantil',
  FILOSOFIC = 'Filosófico',
  HISTORIC = 'História',
  ACTION = 'Ação',
  OTHER = 'Outro',
}

export interface IMarvelComicBook {
  title: string;
  description: string;
  authors: string[];
  characters: string[];
}

export interface IImage {
  id: string;
  path: string;
  bookId: string;
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  character: string;
  description: string;
  publishDate: string;
  price: number;
  storage: number;
  category: BookCategory;
  salespersonId: string;
  Salesperson: ISalesperson;
  Image: IImage;
}

export interface ICreateBook {
  title: string;
  author: string;
  character: string;
  description: string;
  price: number;
  storage: number;
  salespersonId: string;
  category: BookCategory;
  publishDate?: string;
  image?: Blob | File;
}

export interface IUpdateBook {
  id: string;
  title?: string;
  author?: string;
  character?: string;
  description?: string;
  price?: number;
  storage?: number;
  category?: BookCategory;
  publishDate?: string;
  image?: Blob | File;
}

export interface IGetBooksWithFilterParams {
  page: number;
  size: number;
}

export interface IBookCart {
  id: string;
  quantity: number;
  totalPrice: number;
  bookId: string;
  Book: IBook;
  cartId: string;
  Cart: ICart;
}

export interface IUpdateBookCart {
  id: string;
  quantity: number;
}
