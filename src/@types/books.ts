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
  id: string;
  title: string;
  authors: string[];
  characters: string[];
  publishDate: Date;
  description: string;
  pageCount: number;
  prices: number[];
  image: string;
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
  publishDate?: string;
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
  category: BookCategory;
  publishDate?: string;
  image?: Blob | File;
}

export interface IGetComicBooksFilters {
  digitalId?: string;
  page?: number;
  size?: number;
  title?: string;
  startYear?: string;
  characters?: string;
  creators?: string;
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
  title?: string;
  author?: string;
  character?: string;
  category?: BookCategory;
  publishDateStarts?: string;
  publishDateEnds?: string;
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
